import type {
  ProjectType,
  BackendPresentation,
  BackendArchitecture,
  BackendOrm,
  BackendDatabase,
  BackendAuth,
  BackendMapping,
  BackendLogging,
  FrontendFramework,
  FrontendTooling,
  FrontendLanguage,
  FrontendStyling,
  FrontendState,
  FrontendHttpClient,
  FrontendForms,
  FrontendUi,
  PackageManager,
  StackConfiguration,
  ValidationResult,
  FrontendConfiguration,
} from "./types";
import type { PresetDefinition } from "./presets";

export interface OptionDefinition<T> {
  value: T;
  label: string;
  shortLabel?: string;
  description: string;
  getDisabledState?: (config: StackConfiguration) => {
    disabled: boolean;
    reason?: string;
  };
}

// ---------------------------------------------------------
// 1. PROJECT CAPABILITIES
// ---------------------------------------------------------
export const PROJECT_MODES: OptionDefinition<ProjectType>[] = [
  {
    value: "fullstack",
    label: "Full Stack",
    shortLabel: "Full Stack",
    description: ".NET 10 Web API + Modern Frontend client",
  },
  {
    value: "backend",
    label: "Backend Only",
    shortLabel: "Backend",
    description: "ASP.NET Core Clean Architecture solution",
  },
  {
    value: "frontend",
    label: "Frontend Only",
    shortLabel: "Frontend",
    description: "Standalone React or Angular client application",
  },
];

export const PACKAGE_MANAGERS: OptionDefinition<PackageManager>[] = [
  { value: "npm", label: "npm", description: "Node package manager (default)" },
  { value: "pnpm", label: "pnpm", description: "Fast, disk space efficient" },
  { value: "yarn", label: "Yarn", description: "Yarn classic / modern" },
];

// ---------------------------------------------------------
// 2. BACKEND CAPABILITIES
// ---------------------------------------------------------
export const BACKEND_PRESENTATIONS: OptionDefinition<BackendPresentation>[] = [
  {
    value: "Controllers",
    label: "Controllers",
    shortLabel: "Controllers",
    description: "ASP.NET Core Web API Controllers",
  },
  {
    value: "Minimal API",
    label: "Minimal API",
    shortLabel: "Minimal API",
    description: "Fast, endpoint-based API routes",
  },
  {
    value: "MVC",
    label: "MVC",
    shortLabel: "MVC",
    description: "Model-View-Controller with Razor Views",
    getDisabledState: (config) =>
      config.projectType === "fullstack"
        ? {
            disabled: true,
            reason: "Full Stack SPA mode does not support server-rendered MVC presentation.",
          }
        : { disabled: false },
  },
  {
    value: "Razor Pages",
    label: "Razor Pages",
    shortLabel: "Razor Pages",
    description: "Page-focused server-rendered UI",
    getDisabledState: (config) =>
      config.projectType === "fullstack"
        ? {
            disabled: true,
            reason: "Full Stack SPA mode does not support Razor Pages presentation.",
          }
        : { disabled: false },
  },
];

export const BACKEND_ARCHITECTURES: OptionDefinition<BackendArchitecture>[] = [
  {
    value: "CQRS + MediatR",
    label: "CQRS + MediatR",
    shortLabel: "CQRS",
    description: "Features with isolated Commands, Queries & Handlers",
  },
  {
    value: "Application Services",
    label: "Application Services",
    shortLabel: "Services",
    description: "Modular application service interfaces & implementations",
  },
];

export const BACKEND_ORMS: OptionDefinition<BackendOrm>[] = [
  {
    value: "EF Core",
    label: "EF Core",
    shortLabel: "EF Core",
    description: "Entity Framework Core with Migrations",
  },
  {
    value: "Dapper",
    label: "Dapper",
    shortLabel: "Dapper",
    description: "High-performance micro-ORM with SQL queries",
  },
  {
    value: "EF Core + Dapper",
    label: "EF Core + Dapper (Hybrid)",
    shortLabel: "Hybrid",
    description: "EF Core for writes/migrations & Dapper for fast reads",
  },
];

export const BACKEND_DATABASES: OptionDefinition<BackendDatabase>[] = [
  {
    value: "SQL Server",
    label: "SQL Server",
    shortLabel: "SQL Server",
    description: "Microsoft SQL Server database engine",
  },
  {
    value: "PostgreSQL",
    label: "PostgreSQL",
    shortLabel: "Postgres",
    description: "Npgsql open-source relational database",
  },
  {
    value: "SQLite",
    label: "SQLite",
    shortLabel: "SQLite",
    description: "Zero-configuration embedded file database",
  },
];

