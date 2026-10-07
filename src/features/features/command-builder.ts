import {
  type FeatureDefinition,
  type FeatureField,
  RESERVED_FEATURE_NAMES,
  SYSTEM_FIELD_NAMES,
  BANNED_FIELD_TOKENS,
} from "./types";

const VALID_CSHARP = /^[A-Za-z_][A-Za-z0-9]*$/;
const VALID_TS = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
const UNSAFE_FS = /[<>:"|?*\\/\u0000-\u001f]/;

/**
 * Validates feature entity name matching Library safe-generation.js
 */
export function validateFeatureName(name: string): { ok: boolean; isValid: boolean; error?: string; name?: string } {
  if (!name || typeof name !== "string") {
    return { ok: false, isValid: false, error: "Feature name is required." };
  }

  const trimmed = name.trim();
  if (!trimmed) {
    return { ok: false, isValid: false, error: "Feature name cannot be empty." };
  }

  if (UNSAFE_FS.test(trimmed) || trimmed.includes(" ")) {
    return { ok: false, isValid: false, error: "Feature name contains unsupported characters." };
  }

  const pascal = trimmed
    .replace(/[^A-Za-z0-9]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

  if (!VALID_CSHARP.test(pascal) || !VALID_TS.test(pascal)) {
    return { ok: false, isValid: false, error: "Feature name must be a valid C# and TypeScript identifier." };
  }

  if (RESERVED_FEATURE_NAMES.has(pascal)) {
    return { ok: false, isValid: false, error: `Feature name "${pascal}" is reserved.` };
  }

  return { ok: true, isValid: true, name: pascal };
}

/**
 * Validates field property name matching Library safe-generation.js
 */
export function validateFieldName(name: string): { ok: boolean; isValid: boolean; error?: string; name?: string } {
  if (!name || typeof name !== "string") {
    return { ok: false, isValid: false, error: "Field name is required." };
  }

  const trimmed = name.trim();
  if (BANNED_FIELD_TOKENS.test(trimmed)) {
    return { ok: false, isValid: false, error: "Field definition contains disallowed tokens." };
  }

  const pascal = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);

  if (!VALID_CSHARP.test(pascal) || !VALID_TS.test(pascal)) {
    return { ok: false, isValid: false, error: `Field name "${trimmed}" is not a valid identifier.` };
  }

  if (SYSTEM_FIELD_NAMES.has(pascal)) {
    return { ok: false, isValid: false, error: `Field name "${pascal}" is reserved for BaseEntity infrastructure.` };
  }

  return { ok: true, isValid: true, name: pascal };
}

/**
 * Serialize a single field into the exact Flatron CLI --field definition string.
 * Strictly adheres to Library field-parser.js formatFieldFlag implementation.
 */
export function serializeFieldFlag(field: FeatureField): string {
  switch (field.kind) {
    case "scalar": {
      const req = field.required ? "required" : "optional";
      const parts: string[] = [field.name, field.type, req];

      if (field.type === "string") {
        if (field.maxLength !== undefined && field.maxLength > 0) {
          parts.push(`max=${field.maxLength}`);
        }
        if (field.minLength !== undefined && field.minLength > 0) {
          parts.push(`min=${field.minLength}`);
        }
      } else if (field.type === "decimal") {
        if (field.precision !== undefined && field.precision !== 18) {
          parts.push(`precision=${field.precision}`);
        }
        if (field.scale !== undefined && field.scale !== 2) {
          parts.push(`scale=${field.scale}`);
        }
        if (field.minimum !== undefined) {
          parts.push(`min=${field.minimum}`);
        }
        if (field.maximum !== undefined) {
          parts.push(`max=${field.maximum}`);
        }
      } else if (
        field.type === "int" ||
        field.type === "long" ||
        field.type === "double"
      ) {
        if (field.minimum !== undefined) {
          parts.push(`min=${field.minimum}`);
        }
        if (field.maximum !== undefined) {
          parts.push(`max=${field.maximum}`);
        }
      }
      return parts.join(":");
    }

    case "enum": {
      const parts: string[] = [field.name, "enum"];
      const enumName = field.enumName || `${field.name}Status`;
      parts.push(`name=${enumName}`);
      const cleanValues = field.values
        .map((v) => v.trim())
        .filter(Boolean);
      parts.push(`values=${cleanValues.join("|")}`);
      parts.push(field.required ? "required" : "optional");
      return parts.join(":");
    }

    case "relationship": {
      const parts: string[] = [
        field.name,
        "relationship",
        `target=${field.target || "TargetEntity"}`,
        `type=${field.relationshipType}`,
      ];

      const toMany =
        field.relationshipType === "many-to-many" ||
        field.relationshipType === "one-to-many";

      if (field.required && !toMany) {
        parts.push("required");
      }

      if (field.display && field.display !== "Name") {
        parts.push(`display=${field.display}`);
      } else {
        parts.push("display=Name");
      }

      if (field.deleteBehavior) {
        parts.push(`delete=${field.deleteBehavior.toLowerCase()}`);
      }

      return parts.join(":");
    }

    case "media": {
      const cardinality = field.cardinality ?? "single";
      const req = cardinality === "multiple" ? "optional" : field.required ? "required" : "optional";
      const parts: string[] = [field.name, field.mediaKind, cardinality, req];
      if (field.maxSize !== undefined && field.maxSize > 0) {
        parts.push(`max-size=${field.maxSize}`);
      }
      if (
        cardinality === "multiple" &&
        field.maxFiles !== undefined &&
        field.maxFiles > 0
      ) {
        parts.push(`max-files=${field.maxFiles}`);
      }
      return parts.join(":");
    }

    case "richText": {
      return `${field.name}:richText:${field.required ? "required" : "optional"}`;
    }
  }
}

/**
 * Generate full non-interactive CLI command string matching Library CLI flags.
 */
export function buildFeatureCliCommand(
  feature: FeatureDefinition,
  options?: { multiline?: boolean },
): string {
  const parts: string[] = [
    "flatron",
    "create",
    "feature",
    feature.name || "MyFeature",
    "--yes",
  ];

  if (feature.plural && feature.plural.trim()) {
    parts.push(`--plural ${feature.plural.trim()}`);
  }

  if (feature.mode === "fullstack") {
    parts.push("--fullstack");
  } else if (feature.mode === "backend") {
    parts.push("--backend-only");
  } else if (feature.mode === "frontend") {
    parts.push("--frontend-only");
  }

  if (feature.surface && feature.surface !== "both") {
    parts.push(`--surface ${feature.surface}`);
  }

  if (feature.featureType === "readonly") {
    parts.push("--type readonly");
  }

  if (feature.permissions === false) {
    parts.push("--no-permissions");
  } else if (feature.permissions === true) {
    parts.push("--permissions");
  }

  if (feature.localize) {
    parts.push("--localize");
  }

  // Feature operations flags
  if (feature.operations) {
    if (feature.operations.search === false) parts.push("--no-search");
    if (feature.operations.pagination === false) parts.push("--no-pagination");
    if (feature.featureType !== "readonly") {
      if (feature.operations.create === false) parts.push("--no-create");
      if (feature.operations.update === false) parts.push("--no-update");
      if (feature.operations.delete === false) parts.push("--no-delete");
      if (feature.operations.restore === false) parts.push("--no-restore");
    }
  }

  // Feature label flags
  if (feature.labels) {
    if (feature.labels.enSingular) {
      parts.push(`--label-en-singular "${feature.labels.enSingular}"`);
    }
    if (feature.labels.enPlural) {
      parts.push(`--label-en-plural "${feature.labels.enPlural}"`);
    }
    if (feature.labels.arSingular) {
      parts.push(`--label-ar-singular "${feature.labels.arSingular}"`);
    }
    if (feature.labels.arPlural) {
      parts.push(`--label-ar-plural "${feature.labels.arPlural}"`);
    }
  }

  const fieldFlags = feature.fields.map(
    (field) => `--field "${serializeFieldFlag(field)}"`,
  );

  if (options?.multiline) {
    return [
      parts.join(" "),
      ...fieldFlags.map((flag) => `  ${flag}`),
    ].join(" \\\n");
  }

  return [...parts, ...fieldFlags].join(" ");
}

/**
 * Simple interactive command without pre-defined fields.
 */
export function buildInteractiveFeatureCommand(featureName?: string): string {
  return `flatron create feature ${featureName?.trim() || "MyFeature"}`;
}

