export interface DocTocItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface DocNavigationLink {
  title: string;
  href: string;
}

export interface DocPageMetadata {
  slug: string;
  title: string;
  description: string;
  section: "Getting Started" | "Core Concepts";
  order: number;
  toc: DocTocItem[];
  previous?: DocNavigationLink;
  next?: DocNavigationLink;
  keywords: string[];
}

export interface DocSearchEntry {
  slug: string;
  href: string;
  title: string;
  description: string;
  section: string;
  keywords: string[];
  headings: string[];
}
