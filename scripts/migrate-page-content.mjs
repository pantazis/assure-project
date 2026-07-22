import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const sourceDirectory = join(projectRoot, 'html-pages');
const assetDirectory = join(projectRoot, 'public', 'assets', 'images');
const outputFile = join(projectRoot, 'src', 'app', 'core', 'data', 'page-content.data.ts');

const generatedStart = '  // MIGRATION-GENERATED-START';
const generatedEnd = '  // MIGRATION-GENERATED-END';

const pages = [
  { route: '/about', source: 'about.html', key: 'about', mode: 'body', existing: true },
  { route: '/about/project', source: 'project.html', key: 'project', mode: 'body' },
  { route: '/about/objectives', source: 'objectives.html', key: 'objectives', mode: 'body' },
  { route: '/about/technical-framework', source: 'framework.html', key: 'technicalFramework', mode: 'body' },
  { route: '/consortium', source: 'consortium.html', key: 'consortium', mode: 'consortium' },
  { route: '/contact', source: 'contact.html', key: 'contact', mode: 'body' },
  {
    route: '/news',
    source: 'news.html',
    key: 'news',
    mode: 'list',
    detailRoutes: ['/news/latest-news', '/news/interview-naftemporiki', '/news/paper-publication'],
  },
  { route: '/news/latest-news', source: 'news_latest.html', key: 'latestNews', mode: 'body' },
  {
    route: '/news/interview-naftemporiki',
    source: 'news_interview.html',
    key: 'interviewNaftemporiki',
    mode: 'body',
  },
  { route: '/news/paper-publication', source: 'news_paper.html', key: 'paperPublication', mode: 'body' },
  {
    route: '/events',
    source: 'events.html',
    key: 'events',
    mode: 'list',
    detailRoutes: [
      '/events/closing-event',
      '/events/windeurope-copenhagen-2023',
      '/events/wind-energy-hamburg-2022',
      '/events/global-wind-day-2022',
      '/events/windeurope-bilbao-2022',
      '/events/electric-city-copenhagen-2021',
    ],
  },
  { route: '/events/closing-event', source: 'event_closing.html', key: 'closingEvent', mode: 'body' },
  {
    route: '/events/windeurope-copenhagen-2023',
    source: 'event_copenhagen_2023.html',
    key: 'windEuropeCopenhagen2023',
    mode: 'body',
  },
  {
    route: '/events/wind-energy-hamburg-2022',
    source: 'event_hamburg_2022.html',
    key: 'windEnergyHamburg2022',
    mode: 'body',
  },
  {
    route: '/events/global-wind-day-2022',
    source: 'event_wind_day_2022.html',
    key: 'globalWindDay2022',
    mode: 'body',
  },
  {
    route: '/events/windeurope-bilbao-2022',
    source: 'event_bilbao_2022.html',
    key: 'windEuropeBilbao2022',
    mode: 'body',
  },
  {
    route: '/events/electric-city-copenhagen-2021',
    source: 'event_electric_city_2021.html',
    key: 'electricCityCopenhagen2021',
    mode: 'body',
  },
];

const internalUrls = new Map([
  ['/content/home', '/home'],
  ['/about-assure', '/about'],
  ['/content/The-Project', '/about/project'],
  ['/content/objectives', '/about/objectives'],
  ['/content/Technical-Framework', '/about/technical-framework'],
  ['/contact-us', '/contact'],
]);