export const BACKEND_AUTHS: OptionDefinition<BackendAuth>[] = [
  {
    value: "Identity + JWT",
    label: "Identity + JWT",
    shortLabel: "Identity + JWT",
    description: "ASP.NET Identity user store with JWT Bearer tokens",
    getDisabledState: (config) => {
      if (config.backend.orm === "Dapper") {
        return {
          disabled: true,
          reason: "Dapper-only cannot be combined with ASP.NET Identity. Use EF Core, Hybrid, or select None.",
        };
      }
      if (
        config.backend.presentation === "MVC" ||
        config.backend.presentation === "Razor Pages"
      ) {
        return {
          disabled: true,
          reason: "Server-rendered MVC/Razor apps use Cookie authentication",
        };
      }
      return { disabled: false };
    },
  },
  {
    value: "Identity + Cookies",
    label: "Identity + Cookies",
    shortLabel: "Identity + Cookies",
    description: "ASP.NET Identity with Cookie session management",
    getDisabledState: (config) => {
      if (config.backend.orm === "Dapper") {
        return {
          disabled: true,
          reason: "Dapper-only cannot be combined with ASP.NET Identity. Use EF Core, Hybrid, or select None.",
        };
      }
      return { disabled: false };
    },
  },
  {
    value: "None",
    label: "None",
    shortLabel: "None",
    description: "Public access without authentication layer",
  },
];

export const BACKEND_MAPPINGS: OptionDefinition<BackendMapping>[] = [
  {
    value: "AutoMapper",
    label: "AutoMapper",
    shortLabel: "AutoMapper",
    description: "Automated profile-based object mapping",
  },
  {
    value: "Manual Mapping",
    label: "Manual Mapping",
    shortLabel: "Manual",
    description: "Zero-dependency static C# extension methods",
  },
];

export const BACKEND_LOGGINGS: OptionDefinition<BackendLogging>[] = [
  {
    value: "Serilog",
    label: "Serilog",
    shortLabel: "Serilog",
    description: "Structured JSON logging with Serilog sinks (default)",
  },
  {
    value: "Built-in ILogger",
    label: "Built-in ILogger",
    shortLabel: "ILogger",
    description: "Standard Microsoft.Extensions.Logging provider",
  },
];

// ---------------------------------------------------------
// 3. FRONTEND CAPABILITIES
// ---------------------------------------------------------
export const FRONTEND_FRAMEWORKS: OptionDefinition<FrontendFramework>[] = [
  {
    value: "React",
    label: "React 19",
    shortLabel: "React",
    description: "Modern component-driven UI with React 19",
  },
  {
    value: "Angular",
    label: "Angular",
    shortLabel: "Angular",
    description: "Enterprise standalone Angular CLI architecture",
  },
];

export const FRONTEND_TOOLINGS: OptionDefinition<FrontendTooling>[] = [
  {
    value: "Vite",
    label: "Vite",
    shortLabel: "Vite",
    description: "Next-generation frontend tooling with instant HMR",
    getDisabledState: (config) =>
      config.frontend.framework !== "React"
        ? { disabled: true, reason: "Vite is configured for React" }
        : { disabled: false },
  },
  {
    value: "Next.js",
    label: "Next.js",
    shortLabel: "Next.js",
    description: "Full-stack React framework with App Router",
    getDisabledState: (config) =>
      config.frontend.framework !== "React"
        ? { disabled: true, reason: "Next.js is a React framework" }
        : { disabled: false },
  },
  {
    value: "Angular CLI",
    label: "Angular CLI",
    shortLabel: "Angular CLI",
    description: "Official Angular CLI build and development tool",
    getDisabledState: (config) =>
      config.frontend.framework !== "Angular"
        ? { disabled: true, reason: "Angular CLI is only for Angular" }
        : { disabled: false },
  },
];

export const FRONTEND_LANGUAGES: OptionDefinition<FrontendLanguage>[] = [
  {
    value: "TypeScript",
    label: "TypeScript",
    shortLabel: "TypeScript",
    description: "Strict static typing with modern ECMAScript",
  },
  {
    value: "JavaScript",
    label: "JavaScript",
    shortLabel: "JavaScript",
    description: "Standard ES module JavaScript",
    getDisabledState: (config) => {
      if (config.frontend.framework === "Angular") {
        return { disabled: true, reason: "Angular requires TypeScript" };
      }
      if (config.frontend.tooling === "Next.js") {
        return {
          disabled: true,
          reason: "Next.js starter is configured with TypeScript",
        };
      }
      if (config.frontend.ui === "shadcn/ui") {
        return { disabled: true, reason: "shadcn/ui requires TypeScript" };
      }
      return { disabled: false };
    },
  },
];

