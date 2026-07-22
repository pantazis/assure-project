export type LinkKind = 'internal' | 'external' | 'email' | 'telephone' | 'download';

export interface ImageContent {
  src: string;
  alt: string;
  width: number | null;
  height: number | null;
}

export interface LinkContent {
  label: string;
  href: string;
  kind: LinkKind;
  targetPageId: string | null;
  opensInNewWindow: boolean;
}

export interface NavigationItem {
  id: string;
  label: string;
  targetPageId: string;
  sourceHref: string;
  children: NavigationItem[];
}

export interface SiteSettings {
  name: string;
  logo: ImageContent;
}

export interface FooterContent {
  fundingText: string;
  fundingImage: ImageContent;
  legalLink: LinkContent;
  copyright: string;
}

export interface BreadcrumbContent {
  label: string;
  targetPageId: string | null;
  sourceHref: string | null;
}

export interface HeadingBlock {
  type: 'heading';
  level: 2 | 3 | 4 | 5 | 6;
  text: string;
}

export interface ParagraphBlock {
  type: 'paragraph';
  text: string;
  links: LinkContent[];
}

export interface ListBlock {
  type: 'list';
  ordered: boolean;
  items: { text: string; links: LinkContent[] }[];
}

export interface ImageBlock {
  type: 'image';
  image: ImageContent;
}

export interface DownloadBlock {
  type: 'download';
  download: { label: string; href: string; fileType: string | null };
}

export type ContentBlock = HeadingBlock | ParagraphBlock | ListBlock | ImageBlock | DownloadBlock;

export interface DatedContentCard {
  title: string;
  dateDisplay: string;
  dateIso: string | null;
  summary: ContentBlock[];
  route: string;
}