const imageNames = new Map([
  ['ENTEKA_logo_new.png', 'enteka-logo-new.png'],
  ['ED_logo_0.png', 'ed-logo-0.png'],
  ['episey.png', 'episey.png'],
  ['eletaen-logoGR-small.png', 'eletaen-logogr-small.png'],
  ['ypetha_logo.png', 'ypetha-logo.png'],
  ['closing_event_Picture1.jpg', 'closing-event-picture1.jpg'],
  ['closing_event_Picture2.jpg', 'closing-event-picture2.jpg'],
  ['closing_event_Picture3.jpg', 'closing-event-picture3.jpg'],
  ['closing_event_Picture4.jpg', 'closing-event-picture4.jpg'],
  ['closing_event_Picture5.jpg', 'closing-event-picture5.jpg'],
  ['closing_event_Picture6.jpg', 'closing-event-picture6.jpg'],
  ['closing_event_Picture7.jpg', 'closing-event-picture7.jpg'],
  ['closing_event_Picture8.jpg', 'closing-event-picture8.jpg'],
  ['closing_event_Picture9.jpg', 'closing-event-picture9.jpg'],
  ['wind_eruope_Picture1.jpg', 'wind-eruope-picture1.jpg'],
  ['wind_eruope_Picture2.jpg', 'wind-eruope-picture2.jpg'],
  ['wind_energy_Picture1.png', 'wind-energy-picture1.png'],
  ['wind_energy_Picture2.png', 'wind-energy-picture2.png'],
]);

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#(?:39|x27);/gi, "'")
    .replace(/&lt;/gi, '&lt;')
    .replace(/&gt;/gi, '&gt;');
}