export const FRONTEND_STYLINGS: OptionDefinition<FrontendStyling>[] = [
  {
    value: "Tailwind CSS",
    label: "Tailwind CSS",
    shortLabel: "Tailwind",
    description: "Utility-first modern CSS design system",
  },
  {
    value: "Bootstrap",
    label: "Bootstrap 5",
    shortLabel: "Bootstrap",
    description: "Responsive component framework and grid",
  },
];

export const FRONTEND_STATES: OptionDefinition<FrontendState>[] = [
  {
    value: "Zustand",
    label: "Zustand",
    shortLabel: "Zustand",
    description: "Small, fast and scalable bearbones state-management",
    getDisabledState: (config) =>
      config.frontend.framework !== "React"
        ? { disabled: true, reason: "Zustand is a React state library" }
        : { disabled: false },
  },
  {
    value: "Redux Toolkit",
    label: "Redux Toolkit",
    shortLabel: "Redux",
    description: "Standard approach for writing Redux logic",
    getDisabledState: (config) =>
      config.frontend.framework !== "React"
        ? { disabled: true, reason: "Redux Toolkit is for React" }
        : { disabled: false },
  },
  {
    value: "NgRx",
    label: "NgRx",
    shortLabel: "NgRx",
    description: "Reactive state management for Angular",
    getDisabledState: (config) =>
      config.frontend.framework !== "Angular"
        ? { disabled: true, reason: "NgRx is only for Angular" }
        : { disabled: false },
  },
  {
    value: "None",
    label: "None",
    shortLabel: "None",
    description: "Local component state without global store",
  },
];

export const FRONTEND_HTTP_CLIENTS: OptionDefinition<FrontendHttpClient>[] = [
  {
    value: "Axios",
    label: "Axios",
    shortLabel: "Axios",
    description: "Promise-based HTTP client with interceptors",
    getDisabledState: (config) =>
      config.frontend.framework !== "React"
        ? {
            disabled: true,
            reason: "Axios is for React (Angular uses Angular Http)",
          }
        : { disabled: false },
  },
  {
    value: "Fetch",
    label: "Fetch API",
    shortLabel: "Fetch",
    description: "Native browser fetch wrapper with type safety",
    getDisabledState: (config) =>
      config.frontend.framework !== "React"
        ? {
            disabled: true,
            reason: "Fetch is for React (Angular uses Angular Http)",
          }
        : { disabled: false },
  },
  {
    value: "Angular Http",
    label: "Angular Http",
    shortLabel: "HttpClient",
    description: "Built-in HttpClient with RxJS Observables",
    getDisabledState: (config) =>
      config.frontend.framework !== "Angular"
        ? { disabled: true, reason: "Angular Http is only for Angular" }
        : { disabled: false },
  },
];

export const FRONTEND_FORMS: OptionDefinition<FrontendForms>[] = [
  {
    value: "React Hook Form + Zod",
    label: "RHF + Zod",
    shortLabel: "RHF + Zod",
    description: "Performant, flexible form validation with Zod schemas",
    getDisabledState: (config) =>
      config.frontend.framework !== "React"
        ? {
            disabled: true,
            reason: "React Hook Form is only supported on React",
          }
        : { disabled: false },
  },
  {
    value: "Angular Reactive Forms",
    label: "Reactive Forms",
    shortLabel: "Reactive Forms",
    description: "Model-driven form handling with FormBuilder & Validators",
    getDisabledState: (config) =>
      config.frontend.framework !== "Angular"
        ? {
            disabled: true,
            reason: "Reactive Forms is only supported on Angular",
          }
        : { disabled: false },
  },
  {
    value: "None",
    label: "None",
    shortLabel: "None",
    description: "Standard HTML form inputs without validation library",
  },
];

