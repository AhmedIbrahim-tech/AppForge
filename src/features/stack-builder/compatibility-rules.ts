import type {
  FrontendConfiguration,
  BackendConfiguration,
  StackConfiguration,
  ValidationResult,
  FrontendFramework,
  FrontendTooling,
  FrontendState,
  FrontendHttpClient,
  FrontendForms,
  FrontendUi,
  FrontendStyling,
} from "./types";
import {
  validateCompleteStack as validateStackFromCapabilities,
  reconcileFrontendOnFrameworkChange,
} from "./capabilities";

export interface FrameworkMatrix {
  tooling: readonly FrontendTooling[];
  state: readonly FrontendState[];
  httpClient: readonly FrontendHttpClient[];
  forms: readonly FrontendForms[];
  ui: readonly FrontendUi[];
  styling: readonly FrontendStyling[];
  defaultTooling: FrontendTooling;
  defaultState: FrontendState;
  defaultHttpClient: FrontendHttpClient;
  defaultForms: FrontendForms;
  defaultUi: FrontendUi;
  defaultStyling: FrontendStyling;
}

export const FRONTEND_CAPABILITY_MATRIX: Record<FrontendFramework, FrameworkMatrix> = {
  React: {
    tooling: ["Vite", "Next.js"],
    state: ["Zustand", "Redux Toolkit", "None"],
    httpClient: ["Axios", "Fetch"],
    forms: ["React Hook Form + Zod", "None"],
    ui: ["shadcn/ui", "Material UI", "Ant Design", "None"],
    styling: ["Tailwind CSS", "Bootstrap"],
    defaultTooling: "Vite",
    defaultState: "Zustand",
    defaultHttpClient: "Axios",
    defaultForms: "React Hook Form + Zod",
    defaultUi: "shadcn/ui",
    defaultStyling: "Tailwind CSS",
  },
  Angular: {
    tooling: ["Angular CLI"],
    state: ["NgRx", "None"],
    httpClient: ["Angular Http"],
    forms: ["Angular Reactive Forms", "None"],
    ui: ["Angular Material", "Ant Design Angular", "None"],
    styling: ["Tailwind CSS", "Bootstrap"],
    defaultTooling: "Angular CLI",
    defaultState: "NgRx",
    defaultHttpClient: "Angular Http",
    defaultForms: "Angular Reactive Forms",
    defaultUi: "Angular Material",
    defaultStyling: "Tailwind CSS",
  },
} as const;

/**
 * Validates project name input
 */
export function validateProjectName(name: string): ValidationResult {
  const trimmed = name?.trim() ?? "";
  if (!trimmed) {
    return {
      isValid: false,
      errors: ["Project name is required."],
    };
  }

  const validRegex = /^[a-zA-Z0-9_.-]+$/;
  if (!validRegex.test(trimmed)) {
    return {
      isValid: false,
      errors: [
        "Project name can only contain letters, numbers, hyphens, underscores, and dots.",
      ],
    };
  }

  return {
    isValid: true,
    errors: [],
  };
}

/**
 * Validates the backend configuration.
 */
