import { describe, it, expect } from "vitest";
import { routes } from "./app-router";

describe("Unified SPA Router Canonical Configuration", () => {
  it("defines standard WebsiteLayout root with children", () => {
    expect(routes).toHaveLength(1);
    const root = routes[0];
    expect(root.children).toBeDefined();
  });

  it("contains all required canonical clean path routes", () => {
    const children = routes[0].children || [];
    const paths = children.map((r) => r.path);

    expect(paths).toContain("/");
    expect(paths).toContain("/builder");
    expect(paths).toContain("/features");
    expect(paths).toContain("/feature-builder");
    expect(paths).toContain("/modules");
    expect(paths).toContain("/why-flatron");
    expect(paths).toContain("/docs");
    expect(paths).toContain("*");
  });

  it("contains all 8 nested documentation routes under /docs", () => {
    const children = routes[0].children || [];
    const docsRoute = children.find((r) => r.path === "/docs");
    expect(docsRoute).toBeDefined();
    expect(docsRoute?.children).toBeDefined();

    const docsChildren = docsRoute?.children || [];
    const docsPaths = docsChildren.map((r) => r.path);

    expect(docsPaths).toContain("what-is-flatron");
    expect(docsPaths).toContain("who-is-flatron-for");
    expect(docsPaths).toContain("quick-start");
    expect(docsPaths).toContain("how-flatron-works");
    expect(docsPaths).toContain("stack-builder");
    expect(docsPaths).toContain("feature-builder");
    expect(docsPaths).toContain("modules");
    expect(docsPaths).toContain("feature-vs-module");
  });

  it("does not include any hash-based routes in router definitions", () => {
    const children = routes[0].children || [];
    const paths = children.map((r) => r.path);

    for (const path of paths) {
      if (path) expect(path).not.toContain("#");
    }
  });
});
