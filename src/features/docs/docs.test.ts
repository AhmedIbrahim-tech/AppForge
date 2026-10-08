import { describe, it, expect } from "vitest";
import { DOC_PAGES, DOC_SECTIONS, DOC_SEARCH_INDEX } from "./docs-data";

describe("Documentation Content & Search Index", () => {
  const EXPECTED_SLUGS = [
    "what-is-flatron",
    "who-is-flatron-for",
    "quick-start",
    "how-flatron-works",
    "stack-builder",
    "feature-builder",
    "modules",
    "feature-vs-module",
  ];

  it("contains exactly the 8 initial documentation pages", () => {
    const slugs = Object.keys(DOC_PAGES);
    expect(slugs).toHaveLength(8);
    for (const expected of EXPECTED_SLUGS) {
      expect(slugs).toContain(expected);
    }
  });

  it("organizes pages into Getting Started and Core Concepts sections", () => {
    expect(DOC_SECTIONS).toHaveLength(2);
    expect(DOC_SECTIONS[0].title).toBe("Getting Started");
    expect(DOC_SECTIONS[0].pages).toHaveLength(4);
    expect(DOC_SECTIONS[1].title).toBe("Core Concepts");
    expect(DOC_SECTIONS[1].pages).toHaveLength(4);
  });

  it("builds a search index covering all 8 pages with keywords and headings", () => {
    expect(DOC_SEARCH_INDEX).toHaveLength(8);
    for (const entry of DOC_SEARCH_INDEX) {
      expect(entry.title).toBeTruthy();
      expect(entry.description).toBeTruthy();
      expect(entry.keywords.length).toBeGreaterThan(0);
      expect(entry.headings.length).toBeGreaterThan(0);
    }
  });

  it("has valid previous and next links without broken targets", () => {
    for (const page of Object.values(DOC_PAGES)) {
      if (page.previous) {
        const prevSlug = page.previous.href.replace("/docs/", "");
        expect(DOC_PAGES[prevSlug]).toBeDefined();
      }
      if (page.next) {
        const nextSlug = page.next.href.replace("/docs/", "");
        expect(DOC_PAGES[nextSlug]).toBeDefined();
      }
    }
  });
});
