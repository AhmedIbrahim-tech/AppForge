import { describe, it, expect } from "vitest";
import {
  serializeFieldFlag,
  buildFeatureCliCommand,
  buildInteractiveFeatureCommand,
} from "./command-builder";
import type { FeatureDefinition } from "./types";

describe("Feature Command Builder", () => {
  it("serializes scalar string field with length validation", () => {
    const serialized = serializeFieldFlag({
      kind: "scalar",
      name: "Name",
      type: "string",
      required: true,
      minLength: 3,
      maxLength: 200,
    });
    expect(serialized).toBe("Name:string:required:min=3:max=200");
  });

  it("serializes scalar decimal field with numeric constraints", () => {
    const serialized = serializeFieldFlag({
      kind: "scalar",
      name: "Price",
      type: "decimal",
      required: true,
      minimum: 0,
      precision: 18,
      scale: 2,
    });
    expect(serialized).toBe("Price:decimal:required:min=0:precision=18:scale=2");
  });

  it("serializes enum field with pipe-separated values", () => {
    const serialized = serializeFieldFlag({
      kind: "enum",
      name: "Status",
      enumName: "ProductStatus",
      values: ["Draft", "Active", "Archived"],
      required: true,
    });
    expect(serialized).toBe("Status:enum:name=ProductStatus:values=Draft|Active|Archived:required");
  });

  it("serializes relationship field with target and display", () => {
    const serialized = serializeFieldFlag({
      kind: "relationship",
      name: "Category",
      target: "Category",
      relationshipType: "many-to-one",
      required: true,
      display: "Name",
      deleteBehavior: "restrict",
    });
    expect(serialized).toBe("Category:relationship:target=Category:type=many-to-one:display=Name:required");
  });

  it("serializes media field with single cardinality and size limit", () => {
    const serialized = serializeFieldFlag({
      kind: "media",
      name: "CoverImage",
      mediaKind: "image",
      cardinality: "single",
      required: false,
      maxSize: 5242880,
    });
    expect(serialized).toBe("CoverImage:image:single:optional:max-size=5242880");
  });

  it("serializes richText field", () => {
    const serialized = serializeFieldFlag({
      kind: "richText",
      name: "Content",
      required: true,
    });
    expect(serialized).toBe("Content:richText:required");
  });

  it("builds complete non-interactive feature command", () => {
    const feature: FeatureDefinition = {
      name: "Product",
      plural: "Products",
      mode: "fullstack",
      surface: "dashboard",
      featureType: "crud",
      permissions: true,
      localize: false,
      fields: [
        {
          kind: "scalar",
          name: "Name",
          type: "string",
          required: true,
          maxLength: 200,
        },
        {
          kind: "scalar",
          name: "Price",
          type: "decimal",
          required: true,
          minimum: 0,
        },
      ],
    };

    const cmd = buildFeatureCliCommand(feature);
    expect(cmd).toContain("flatron create feature Product --yes");
    expect(cmd).toContain("--plural Products");
    expect(cmd).toContain("--fullstack");
    expect(cmd).toContain("--surface dashboard");
    expect(cmd).toContain("--permissions");
    expect(cmd).toContain('--field "Name:string:required:max=200"');
    expect(cmd).toContain('--field "Price:decimal:required:min=0"');
  });

  it("builds interactive feature command", () => {
    expect(buildInteractiveFeatureCommand("Order")).toBe("flatron create feature Order");
  });
});
