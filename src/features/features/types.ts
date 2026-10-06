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

export interface FeatureDefinition {
  name: string;
  plural?: string;
  mode: FeatureMode;
  surface: FeatureSurface;
  featureType: FeatureCrudType;
  permissions: boolean;
  localize: boolean;
  fields: FeatureField[];
}
