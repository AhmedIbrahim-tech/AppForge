import type { DotnetVersion } from "../dotnet-versions";

export type ProjectType = "fullstack" | "backend" | "frontend";

// Backend Types
export type BackendPresentation =
  | "Controllers"
  | "Minimal API"
  | "MVC"
  | "Razor Pages";

export type BackendArchitecture =
  | "CQRS + MediatR"
  | "Application Services";

export type BackendOrm =
  | "EF Core"
  | "Dapper"
  | "EF Core + Dapper";

export type BackendDatabase =
  | "PostgreSQL"
  | "SQL Server"
  | "SQLite";

export type BackendAuth =
  | "Identity + JWT"
  | "Identity + Cookies"
  | "None";

export type BackendMapping =
  | "Manual Mapping"
  | "AutoMapper";

export type BackendLogging = "Serilog" | "Built-in ILogger";
export type PackageManager = "npm" | "pnpm" | "yarn";

export interface BackendConfiguration {
  framework: "dotnet";
  dotnetVersion: DotnetVersion;
  presentation: BackendPresentation;
  architecture: BackendArchitecture;
  orm: BackendOrm;
  database: BackendDatabase;
  auth: BackendAuth;
  mapping: BackendMapping;
  logging?: BackendLogging;
  signalR: boolean;
  hangfire: boolean;
  includeDocker: boolean;
  includeSwagger: boolean;
}

// Frontend Types
export type FrontendFramework = "React" | "Angular";
export type FrontendTooling = "Vite" | "Next.js" | "Angular CLI";
export type FrontendLanguage = "TypeScript" | "JavaScript";
export type FrontendStyling = "Tailwind CSS" | "Bootstrap";
export type FrontendState = "Zustand" | "Redux Toolkit" | "NgRx" | "None";
export type FrontendHttpClient = "Axios" | "Fetch" | "Angular Http";
export type FrontendForms =
  | "React Hook Form + Zod"
  | "Angular Reactive Forms"
  | "None";

export type FrontendUi =
  | "shadcn/ui"
  | "Material UI"
  | "Ant Design"
  | "Angular Material"
  | "Ant Design Angular"
  | "None";

export interface FrontendConfiguration {
  framework: FrontendFramework;
  tooling: FrontendTooling;
  language: FrontendLanguage;
  styling: FrontendStyling;
  state: FrontendState;
  httpClient: FrontendHttpClient;
  forms: FrontendForms;
  ui: FrontendUi;
  includeI18n: boolean;
  includeSonner: boolean;
}

export interface StackConfiguration {
  projectName: string;
  projectType: ProjectType;
  backend: BackendConfiguration;
  frontend: FrontendConfiguration;
  packageManager?: PackageManager;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

