export type ModuleId =
  | "auth"
  | "users"
  | "permissions"
  | "audit"
  | "notifications"
  | "localization"
  | "rich-text"
  | "dashboard";

export type ModuleCategory =
  | "Security & Access"
  | "Administration"
  | "Data & Audit"
  | "UI & Foundation";

export interface ModuleDefinition {
  id: ModuleId;
  name: string;
  category: ModuleCategory;
  description: string;
  summary: string;
  includes: string[];
  requires: ModuleId[];
  requiresBackend: boolean;
  requiresFrontend: boolean;
  requiresEfCore: boolean;
  changesDatabase: boolean;
  packages?: {
    backend?: string[];
    react?: string[];
    angular?: string[];
  };
}

export interface ModuleCompatibilityStatus {
  compatible: boolean;
  reason?: string;
  notes?: string;
}
