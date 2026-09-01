import type {
  FrontendFramework,
  FrontendTooling,
  FrontendState,
  FrontendUi,
  FrontendStyling,
  FrontendConfiguration,
  BackendConfiguration,
  StackConfiguration,
  ValidationResult,
} from "./types";
import { isValidDotnetVersion } from "./dotnet-versions";

export interface FrameworkMatrix {
  tooling: readonly FrontendTooling[];
  state: readonly FrontendState[];
  ui: readonly FrontendUi[];
  styling: readonly FrontendStyling[];
  defaultTooling: FrontendTooling;
  defaultState: FrontendState;
  defaultUi: FrontendUi;
  defaultStyling: FrontendStyling;
}

export const FRONTEND_CAPABILITY_MATRIX: Record<FrontendFramework, FrameworkMatrix> = {
  React: {
    tooling: ["Vite", "Next.js"],
    state: ["Redux Toolkit", "Zustand", "None"],
    ui: ["shadcn/ui", "Material UI", "Ant Design"],
    styling: ["Tailwind CSS", "Bootstrap"],
    defaultTooling: "Vite",
    defaultState: "Zustand",
    defaultUi: "shadcn/ui",
    defaultStyling: "Tailwind CSS",
  },
  Angular: {
    tooling: ["Angular CLI"],
    state: ["NgRx", "None"],
    ui: ["Angular Material", "Ant Design Angular", "Bootstrap"],
    styling: ["Tailwind CSS", "Bootstrap"],
    defaultTooling: "Angular CLI",
    defaultState: "NgRx",
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

  // Alphanumeric, hyphens, underscores, dots
  const validRegex = /^[a-zA-Z0-9_\-\.]+$/;
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

  // If project is frontend-only, backend rules do not block
  if (projectType === "frontend") {
    return { isValid: true, errors: [] };
  }

  const errors: string[] = [];

  // Validate .NET Version
  if (!isValidDotnetVersion(backend.dotnetVersion)) {
    errors.push(
      `Invalid .NET version '${backend.dotnetVersion}'. Supported versions are .NET 8, .NET 9, and .NET 10.`,
    );
  }

  // Validate ORM
  if (backend.orm !== "EF Core" && backend.orm !== "Dapper") {
    errors.push(`Unsupported ORM '${backend.orm}'. Supported: EF Core, Dapper.`);
  }

  // Validate Database
  if (
    backend.database !== "PostgreSQL" &&
    backend.database !== "SQL Server" &&
    backend.database !== "SQLite"
  ) {
    errors.push(
      `Unsupported database '${backend.database}'. Supported: PostgreSQL, SQL Server, SQLite.`,
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

  // If project is backend-only, frontend rules do not block backend builds
  if (projectType === "backend") {
    return { isValid: true, errors: [] };
  }

  const errors: string[] = [];
  const { framework, tooling, state, ui, styling } = frontend;

  if (framework === "Angular") {
    // Angular Tooling
    if (tooling === "Next.js") {
      errors.push("Next.js is only available for React projects.");
    } else if (tooling === "Vite") {
      errors.push("Vite is only available for React projects.");
    } else if (tooling !== "Angular CLI") {
      errors.push(`Tooling '${tooling}' is not supported for Angular.`);
    }

    // Angular State
    if (state === "Zustand") {
      errors.push("Zustand is only available for React projects.");
    } else if (state === "Redux Toolkit") {
      errors.push("Redux Toolkit is only available for React projects.");
    } else if (state !== "NgRx" && state !== "None") {
      errors.push(`State library '${state}' is not supported for Angular.`);
    }

    // Angular UI
    if (ui === "shadcn/ui") {
      errors.push("shadcn/ui is only available for React projects.");
    } else if (ui === "Material UI") {
      errors.push("Material UI is only available for React projects.");
    } else if (
      ui !== "Angular Material" &&
      ui !== "Ant Design Angular" &&
      ui !== "Bootstrap"
    ) {
      errors.push(`UI system '${ui}' is not supported for Angular.`);
    }

    // Angular Styling
    if (styling !== "Tailwind CSS" && styling !== "Bootstrap") {
      errors.push(`Styling '${styling}' is not supported for Angular.`);
    }
  } else if (framework === "React") {
    // React Tooling
    if (tooling === "Angular CLI") {
      errors.push("Angular CLI is only available for Angular projects.");
    } else if (tooling !== "Vite" && tooling !== "Next.js") {
      errors.push(`Tooling '${tooling}' is not supported for React.`);
    }

    // React State
    if (state === "NgRx") {
      errors.push("NgRx is only available for Angular projects.");
    } else if (
      state !== "Redux Toolkit" &&
      state !== "Zustand" &&
      state !== "None"
    ) {
      errors.push(`State library '${state}' is not supported for React.`);
    }

    // React UI
    if (ui === "Angular Material") {
      errors.push("Angular Material is only available for Angular projects.");
    } else if (ui === "Ant Design Angular") {
      errors.push("Ant Design Angular is only available for Angular projects.");
    } else if (
      ui !== "shadcn/ui" &&
      ui !== "Material UI" &&
      ui !== "Ant Design"
    ) {
      errors.push(`UI system '${ui}' is not supported for React.`);
    }

    // React Styling
    if (styling !== "Tailwind CSS" && styling !== "Bootstrap") {
      errors.push(`Styling '${styling}' is not supported for React.`);
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
 * Validates the complete stack configuration (project name, frontend, backend).
 */
export function validateCompleteStack(config: StackConfiguration): ValidationResult {
  const errors: string[] = [];

  const nameValidation = validateProjectName(config.projectName);
  if (!nameValidation.isValid) {
    errors.push(...nameValidation.errors);
  }

  const frontendValidation = validateFrontendStack(config);
  if (!frontendValidation.isValid) {
    errors.push(...frontendValidation.errors);
  }

  const backendValidation = validateBackendStack(config);
  if (!backendValidation.isValid) {
    errors.push(...backendValidation.errors);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Automatically adjusts a frontend configuration when the framework changes
 * to ensure all child options are valid according to the capability matrix.
 */
export function adjustFrontendStackToFramework(
  current: FrontendConfiguration,
  targetFramework: FrontendFramework,
): {
  adjusted: FrontendConfiguration;
  changed: boolean;
  adjustedFields: string[];
} {
  const matrix = FRONTEND_CAPABILITY_MATRIX[targetFramework];
  const adjusted: FrontendConfiguration = {
    ...current,
    framework: targetFramework,
  };

  const adjustedFields: string[] = [];

  // Check Tooling
  if (!matrix.tooling.includes(adjusted.tooling)) {
    adjusted.tooling = matrix.defaultTooling;
    adjustedFields.push(`Tooling -> ${adjusted.tooling}`);
  }

  // Check State Management
  if (current.state === "None") {
    adjusted.state = "None";
  } else if (!matrix.state.includes(adjusted.state)) {
    adjusted.state = matrix.defaultState;
    adjustedFields.push(`State -> ${adjusted.state}`);
  }

  // Check UI System
  if (!matrix.ui.includes(adjusted.ui)) {
    adjusted.ui = matrix.defaultUi;
    adjustedFields.push(`UI -> ${adjusted.ui}`);
  }

  // Check Styling
  if (!matrix.styling.includes(adjusted.styling)) {
    adjusted.styling = matrix.defaultStyling;
    adjustedFields.push(`Styling -> ${adjusted.styling}`);
  }

  return {
    adjusted,
    changed: adjustedFields.length > 0,
    adjustedFields,
  };
}