export const FRONTEND_UIS: OptionDefinition<FrontendUi>[] = [
  {
    value: "shadcn/ui",
    label: "shadcn/ui",
    shortLabel: "shadcn/ui",
    description: "Accessible Radix UI components with Tailwind CSS",
    getDisabledState: (config) => {
      if (config.frontend.framework !== "React") {
        return { disabled: true, reason: "shadcn/ui is only for React" };
      }
      if (config.frontend.styling !== "Tailwind CSS") {
        return {
          disabled: true,
          reason: "shadcn/ui requires Tailwind CSS styling",
        };
      }
      if (config.frontend.language !== "TypeScript") {
        return {
          disabled: true,
          reason: "shadcn/ui requires TypeScript language",
        };
      }
      return { disabled: false };
    },
  },
  {
    value: "Material UI",
    label: "Material UI",
    shortLabel: "MUI",
    description: "Google Material Design components for React",
    getDisabledState: (config) =>
      config.frontend.framework !== "React"
        ? { disabled: true, reason: "Material UI (MUI) is only for React" }
        : { disabled: false },
  },
  {
    value: "Ant Design",
    label: "Ant Design",
    shortLabel: "Ant Design",
    description: "Enterprise-class UI design language for React",
    getDisabledState: (config) =>
      config.frontend.framework !== "React"
        ? { disabled: true, reason: "Ant Design is only for React" }
        : { disabled: false },
  },
  {
    value: "Angular Material",
    label: "Angular Material",
    shortLabel: "Angular Material",
    description: "Official Material Design components for Angular",
    getDisabledState: (config) =>
      config.frontend.framework !== "Angular"
        ? {
            disabled: true,
            reason: "Angular Material is only for Angular",
          }
        : { disabled: false },
  },
  {
    value: "Ant Design Angular",
    label: "NG-ZORRO",
    shortLabel: "NG-ZORRO",
    description: "Ant Design library implementation for Angular",
    getDisabledState: (config) =>
      config.frontend.framework !== "Angular"
        ? {
            disabled: true,
            reason: "Ant Design Angular is only for Angular",
          }
        : { disabled: false },
  },
  {
    value: "None",
    label: "None",
    shortLabel: "None",
    description: "Custom CSS / components without library dependency",
  },
];

// ---------------------------------------------------------
// 4. DETERMINISTIC RECONCILIATION ENGINE
// ---------------------------------------------------------

/**
 * Normalizes frontend configuration when switching between React and Angular.
 * Eliminates cross-framework pollution completely.
 */
export function reconcileFrontendOnFrameworkChange(
  current: FrontendConfiguration,
  targetFramework: FrontendFramework,
): {
  reconciled: FrontendConfiguration;
  changed: boolean;
  adjustments: string[];
} {
  const adjustments: string[] = [];
  const next: FrontendConfiguration = {
    ...current,
    framework: targetFramework,
  };

  if (targetFramework === "Angular") {
    if (next.tooling !== "Angular CLI") {
      next.tooling = "Angular CLI";
      adjustments.push("Tooling -> Angular CLI");
    }
    if (next.language !== "TypeScript") {
      next.language = "TypeScript";
      adjustments.push("Language -> TypeScript (Required by Angular)");
    }
    if (next.state === "Zustand" || next.state === "Redux Toolkit") {
      next.state = "NgRx";
      adjustments.push("State -> NgRx");
    }
    if (next.httpClient !== "Angular Http") {
      next.httpClient = "Angular Http";
      adjustments.push("HTTP -> Angular Http");
    }
    if (next.forms === "React Hook Form + Zod") {
      next.forms = "Angular Reactive Forms";
      adjustments.push("Forms -> Angular Reactive Forms");
    }
    if (
      next.ui === "shadcn/ui" ||
      next.ui === "Material UI" ||
      next.ui === "Ant Design"
    ) {
      next.ui = "Angular Material";
      adjustments.push("UI -> Angular Material");
    }
    if (next.includeSonner) {
      next.includeSonner = false;
    }
  } else {
    // React
    if (next.tooling === "Angular CLI") {
      next.tooling = "Vite";
      adjustments.push("Tooling -> Vite");
    }
    if (next.state === "NgRx") {
      next.state = "Zustand";
      adjustments.push("State -> Zustand");
    }
    if (next.httpClient === "Angular Http") {
      next.httpClient = "Axios";
      adjustments.push("HTTP -> Axios");
    }
    if (next.forms === "Angular Reactive Forms") {
      next.forms = "React Hook Form + Zod";
      adjustments.push("Forms -> React Hook Form + Zod");
    }
    if (next.ui === "Angular Material" || next.ui === "Ant Design Angular") {
      next.ui = next.styling === "Tailwind CSS" ? "shadcn/ui" : "Material UI";
      adjustments.push(`UI -> ${next.ui}`);
    }
  }

  // Check Bootstrap + shadcn/ui conflict
  if (next.styling === "Bootstrap" && next.ui === "shadcn/ui") {
    next.ui = targetFramework === "React" ? "Material UI" : "None";
    adjustments.push(`UI -> ${next.ui} (Bootstrap incompatible with shadcn/ui)`);
  }

  return {
    reconciled: next,
    changed: adjustments.length > 0,
    adjustments,
  };
}

