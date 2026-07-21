export type LanguageCode = "en" | "el" | "mixed";

export type PageType =
  | "home"
  | "standard"
  | "consortium"
  | "contact"
  | "news-list"
  | "news-detail"
  | "events-list"
  | "event-detail";

export type LinkKind = "internal" | "external" | "email" | "telephone" | "download";

export interface WebsiteContent {
  site: SiteSettings;
  navigation: Navigation;
  footer: FooterData;
  pages: Page[];
  news: NewsCollection;
  events: EventCollection;
}

export interface SiteSettings {
  name: string;
  baseUrl: string;
  defaultLanguage: LanguageCode;
  languagesPresent: LanguageCode[];
  logo: Image;
  favicon: string | null;
}

export interface Navigation {
  primary: NavigationItem[];
}

export interface NavigationItem {
  id: string;
  label: string;
  targetPageId: string;
  sourceHref: string;
  children: NavigationItem[];
}

export interface FooterData {
  fundingText: string;
  fundingImage: Image;
  legalLink: Link;
  copyright: string;
}

export interface Page {
  id: string;
  type: PageType;
  sourceFilename: string;
  title: string;
  language: LanguageCode;
  slug: string;
  route: string;
  sourceUrl: string | null;
  parentPageId: string | null;
  metadata: PageMetadata;
  breadcrumbs: Breadcrumb[];
  sections: PageSection[];
  shareLinks: Link[];
}

export interface PageMetadata {
  browserTitle: string;
  description: string | null;
  canonical: string | null;
  shortlink: string | null;
}

export interface Breadcrumb {
  label: string;
  targetPageId: string | null;
  sourceHref: string | null;
}

export type PageSection =
  | RichTextSection
  | LinkListSection
  | NewsListSection
  | EventsListSection
  | ConsortiumSection
  | ContactSection;

export interface SectionBase {
  id: string;
  heading: string | null;
}

export interface RichTextSection extends SectionBase {
  type: "rich-text";
  blocks: ContentBlock[];
}

export interface LinkListSection extends SectionBase {
  type: "link-list";
  links: Link[];
}

export interface NewsListSection extends SectionBase {
  type: "news-list";
  itemIds: string[];
}

export interface EventsListSection extends SectionBase {
  type: "events-list";
  itemIds: string[];
}

export interface ConsortiumSection extends SectionBase {
  type: "consortium-members";
  members: ConsortiumMember[];
}

export interface ContactSection extends SectionBase {
  type: "contact-details";
  contacts: ContactInformation[];
}

export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | ListBlock
  | ImageBlock
  | DownloadBlock;

export interface HeadingBlock {
  type: "heading";
  level: 2 | 3 | 4 | 5 | 6;
  text: string;
}

export interface ParagraphBlock {
  type: "paragraph";
  text: string;
  links: Link[];
}

export interface ListBlock {
  type: "list";
  ordered: boolean;
  items: RichTextItem[];
}

export interface RichTextItem {
  text: string;
  links: Link[];
}

export interface ImageBlock {
  type: "image";
  image: Image;
}

export interface DownloadBlock {
  type: "download";
  download: Download;
}

export interface Link {
  label: string;
  href: string;
  kind: LinkKind;
  targetPageId: string | null;
  opensInNewWindow: boolean;
}

export interface Download {
  label: string;
  href: string;
  fileType: string | null;
}

export interface Image {
  src: string;
  alt: string;
  width: number | null;
  height: number | null;
}

export interface ConsortiumMember {
  id: string;
  name: string;
  country: string | null;
  logo: Image | null;
  blocks: ContentBlock[];
  website: Link | null;
}

export interface ContactInformation {
  id: string;
  heading: string;
  name: string | null;
  roles: string[];
  organization: string[];
  emails: string[];
  telephones: string[];
  fax: string | null;
  addressLines: string[];
}

export interface NewsCollection {
  listPageId: string;
  items: NewsItem[];
}

export interface EventCollection {
  listPageId: string;
  items: EventItem[];
}

export interface DatedContentItem {
  id: string;
  pageId: string;
  title: string;
  dateDisplay: string;
  dateIso: string | null;
  summary: ContentBlock[];
  detailSectionId: string;
  sourceHref: string;
}

export interface NewsItem extends DatedContentItem {
  type: "news";
}

export interface EventItem extends DatedContentItem {
  type: "event";
}