export function validateBackendStack(
  config: BackendConfiguration | StackConfiguration,
): ValidationResult {
  const backend = "backend" in config ? config.backend : config;
  const projectType = "projectType" in config ? config.projectType : "backend";

  if (projectType === "frontend") {
    return { isValid: true, errors: [] };
  }

  const errors: string[] = [];

  // Validate Presentation in Fullstack
  if (
    projectType === "fullstack" &&
    backend.presentation !== "Controllers" &&
    backend.presentation !== "Minimal API"
  ) {
    errors.push(
      `Full Stack mode only supports Web API (Controllers or Minimal API). Cannot use with backend type "${backend.presentation.toLowerCase().replace(" ", "-")}".`,
    );
  }

  // Validate ORM
  if (
    backend.orm !== "EF Core" &&
    backend.orm !== "Dapper" &&
    backend.orm !== "EF Core + Dapper"
  ) {
    errors.push(`Unsupported ORM '${backend.orm}'.`);
  }

  // Validate Database
  if (
    backend.database !== "PostgreSQL" &&
    backend.database !== "SQL Server" &&
    backend.database !== "SQLite"
  ) {
    errors.push(`Unsupported database '${backend.database}'.`);
  }

  // Validate Presentation & Auth compatibility
  if (
    (backend.presentation === "MVC" || backend.presentation === "Razor Pages") &&
    backend.auth === "Identity + JWT"
  ) {
    errors.push(
      `${backend.presentation} server-rendered apps use Cookie authentication instead of JWT.`,
    );
  }

  // Validate Identity with Dapper only
  if (backend.orm === "Dapper" && backend.auth !== "None") {
    errors.push(
      "ASP.NET Core Identity store requires EF Core. Use 'EF Core + Dapper (Hybrid)' or select 'None' for Dapper-only.",
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates a frontend configuration against framework capability rules.
 */
export function validateFrontendStack(
  config: FrontendConfiguration | StackConfiguration,
): ValidationResult {
  const frontend = "frontend" in config ? config.frontend : config;
  const projectType = "projectType" in config ? config.projectType : "frontend";

  if (projectType === "backend") {
    return { isValid: true, errors: [] };
  }

  const errors: string[] = [];
  const { framework, tooling, state, ui, styling, httpClient, forms, language } = frontend;

  if (framework === "Angular") {
    if (tooling !== "Angular CLI") {
      errors.push(`Tooling '${tooling}' is not supported for Angular.`);
    }
    if (language && language !== "TypeScript") {
      errors.push("Angular requires TypeScript.");
    }
    if (state !== "NgRx" && state !== "None") {
      errors.push(`State library '${state}' is not supported for Angular.`);
    }
    if (
      ui !== "Angular Material" &&
      ui !== "Ant Design Angular" &&
      ui !== "None"
    ) {
      errors.push(`UI system '${ui}' is not supported for Angular.`);
    }
    if (httpClient !== "Angular Http") {
      errors.push(`HTTP client '${httpClient}' is not supported for Angular.`);
    }
    if (forms !== "Angular Reactive Forms" && forms !== "None") {
      errors.push(`Forms system '${forms}' is not supported for Angular.`);
    }
  } else if (framework === "React") {
    if (tooling !== "Vite" && tooling !== "Next.js") {
      errors.push(`Tooling '${tooling}' is not supported for React.`);
    }
    if (tooling === "Next.js" && language === "JavaScript") {
      errors.push("Next.js project generator requires TypeScript.");
    }
    if (
      state !== "Zustand" &&
      state !== "Redux Toolkit" &&
      state !== "None"
    ) {
      errors.push(`State library '${state}' is not supported for React.`);
    }
    if (
      ui !== "shadcn/ui" &&
      ui !== "Material UI" &&
      ui !== "Ant Design" &&
      ui !== "None"
    ) {
      errors.push(`UI system '${ui}' is not supported for React.`);
    }
    if (ui === "shadcn/ui") {
      if (styling !== "Tailwind CSS") {
        errors.push("shadcn/ui requires Tailwind CSS styling.");
      }
      if (language && language !== "TypeScript") {
        errors.push("shadcn/ui requires TypeScript.");
      }
    }
    if (forms !== "React Hook Form + Zod" && forms !== "None") {
      errors.push(`Forms system '${forms}' is not supported for React.`);
    }
  } else {
    errors.push(`Unknown framework '${framework}'.`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates the complete stack configuration.
 */
export function validateCompleteStack(config: StackConfiguration): ValidationResult {
  return validateStackFromCapabilities(config);
}

/**
 * Automatically adjusts a frontend configuration when the framework changes
 */
export function adjustFrontendStackToFramework(
  current: FrontendConfiguration,
  targetFramework: FrontendFramework,
): {
  adjusted: FrontendConfiguration;
  changed: boolean;
  adjustedFields: string[];
} {
  const { reconciled, changed, adjustments } = reconcileFrontendOnFrameworkChange(
    current,
    targetFramework,
  );

  return {
    adjusted: reconciled,
    changed,
    adjustedFields: adjustments,
  };
}