/**
 * Reconciles the entire StackConfiguration ensuring no invalid combinations exist.
 */
export function reconcileCompleteStack(
  config: StackConfiguration,
): StackConfiguration {
  const next: StackConfiguration = JSON.parse(JSON.stringify(config));

  // 1. Backend Presentation rules
  if (next.projectType === "fullstack") {
    if (
      next.backend.presentation === "MVC" ||
      next.backend.presentation === "Razor Pages"
    ) {
      next.backend.presentation = "Controllers";
    }
  }

  // 2. Server-rendered presentation vs Auth
  if (
    next.backend.presentation === "MVC" ||
    next.backend.presentation === "Razor Pages"
  ) {
    if (next.backend.auth === "Identity + JWT") {
      next.backend.auth = "Identity + Cookies";
    }
  }

  // 3. Dapper only vs Identity
  if (next.backend.orm === "Dapper" && next.backend.auth !== "None") {
    next.backend.auth = "None";
  }

  // 5. Frontend framework rules
  const { reconciled } = reconcileFrontendOnFrameworkChange(
    next.frontend,
    next.frontend.framework,
  );
  next.frontend = reconciled;

  return next;
}

// ---------------------------------------------------------
// 5. VALIDATION ENGINE (Matches CLI validation strictly)
// ---------------------------------------------------------
export function validateCompleteStack(
  config: StackConfiguration,
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Project Name
  const trimmedName = config.projectName?.trim() ?? "";
  if (!trimmedName) {
    errors.push("Project name is required.");
  } else if (!/^[a-zA-Z0-9_.-]+$/.test(trimmedName)) {
    errors.push(
      "Project name can only contain letters, numbers, hyphens, underscores, and dots.",
    );
  }

  // Backend Validation (if not frontend-only)
  if (config.projectType !== "frontend") {
    const b = config.backend;

    if (
      config.projectType === "fullstack" &&
      b.presentation !== "Controllers" &&
      b.presentation !== "Minimal API"
    ) {
      errors.push(
        `Full Stack mode only supports Web API (Controllers or Minimal API). Cannot use with backend type "${b.presentation.toLowerCase().replace(" ", "-")}".`,
      );
    }

    if (
      (b.presentation === "MVC" || b.presentation === "Razor Pages") &&
      b.auth === "Identity + JWT"
    ) {
      errors.push(
        `${b.presentation} server-rendered applications use Cookie authentication instead of JWT.`,
      );
    }

    if (b.orm === "Dapper" && b.auth !== "None") {
      errors.push(
        "ASP.NET Core Identity store requires EF Core. Use 'EF Core + Dapper (Hybrid)' or select 'None' for Dapper-only.",
      );
    }
  }

  // Frontend Validation (if not backend-only)
  if (config.projectType !== "backend") {
    const f = config.frontend;

    if (f.framework === "Angular") {
      if (f.tooling !== "Angular CLI") {
        errors.push(`Tooling '${f.tooling}' is not supported for Angular.`);
      }
      if (f.language !== "TypeScript") {
        errors.push("Angular requires TypeScript.");
      }
      if (f.state !== "NgRx" && f.state !== "None") {
        errors.push(`State library '${f.state}' is not supported for Angular.`);
      }
      if (f.httpClient !== "Angular Http") {
        errors.push(
          `HTTP client '${f.httpClient}' is not supported for Angular (use Angular Http).`,
        );
      }
      if (
        f.forms !== "Angular Reactive Forms" &&
        f.forms !== "None"
      ) {
        errors.push(
          `Forms system '${f.forms}' is not supported for Angular.`,
        );
      }
      if (
        f.ui !== "Angular Material" &&
        f.ui !== "Ant Design Angular" &&
        f.ui !== "None"
      ) {
        errors.push(`UI library '${f.ui}' is not supported for Angular.`);
      }
    } else if (f.framework === "React") {
      if (f.tooling !== "Vite" && f.tooling !== "Next.js") {
        errors.push(`Tooling '${f.tooling}' is not supported for React.`);
      }
      if (f.tooling === "Next.js" && f.language === "JavaScript") {
        errors.push("Next.js project generator requires TypeScript.");
      }
      if (
        f.state !== "Zustand" &&
        f.state !== "Redux Toolkit" &&
        f.state !== "None"
      ) {
        errors.push(`State library '${f.state}' is not supported for React.`);
      }
      if (f.httpClient !== "Axios" && f.httpClient !== "Fetch") {
        errors.push(`HTTP client '${f.httpClient}' is not supported for React.`);
      }
      if (
        f.forms !== "React Hook Form + Zod" &&
        f.forms !== "None"
      ) {
        errors.push(`Forms system '${f.forms}' is not supported for React.`);
      }
      if (
        f.ui !== "shadcn/ui" &&
        f.ui !== "Material UI" &&
        f.ui !== "Ant Design" &&
        f.ui !== "None"
      ) {
        errors.push(`UI library '${f.ui}' is not supported for React.`);
      }
      if (f.ui === "shadcn/ui") {
        if (f.styling !== "Tailwind CSS") {
          errors.push("shadcn/ui requires Tailwind CSS styling.");
        }
        if (f.language !== "TypeScript") {
          errors.push("shadcn/ui requires TypeScript.");
        }
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

// ---------------------------------------------------------
// 6. PRESET DETERMINISTIC MATCHING
// ---------------------------------------------------------
export function isPresetActive(
  preset: PresetDefinition,
  config: StackConfiguration,
): boolean {
  if (config.projectType !== preset.config.projectType) return false;

  if (config.projectType !== "frontend") {
    const b = config.backend;
    const pb = preset.config.backend;
    if (
      b.presentation !== pb.presentation ||
      b.architecture !== pb.architecture ||
      b.orm !== pb.orm ||
      b.database !== pb.database ||
      b.auth !== pb.auth ||
      b.mapping !== pb.mapping
    ) {
      return false;
    }
  }

  if (config.projectType !== "backend") {
    const f = config.frontend;
    const pf = preset.config.frontend;
    if (
      f.framework !== pf.framework ||
      f.tooling !== pf.tooling ||
      f.language !== pf.language ||
      f.styling !== pf.styling ||
      f.state !== pf.state ||
      f.httpClient !== pf.httpClient ||
      f.forms !== pf.forms ||
      f.ui !== pf.ui
    ) {
      return false;
    }
  }

  return true;
}

// ---------------------------------------------------------
// 7. CLI COMMAND GENERATOR (Canonical Flatron CLI Flags)
// ---------------------------------------------------------
export function buildCliCommand(config: StackConfiguration): string {
  const flags: string[] = [];
  const name = config.projectName || "nexus-app";

  flags.push(`--type ${config.projectType}`);

  if (config.projectType !== "frontend") {
    const b = config.backend;
    const presMap: Record<BackendPresentation, string> = {
      Controllers: "controllers",
      "Minimal API": "minimal-api",
      MVC: "mvc",
      "Razor Pages": "razor-pages",
    };
    if (config.projectType === "backend") {
      flags.push(`--backend-type ${presMap[b.presentation]}`);
    } else if (
      config.projectType === "fullstack" &&
      b.presentation === "Minimal API"
    ) {
      flags.push("--backend-type minimal-api");
    }

    const archMap: Record<BackendArchitecture, string> = {
      "CQRS + MediatR": "cqrs",
      "Application Services": "services",
    };
    flags.push(`--architecture ${archMap[b.architecture]}`);

    flags.push(
      `--mapping ${b.mapping === "AutoMapper" ? "automapper" : "manual"}`,
    );

    const ormMap: Record<BackendOrm, string> = {
      "EF Core": "efcore",
      Dapper: "dapper",
      "EF Core + Dapper": "hybrid",
    };
    flags.push(`--orm ${ormMap[b.orm]}`);

    const dbMap: Record<BackendDatabase, string> = {
      PostgreSQL: "postgresql",
      "SQL Server": "sqlserver",
      SQLite: "sqlite",
    };
    flags.push(`--db ${dbMap[b.database]}`);

    const authMap: Record<BackendAuth, string> = {
      "Identity + JWT": "jwt",
      "Identity + Cookies": "cookies",
      None: "none",
    };
    flags.push(`--auth ${authMap[b.auth]}`);

    if (b.logging === "Built-in ILogger") {
      flags.push("--logging builtin");
    }

    if (b.signalR) flags.push("--signalr");
    if (b.hangfire) flags.push("--hangfire");
    if (!b.includeSwagger) flags.push("--no-swagger");
  }

  if (config.projectType !== "backend") {
    const f = config.frontend;
    flags.push(`--frontend ${f.framework.toLowerCase()}`);

    const toolingMap: Record<FrontendTooling, string> = {
      Vite: "vite",
      "Next.js": "next",
      "Angular CLI": "angular-cli",
    };
    flags.push(`--frontend-tooling ${toolingMap[f.tooling]}`);

    flags.push(`--language ${f.language.toLowerCase()}`);

    const stylingMap: Record<FrontendStyling, string> = {
      "Tailwind CSS": "tailwind",
      Bootstrap: "bootstrap",
    };
    flags.push(`--styling ${stylingMap[f.styling]}`);

    const stateMap: Record<FrontendState, string> = {
      Zustand: "zustand",
      "Redux Toolkit": "redux",
      NgRx: "ngrx",
      None: "none",
    };
    flags.push(`--state ${stateMap[f.state]}`);

    const httpMap: Record<FrontendHttpClient, string> = {
      Axios: "axios",
      Fetch: "fetch",
      "Angular Http": "angular-http",
    };
    flags.push(`--http ${httpMap[f.httpClient]}`);

    const formsMap: Record<FrontendForms, string> = {
      "React Hook Form + Zod": "rhf-zod",
      "Angular Reactive Forms": "angular-reactive",
      None: "none",
    };
    flags.push(`--forms ${formsMap[f.forms]}`);

    const uiMap: Record<FrontendUi, string> = {
      "shadcn/ui": "shadcn",
      "Material UI": "mui",
      "Ant Design": "antd",
      "Angular Material": "angular-material",
      "Ant Design Angular": "antd-angular",
      None: "none",
    };
    flags.push(`--ui ${uiMap[f.ui]}`);

    if (f.includeI18n) {
      flags.push("--localization");
    } else {
      flags.push("--no-localization");
    }
  }

  if (config.packageManager && config.packageManager !== "npm") {
    flags.push(`--package-manager ${config.packageManager}`);
  }

  flags.push("--yes");

  return `npx flatron ${name} ${flags.join(" ")}`;
}

// ---------------------------------------------------------
// 8. STACK SUMMARY ITEMS GENERATOR
// ---------------------------------------------------------
export interface SummaryChip {
  id: string;
  category: "project" | "backend" | "frontend" | "advanced";
  label: string;
  detail?: string;
  tone: "indigo" | "cyan" | "purple" | "amber" | "emerald";
}

export function generateStackSummary(config: StackConfiguration): SummaryChip[] {
  const chips: SummaryChip[] = [];

  // Project
  const modeLabel =
    config.projectType === "fullstack"
      ? "Full Stack"
      : config.projectType === "backend"
        ? "Backend Only"
        : "Frontend Only";

  chips.push({
    id: "mode",
    category: "project",
    label: modeLabel,
    tone: "indigo",
  });

  if (config.projectType !== "frontend") {
    chips.push({
      id: "dotnet",
      category: "backend",
      label: ".NET 10",
      tone: "cyan",
    });

    chips.push({
      id: "pres",
      category: "backend",
      label: config.backend.presentation,
      tone: "cyan",
    });

    chips.push({
      id: "arch",
      category: "backend",
      label:
        config.backend.architecture === "CQRS + MediatR"
          ? "CQRS"
          : "Services",
      tone: "cyan",
    });

    chips.push({
      id: "orm",
      category: "backend",
      label: config.backend.orm,
      tone: "cyan",
    });

    chips.push({
      id: "db",
      category: "backend",
      label: config.backend.database,
      tone: "cyan",
    });

    chips.push({
      id: "auth",
      category: "backend",
      label: config.backend.auth,
      tone: "cyan",
    });

    if (config.backend.signalR) {
      chips.push({
        id: "signalr",
        category: "backend",
        label: "SignalR",
        tone: "amber",
      });
    }

    if (config.backend.hangfire) {
      chips.push({
        id: "hangfire",
        category: "backend",
        label: "Hangfire",
        tone: "amber",
      });
    }
  }

  if (config.projectType !== "backend") {
    const f = config.frontend;
    chips.push({
      id: "fw",
      category: "frontend",
      label: f.framework,
      detail: f.tooling,
      tone: "purple",
    });

    chips.push({
      id: "styling",
      category: "frontend",
      label: f.styling === "Tailwind CSS" ? "Tailwind" : "Bootstrap",
      tone: "purple",
    });

    if (f.state !== "None") {
      chips.push({
        id: "state",
        category: "frontend",
        label: f.state === "Redux Toolkit" ? "Redux" : f.state,
        tone: "purple",
      });
    }

    chips.push({
      id: "http",
      category: "frontend",
      label: f.httpClient,
      tone: "purple",
    });

    if (f.forms !== "None") {
      chips.push({
        id: "forms",
        category: "frontend",
        label:
          f.forms === "React Hook Form + Zod"
            ? "RHF + Zod"
            : "Reactive Forms",
        tone: "purple",
      });
    }

    if (f.ui !== "None") {
      chips.push({
        id: "ui",
        category: "frontend",
        label: f.ui,
        tone: "purple",
      });
    }

    if (f.includeI18n) {
      chips.push({
        id: "i18n",
        category: "advanced",
        label: "i18n",
        tone: "emerald",
      });
    }
  }

  return chips;
}

// ---------------------------------------------------------
// 9. NORMALIZED MANIFEST GENERATOR (.fullstack-app.json)
// ---------------------------------------------------------
export function buildManifestJson(config: StackConfiguration): string {
  const isBackend = config.projectType !== "frontend";
  const isFrontend = config.projectType !== "backend";

  const manifest = {
    generatorVersion: "1.1.0",
    projectName: config.projectName || "nexus-app",
    paths: {
      backend: isBackend ? (config.projectType === "fullstack" ? "Backend" : ".") : null,
      frontend: isFrontend ? (config.projectType === "fullstack" ? "Frontend" : ".") : null,
    },
    backend: isBackend
      ? {
          enabled: true,
          dotnet: "10",
          targetFramework: "net10.0",
          presentation: config.backend.presentation.toLowerCase().replace(" ", "-"),
          architecture:
            config.backend.architecture === "CQRS + MediatR"
              ? "cqrs-mediatr"
              : "services",
          orm:
            config.backend.orm === "EF Core + Dapper"
              ? "efcore-dapper"
              : config.backend.orm.toLowerCase().replace(" ", ""),
          database: config.backend.database.toLowerCase().replace(" ", ""),
          mapping:
            config.backend.mapping === "AutoMapper" ? "automapper" : "manual",
          authentication:
            config.backend.auth === "Identity + JWT"
              ? "identity-jwt"
              : config.backend.auth === "Identity + Cookies"
                ? "identity"
                : "none",
          realtime: config.backend.signalR ? "signalr" : "none",
          logging:
            config.backend.logging === "Built-in ILogger" ? "ilogger" : "serilog",
          backgroundJobs: config.backend.hangfire ? "hangfire" : "none",
        }
      : {
          enabled: false,
          dotnet: null,
          targetFramework: null,
          presentation: null,
          architecture: null,
          orm: null,
          database: null,
          mapping: null,
          authentication: null,
          realtime: null,
        },
    frontend: isFrontend
      ? {
          enabled: true,
          library: config.frontend.framework.toLowerCase(),
          framework:
            config.frontend.framework === "Angular"
              ? null
              : config.frontend.tooling.toLowerCase().replace(".", ""),
          language: config.frontend.language.toLowerCase(),
          styling:
            config.frontend.styling === "Tailwind CSS" ? "tailwind" : "bootstrap",
          state:
            config.frontend.state === "None"
              ? "none"
              : config.frontend.state.toLowerCase().replace(" ", "-"),
          httpClient:
            config.frontend.httpClient === "Angular Http"
              ? "httpclient"
              : config.frontend.httpClient.toLowerCase(),
          forms:
            config.frontend.forms === "React Hook Form + Zod"
              ? "react-hook-form-zod"
              : config.frontend.forms === "Angular Reactive Forms"
                ? "reactive-forms"
                : "none",
          componentSystem:
            config.frontend.framework === "Angular"
              ? "none"
              : config.frontend.ui === "shadcn/ui"
                ? "shadcn"
                : config.frontend.ui === "Material UI"
                  ? "mui"
                  : config.frontend.ui === "Ant Design"
                    ? "antd"
                    : "none",
          localization: config.frontend.includeI18n,
          realtime: config.backend.signalR ? "signalr" : "none",
        }
      : {
          enabled: false,
          library: null,
          framework: null,
          language: null,
          styling: null,
          state: null,
          httpClient: null,
          forms: null,
          componentSystem: null,
          localization: false,
          realtime: null,
        },
    packageManager: config.packageManager || "npm",
    modules: {
      auth: { enabled: false },
      users: { enabled: false },
      permissions: { enabled: false },
      audit: { enabled: false },
      notifications: { enabled: false },
      localization: { enabled: false },
      richText: { enabled: false },
      dashboard: { enabled: false },
    },
  };

  return JSON.stringify(manifest, null, 2);
}
