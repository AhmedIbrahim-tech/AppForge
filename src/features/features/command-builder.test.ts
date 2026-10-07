import { describe, it, expect } from "vitest";
import {
  serializeFieldFlag,
  buildFeatureCliCommand,
  buildInteractiveFeatureCommand,
  validateFeatureName,
  validateFieldName,
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
    expect(serialized).toBe("Name:string:required:max=200:min=3");
  });

  it("serializes scalar decimal field with custom precision and numeric constraints", () => {
    const serialized = serializeFieldFlag({
      kind: "scalar",
      name: "Price",
      type: "decimal",
      required: true,
      minimum: 0,
      precision: 10,
      scale: 4,
    });
    expect(serialized).toBe("Price:decimal:required:precision=10:scale=4:min=0");
  });

  it("serializes scalar decimal field with default precision omitting default precision/scale tokens", () => {
    const serialized = serializeFieldFlag({
      kind: "scalar",
      name: "Price",
      type: "decimal",
      required: true,
      minimum: 0,
      precision: 18,
      scale: 2,
    });
    expect(serialized).toBe("Price:decimal:required:min=0");
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
    expect(serialized).toBe("Category:relationship:target=Category:type=many-to-one:required:display=Name:delete=restrict");
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

  // GOLDEN PARITY CASE C: Product CRUD feature with scalar and relationship fields
  it("Golden Parity Case C: Product CRUD with string, decimal, and relationship", () => {
    const feature: FeatureDefinition = {
      name: "Product",
      plural: "Products",
      mode: "fullstack",
      surface: "dashboard",
      featureType: "crud",
      permissions: true,
      localize: true,
      operations: {
        list: true,
        getById: true,
        create: true,
        update: true,
        delete: true,
        restore: false,
        search: true,
        pagination: true,
      },
      labels: {
        enSingular: "Product",
        enPlural: "Products",
        arSingular: "منتج",
        arPlural: "منتجات",
      },
      fields: [
        {
          kind: "scalar",
          name: "Name",
          type: "string",
          required: true,
          maxLength: 100,
          minLength: 2,
        },
        {
          kind: "scalar",
          name: "Price",
          type: "decimal",
          required: true,
          precision: 18,
          scale: 2,
          minimum: 0,
        },
        {
          kind: "relationship",
          name: "Category",
          target: "Category",
          relationshipType: "many-to-one",
          required: true,
          display: "Name",
          deleteBehavior: "restrict",
        },
      ],
    };

    const cmd = buildFeatureCliCommand(feature);
    expect(cmd).toBe(
      'flatron create feature Product --yes --plural Products --fullstack --surface dashboard --permissions --localize --no-restore --label-en-singular "Product" --label-en-plural "Products" --label-ar-singular "منتج" --label-ar-plural "منتجات" --field "Name:string:required:max=100:min=2" --field "Price:decimal:required:min=0" --field "Category:relationship:target=Category:type=many-to-one:required:display=Name:delete=restrict"'
    );
  });

  it("handles Read-Only feature type and flags", () => {
    const feature: FeatureDefinition = {
      name: "AuditLog",
      plural: "AuditLogs",
      mode: "backend",
      surface: "public",
      featureType: "readonly",
      permissions: false,
      localize: false,
      operations: {
        list: true,
        getById: true,
        create: false,
        update: false,
        delete: false,
        restore: false,
        search: false,
        pagination: false,
      },
      fields: [
        {
          kind: "scalar",
          name: "Action",
          type: "string",
          required: true,
        },
      ],
    };

    const cmd = buildFeatureCliCommand(feature);
    expect(cmd).toContain("--type readonly");
    expect(cmd).toContain("--backend-only");
    expect(cmd).toContain("--surface public");
    expect(cmd).toContain("--no-permissions");
    expect(cmd).toContain("--no-search");
    expect(cmd).toContain("--no-pagination");
    expect(cmd).not.toContain("--create");
    expect(cmd).not.toContain("--update");
    expect(cmd).not.toContain("--delete");
  });

  describe("Validation Parity", () => {
    it("validates feature name against PascalCase and reserved words", () => {
      expect(validateFeatureName("Product").isValid).toBe(true);
      expect(validateFeatureName("Product").name).toBe("Product");
      expect(validateFeatureName("").isValid).toBe(false);
      expect(validateFeatureName("Product*").isValid).toBe(false);
      expect(validateFeatureName("Product Item").isValid).toBe(false);
      expect(validateFeatureName("123Product").isValid).toBe(false);
      expect(validateFeatureName("Domain").isValid).toBe(false);
      expect(validateFeatureName("Entity").isValid).toBe(false);
      expect(validateFeatureName("Common").isValid).toBe(false);
    });

    it("validates field name against system names and banned tokens", () => {
      expect(validateFieldName("Title").isValid).toBe(true);
      expect(validateFieldName("Id").isValid).toBe(false);
      expect(validateFieldName("CreatedAtUtc").isValid).toBe(false);
      expect(validateFieldName("UpdatedAtUtc").isValid).toBe(false);
      expect(validateFieldName("eval").isValid).toBe(false);
      expect(validateFieldName("require").isValid).toBe(false);
      expect(validateFieldName("123Field").isValid).toBe(false);
    });
  });
});
