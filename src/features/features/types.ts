export type ScalarFieldType =
  | "string"
  | "int"
  | "long"
  | "decimal"
  | "double"
  | "boolean"
  | "Guid"
  | "DateTime"
  | "DateTimeOffset";

export type FieldKind = "scalar" | "enum" | "relationship" | "media" | "richText";

export type RelationshipType =
  | "many-to-one"
  | "one-to-many"
  | "many-to-many"
  | "one-to-one";

export type DeleteBehavior = "restrict" | "cascade" | "set-null" | "no-action";

export type MediaKind = "file" | "image";

export interface ScalarFieldConfig {
  kind: "scalar";
  name: string;
  type: ScalarFieldType;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  precision?: number;
  scale?: number;
}

export interface EnumFieldConfig {
  kind: "enum";
  name: string;
  enumName: string;
  values: string[];
  required: boolean;
}

export interface RelationshipFieldConfig {
  kind: "relationship";
  name: string;
  target: string;
  relationshipType: RelationshipType;
  required?: boolean;
  display?: string;
  deleteBehavior?: DeleteBehavior;
}

export interface MediaFieldConfig {
  kind: "media";
  name: string;
  mediaKind: MediaKind;
  cardinality: "single" | "multiple";
  required: boolean;
  maxSize?: number; // bytes
  maxFiles?: number;
}

export interface RichTextFieldConfig {
  kind: "richText";
  name: string;
  required: boolean;
}

export type FeatureField =
  | ScalarFieldConfig
  | EnumFieldConfig
  | RelationshipFieldConfig
  | MediaFieldConfig
  | RichTextFieldConfig;

export type FeatureMode = "fullstack" | "backend" | "frontend";
export type FeatureSurface = "dashboard" | "public" | "both";
export type FeatureCrudType = "crud" | "readonly";

export interface FeatureOperations {
  list: boolean;
  getById: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
  restore: boolean;
  search: boolean;
  pagination: boolean;
}

export interface FeatureLabels {
  enSingular?: string;
  enPlural?: string;
  arSingular?: string | null;
  arPlural?: string | null;
}

export interface FeatureDefinition {
  name: string;
  plural?: string;
  mode: FeatureMode;
  surface: FeatureSurface;
  featureType: FeatureCrudType;
  operations?: Partial<FeatureOperations>;
  labels?: FeatureLabels;
  permissions: boolean;
  localize: boolean;
  fields: FeatureField[];
}

export const RESERVED_FEATURE_NAMES = new Set([
  "API",
  "Application",
  "Domain",
  "Infrastructure",
  "Backend",
  "Frontend",
  "Client",
  "Common",
  "Shared",
  "System",
  "Object",
  "BaseEntity",
  "Controller",
  "Entity",
  "Router",
]);

export const SYSTEM_FIELD_NAMES = new Set([
  "Id",
  "CreatedAtUtc",
  "UpdatedAtUtc",
  "DeletedAtUtc",
  "IsDeleted",
  "RowVersion",
]);

export const BANNED_FIELD_TOKENS =
  /\b(eval|Function|require|import|process|child_process|constructor|prototype|__proto__)\b/i;

