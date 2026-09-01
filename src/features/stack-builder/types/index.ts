import type { DotnetVersion } from "../dotnet-versions";

export type ProjectType = "fullstack" | "backend" | "frontend";

export type BackendOrm = "EF Core" | "Dapper";
export type BackendDatabase = "PostgreSQL" | "SQL Server" | "SQLite";

export type FrontendFramework = "React" | "Angular";
export type FrontendTooling = "Vite" | "Next.js" | "Angular CLI";
export type FrontendLanguage = "TypeScript" | "JavaScript";
export type FrontendStyling = "Tailwind CSS" | "Bootstrap";
export type FrontendState = "Redux Toolkit" | "Zustand" | "NgRx" | "None";
export type FrontendUi =
  | "shadcn/ui"
  | "Material UI"
  | "Ant Design"
  | "Angular Material"
  | "Ant Design Angular"
  | "Bootstrap";

export interface FrontendConfiguration {
  framework: FrontendFramework;
  tooling: FrontendTooling;
  language: FrontendLanguage;
  styling: FrontendStyling;
  state: FrontendState;
  ui: FrontendUi;
  includeI18n: boolean;
  includeSonner: boolean;
}

export interface BackendConfiguration {
  framework: "dotnet";
  dotnetVersion: DotnetVersion;
  architecture: string;
  orm: BackendOrm;
  database: BackendDatabase;
  auth: string;
  signalR: boolean;
  hangfire: boolean;
  includeDocker: boolean;
  includeSwagger: boolean;
}

export interface StackConfiguration {
  projectName: string;
  projectType: ProjectType;
  backend: BackendConfiguration;
  frontend: FrontendConfiguration;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