function textContent(value) {
  return decodeEntities(value.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function escapeAttribute(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i'))?.slice(1).find(Boolean) ?? '';
}

function innerBalancedElement(html, startIndex, tagName) {
  const openEnd = html.indexOf('>', startIndex);
  if (openEnd < 0) throw new Error(`Unclosed <${tagName}> at offset ${startIndex}`);
  const tokens = new RegExp(`<\\/?${tagName}\\b[^>]*>`, 'gi');
  tokens.lastIndex = startIndex;
  let depth = 0;
  let token;
  while ((token = tokens.exec(html))) {
    depth += token[0].startsWith('</') ? -1 : 1;
    if (depth === 0) return html.slice(openEnd + 1, token.index);
  }
  throw new Error(`Could not find closing </${tagName}>`);
}

function extractDivByClass(html, className) {
  const matcher = new RegExp(`<div\\b[^>]*class=["'][^"']*\\b${className}\\b[^"']*["'][^>]*>`, 'i');
  const match = matcher.exec(html);
  if (!match) throw new Error(`Missing div.${className}`);
  return innerBalancedElement(html, match.index, 'div');
}

function localImageSource(source) {
  if (source.startsWith('/assets/images/')) return source;
  const decodedName = basename(decodeURIComponent(source.split(/[?#]/)[0]));
  const localName = imageNames.get(decodedName) ?? decodedName.toLowerCase().replace(/_/g, '-');
  const localFile = join(assetDirectory, localName);
  if (!existsSync(localFile)) throw new Error(`No local asset for image ${source} (expected ${localFile})`);
  return `/assets/images/${localName}`;
}

function normalizeHref(href) {
  const decoded = decodeEntities(href.trim());
  if (internalUrls.has(decoded)) return internalUrls.get(decoded);
  if (decoded.startsWith('https://assure-project.eu/')) {
    const path = decoded.slice('https://assure-project.eu'.length);
    return internalUrls.get(path) ?? path;
  }
  return decoded;
}

function sanitize(html) {
  let value = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|form|button|iframe)\b[\s\S]*?<\/\1>/gi, '')
    .replace(/<\/?(?:div|span|table|tbody|thead|tr|td|section)\b[^>]*>/gi, '')
    .replace(/<b\b[^>]*>/gi, '<strong>')
    .replace(/<\/b>/gi, '</strong>')
    .replace(/<i\b[^>]*>/gi, '<em>')
    .replace(/<\/i>/gi, '</em>');

  const allowed = new Set(['h2', 'h3', 'h4', 'h5', 'h6', 'p', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'figure', 'figcaption', 'img', 'br', 'article', 'time']);
  value = value.replace(/<\/?([a-z][\w-]*)\b[^>]*>/gi, (tag, rawName) => {
    const name = rawName.toLowerCase();
    if (!allowed.has(name)) return '';
    if (tag.startsWith('</')) return ['img', 'br'].includes(name) ? '' : `</${name}>`;
    if (name === 'a') {
      const href = normalizeHref(attribute(tag, 'href'));
      if (!href || /^javascript:/i.test(href)) return '<a>';
      const external = /^https?:\/\//i.test(href);
      return `<a href="${escapeAttribute(href)}"${external ? ' rel="noopener"' : ''}>`;
    }
    if (name === 'img') {
      const src = localImageSource(attribute(tag, 'src'));
      const alt = decodeEntities(attribute(tag, 'alt'));
      return `<img src="${escapeAttribute(src)}" alt="${escapeAttribute(alt)}">`;
    }
    if (name === 'time') {
      const datetime = attribute(tag, 'datetime');
      return datetime ? `<time datetime="${escapeAttribute(datetime)}">` : '<time>';
    }
    return `<${name}>`;
  });

  return value
    .replace(/<p>\s*(?:&nbsp;|\s)*<\/p>/gi, '')
    .replace(/<(h[2-6])>\s*(?:&nbsp;|\s)*<\/\1>/gi, '')
    .replace(/(?:\s*<br>\s*)+(?=<\/article>)/gi, '\n')
    .replace(/&nbsp;/gi, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function extractMetadata(source) {
  const browserTitle = decodeEntities(source.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? '').trim();
  const title = decodeEntities(source.match(/<div\b[^>]*pi-titlebar[^>]*>[\s\S]*?<h1>([\s\S]*?)<\/h1>/i)?.[1] ?? '').trim();
  if (!title || !browserTitle) throw new Error('Missing page or browser title');
  return { title: textContent(title), browserTitle: textContent(browserTitle) };
}

function extractBody(source) {
  return sanitize(extractDivByClass(source, 'field-name-body'));
}

function extractList(source, detailRoutes) {
  const view = extractDivByClass(source, 'view-content');
  const titlePattern = /<div\b[^>]*class=["'][^"']*views-field-title[^"']*["'][^>]*>([\s\S]*?)<\/div>\s*<div\b[^>]*class=["'][^"']*views-field-field-date[^"']*["'][^>]*>([\s\S]*?)<\/div>\s*<div\b[^>]*class=["'][^"']*views-field-body[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi;
  const cards = [];
  let match;
  while ((match = titlePattern.exec(view))) {
    const title = textContent(match[1]);
    const date = textContent(match[2]);
    let summary = sanitize(match[3]);
    summary = summary.replace(/<a\b[^>]*>Read more<\/a>/gi, '');
    const route = detailRoutes[cards.length];
    if (!route) throw new Error(`More list cards than configured routes (found ${title})`);
    cards.push(`<article>\n<h2><a href="${route}">${title}</a></h2>\n<time>${date}</time>\n${summary}\n</article>`);
  }
  if (cards.length !== detailRoutes.length) throw new Error(`Expected ${detailRoutes.length} list cards, found ${cards.length}`);
  return sanitize(cards.join('\n'));
}

function extractConsortium(source) {
  const view = extractDivByClass(source, 'view-content');
  const rows = [...view.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)];
  const articles = rows.map((row) => {
    const cells = [...row[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map((match) => match[1]);
    if (cells.length < 2) throw new Error('Consortium row does not contain logo and content cells');
    const imageTag = cells[0].match(/<img\b[^>]*>/i)?.[0];
    if (!imageTag) throw new Error('Consortium row is missing its logo');
    const heading = textContent(cells[1].match(/<strong\b[^>]*>([\s\S]*?)<\/strong>/i)?.[1] ?? '');
    if (!heading) throw new Error('Consortium row is missing its name');
    const website = cells[1].match(/<div\b[^>]*social-links[^>]*>[\s\S]*?<a\b[^>]*href=["']([^"']+)["']/i)?.[1];
    let body = cells[1]
      .replace(/^[\s\S]*?<p\b/i, '<p')
      .replace(/<div\b[^>]*social-links[^>]*>[\s\S]*$/i, '')
      .replace(/(?:\s*<br\s*\/?>\s*)+$/i, '');
    const websiteLink = website ? `\n<p><a href="${website}">Website</a></p>` : '';
    return `<article>\n<figure>${imageTag}</figure>\n<h2>${heading}</h2>\n${body}${websiteLink}\n</article>`;
  });
  if (articles.length !== 5) throw new Error(`Expected 5 consortium members, found ${articles.length}`);
  return sanitize(articles.join('\n'));
}

function indentHtml(html) {
  return html
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${')
    .split('\n')
    .map((line) => `      ${line.trim()}`)
    .join('\n');
}

function renderEntry(page, content) {
  return `  ${page.key}: {\n    title: ${JSON.stringify(content.title)},\n    browserTitle: ${JSON.stringify(content.browserTitle)},\n    html: \`\n${indentHtml(content.html)}\n    \`,\n  },`;
}

function validatePage(page, content) {
  if (!content.html) throw new Error(`${page.route}: generated empty HTML`);
  const forbidden = /<(?:script|style|form|button|iframe)\b|\s(?:id|class|style|on\w+)\s*=|<img\b[^>]*src=["']https?:/i;
  if (forbidden.test(content.html)) throw new Error(`${page.route}: generated HTML failed sanitization`);
  for (const match of content.html.matchAll(/<img\b[^>]*src="\/assets\/images\/([^"]+)"/gi)) {
    if (!existsSync(join(assetDirectory, match[1]))) throw new Error(`${page.route}: missing asset ${match[1]}`);
  }
}

function updateInterface(file, generatedPages) {
  const properties = generatedPages.map((page) => `  readonly ${page.key}: HtmlPageContent;`).join('\n');
  const markerPattern = /\n  \/\/ MIGRATION-GENERATED-TYPES-START[\s\S]*?  \/\/ MIGRATION-GENERATED-TYPES-END/;
  const block = `\n  // MIGRATION-GENERATED-TYPES-START\n${properties}\n  // MIGRATION-GENERATED-TYPES-END`;
  if (markerPattern.test(file)) return file.replace(markerPattern, block);
  return file.replace(/(export interface PageContentData \{[\s\S]*?)(\n\})/, `$1${block}$2`);
}

function updateEntries(file, entries) {
  const block = `${generatedStart}\n${entries}\n${generatedEnd}`;
  const start = file.indexOf(generatedStart);
  const end = file.indexOf(generatedEnd);
  if ((start >= 0) !== (end >= 0)) throw new Error('Generated entry markers are incomplete');
  if (start >= 0) return file.slice(0, start) + block + file.slice(end + generatedEnd.length);
  const closing = '\n} as const satisfies PageContentData;';
  if (!file.includes(closing)) throw new Error('Could not find PAGE_CONTENT closing marker');
  return file.replace(closing, `\n${block}\n} as const satisfies PageContentData;`);
}

const generatedPages = pages.filter((page) => !page.existing);
const entries = generatedPages.map((page) => {
  const sourceFile = join(sourceDirectory, page.source);
  if (!existsSync(sourceFile)) throw new Error(`${page.route}: missing source ${sourceFile}`);
  const source = readFileSync(sourceFile, 'utf8');
  const content = {
    ...extractMetadata(source),
    html:
      page.mode === 'list'
        ? extractList(source, page.detailRoutes)
        : page.mode === 'consortium'
          ? extractConsortium(source)
          : extractBody(source),
  };
  validatePage(page, content);
  console.log(`Migrated ${page.route} from ${page.source}`);
  return renderEntry(page, content);
});

let output = readFileSync(outputFile, 'utf8');
output = updateInterface(output, generatedPages);
output = updateEntries(output, entries.join('\n'));
writeFileSync(outputFile, output, 'utf8');
console.log(`Updated ${outputFile} with ${generatedPages.length} generated entries.`);