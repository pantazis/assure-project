# ASSURE HTML-to-Data Migration

Convert every `html-pages/*.html` file into reusable, presentation-independent site data. Use `site-links.mmd` as the sitemap reference.

The purpose is to document the content and the non-technical site structure for a future application. Do not create Angular components, services, templates, styles, route configuration, scripts, reports, downloaded assets, or any other implementation files.

## Required Output — Exactly Three Files

Create only these three files under `output/`:

```text
output/
├── website-content.models.ts
├── assure-website.json
└── site-blueprint.mmd
```

Do not create or modify any other generated file.

### 1. `website-content.models.ts`

Define only the semantic TypeScript data model required by `assure-website.json`.

The model must cover site settings, navigation, footer data, pages, metadata, routes, reusable component definitions and instances, a discriminated `PageSection` union, news, events, links, downloads, embeds, images, breadcrumbs, and contact information where evidenced by the HTML.

Use explicit interfaces and union types. Do not use unnecessary `any`. Keep content separate from presentation and do not include CSS or Angular-specific implementation types.

### 2. `assure-website.json`

Store all extracted website data in one valid JSON file conforming to `website-content.models.ts`.

It must contain:

- site settings, navigation, and footer content;
- every source page exactly once;
- each page's ID, type, source filename, title, language, slug, route, metadata, and ordered sections;
- all exact page content, including English, Greek, and mixed-language text;
- reusable component definitions and the pages or sections that use them;
- complete news list/detail and event list/detail data;
- source-evidenced links, images, alt text, downloads, embeds, breadcrumbs, dates, calls to action, and contact details;
- the relationships needed by `site-blueprint.mmd`.

JSON must contain no comments, functions, `undefined`, or template literals. Use `null` or `[]` for unavailable values. Keep image references exactly as evidenced by the source; do not download, replace, or invent assets.

### 3. `site-blueprint.mmd`

Create a Mermaid diagram that explains the site in clear, non-technical language.

The diagram must show:

- the website and its main navigation areas;
- all routes and pages;
- parent and child page relationships;
- which reusable content components appear on which pages;
- how pages and components receive content from the corresponding parts of `assure-website.json`;
- news list-to-detail and events list-to-detail relationships.

Use human-readable labels. This is a site blueprint for content and page relationships, not a software architecture diagram. Do not show Angular modules, services, classes, APIs, databases, build tools, or other technical implementation details.

## Source Processing Rules

- Read and process every `html-pages/*.html` file independently and completely.
- Treat each HTML file as the sole truth for its content and detected language.
- Use `site-links.mmd` only to confirm page and navigation relationships.
- Represent every HTML source file exactly once in the JSON and retain its source filename.
- Preserve titles, browser metadata, headings, paragraphs, lists, dates, breadcrumbs, links, downloads, embeds, images and source alt text, contact details, calls to action, navigation, and footer content.
- Preserve all English, Greek, and mixed-language text exactly as found.
- The source site has no language selector or translated variants. Do not create translations or language-switching data.
- Never invent, rewrite, summarize, translate, or merge source content.
- Keep unrelated and page-specific content separate.
- Use raw HTML only when semantic conversion would lose meaning or content.
- Propose a reusable component only when repeated source markup or content structure provides evidence for it.

## Page and Route Rules

Assign stable, unique page IDs, slugs, and routes based only on source evidence.

Page types must support home, standard content, consortium, contact, news list, news detail, events list, and event detail.

Prefer these routes unless the sources require an adjustment:

```text
/
/about
/about/project
/about/objectives
/about/technical-framework
/consortium
/news
/news/{slug}
/events
/events/{slug}
/contact
```

## Validation Before Completion

Confirm that:

- exactly three files exist under `output/`;
- every source HTML file was processed separately and appears exactly once in the JSON;
- all page IDs, slugs, and routes are unique;
- every internal navigation target resolves to a JSON page;
- every news item and event has its required detail data;
- all source content and Greek characters are preserved;
- reusable components are supported by repeated source evidence;
- the JSON is valid and conforms to the TypeScript model;
- every page, route, component, and JSON relationship in the Mermaid blueprint matches `assure-website.json`;
- the Mermaid file is understandable as a non-technical site blueprint;
- no Angular implementation or unrequested output was created.

## Workflow

1. Audit all HTML files and `site-links.mmd` without generating output.
2. Define the data model in `website-content.models.ts`.
3. Extract every page independently into `assure-website.json`.
4. Create `site-blueprint.mmd` from the completed JSON relationships.
5. Validate all three files together and correct inconsistencies.

Keep progress concise. Write full extracted content only to the required files, not into chat.

## Final Response

Briefly confirm that every HTML file was read separately and that exactly the three required files were created. Summarize the data model, JSON page/component content, and non-technical Mermaid site blueprint. Mention any source ambiguity or unsafe raw-HTML conversion, but do not create a separate report.