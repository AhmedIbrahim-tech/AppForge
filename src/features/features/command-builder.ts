import type {
  FeatureDefinition,
  FeatureField,
} from "./types";

/**
 * Serialize a single field into the exact Flatron CLI --field definition string.
 */
export function serializeFieldFlag(field: FeatureField): string {
  switch (field.kind) {
    case "scalar": {
      const parts: string[] = [field.name, field.type];
      parts.push(field.required ? "required" : "optional");

      if (field.type === "string") {
        if (field.minLength !== undefined && field.minLength > 0) {
          parts.push(`min=${field.minLength}`);
        }
        if (field.maxLength !== undefined && field.maxLength > 0) {
          parts.push(`max=${field.maxLength}`);
        }
      } else if (field.type === "decimal") {
        if (field.minimum !== undefined) {
          parts.push(`min=${field.minimum}`);
        }
        if (field.maximum !== undefined) {
          parts.push(`max=${field.maximum}`);
        }
        if (field.precision !== undefined) {
          parts.push(`precision=${field.precision}`);
        }
        if (field.scale !== undefined) {
          parts.push(`scale=${field.scale}`);
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
      const parts: string[] = [field.name, "relationship"];
      parts.push(`target=${field.target || "TargetEntity"}`);
      parts.push(`type=${field.relationshipType}`);
      if (field.display) {
        parts.push(`display=${field.display}`);
      }
      if (field.deleteBehavior && field.deleteBehavior !== "restrict") {
        parts.push(`delete=${field.deleteBehavior}`);
      }
      if (field.required !== undefined) {
        parts.push(field.required ? "required" : "optional");
      }
      return parts.join(":");
    }

    case "media": {
      const parts: string[] = [field.name, field.mediaKind, field.cardinality];
      parts.push(field.required ? "required" : "optional");
      if (field.maxSize !== undefined && field.maxSize > 0) {
        parts.push(`max-size=${field.maxSize}`);
      }
      if (
        field.cardinality === "multiple" &&
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
 * Generate full non-interactive CLI command string.
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

  if (feature.permissions) {
    parts.push("--permissions");
  }

  if (feature.localize) {
    parts.push("--localize");
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
