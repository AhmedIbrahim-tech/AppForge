import { create } from "zustand";
import { toast } from "sonner";
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
} from "../types";
import {
  reconcileCompleteStack,
  reconcileFrontendOnFrameworkChange,
  validateCompleteStack,
} from "../capabilities";
import { STACK_PRESETS, getPresetConfig } from "../presets";

interface StackBuilderState {
  config: StackConfiguration;
  validation: ValidationResult;
  activeInspectorTab: "tree" | "config" | "cli";
  expandedSections: {
    project: boolean;
    backend: boolean;
    frontend: boolean;
    tooling: boolean;
    advanced?: boolean;
  };

  // Actions
  setProjectType: (type: ProjectType) => void;
  setProjectName: (name: string) => void;
  setBackendPresentation: (presentation: BackendPresentation) => void;
  setBackendArchitecture: (architecture: BackendArchitecture) => void;
  setBackendOrm: (orm: BackendOrm) => void;
  setBackendDatabase: (db: BackendDatabase) => void;
  setBackendAuth: (auth: BackendAuth) => void;
  setBackendMapping: (mapping: BackendMapping) => void;
  setBackendLogging: (logging: BackendLogging) => void;
  toggleSignalR: () => void;
  toggleHangfire: () => void;
  toggleDocker: () => void;
  toggleSwagger: () => void;

  setFrontendFramework: (framework: FrontendFramework) => void;
  setFrontendTooling: (tooling: FrontendTooling) => void;
  setFrontendLanguage: (language: FrontendLanguage) => void;
  setFrontendStyling: (styling: FrontendStyling) => void;
  setFrontendState: (state: FrontendState) => void;
  setFrontendHttpClient: (httpClient: FrontendHttpClient) => void;
  setFrontendForms: (forms: FrontendForms) => void;
  setFrontendUi: (ui: FrontendUi) => void;
  toggleFrontendI18n: () => void;

  setPackageManager: (pm: PackageManager) => void;
  setActiveInspectorTab: (tab: "tree" | "config" | "cli") => void;
  toggleSectionExpanded: (
    section: "project" | "backend" | "frontend" | "tooling" | "advanced",
  ) => void;
  applyPreset: (presetId: string) => void;
}

const initialConfig: StackConfiguration = STACK_PRESETS["fullstack-react"].config;

export const useStackBuilderStore = create<StackBuilderState>((set) => ({
  config: initialConfig,
  validation: validateCompleteStack(initialConfig),
  activeInspectorTab: "tree",
  expandedSections: {
    project: true,
    backend: true,
    frontend: true,
    tooling: true,
    advanced: false,
  },

  setProjectType: (projectType) =>
    set((state) => {
      const nextBackend = { ...state.config.backend };

      if (projectType === "fullstack") {
        if (
          nextBackend.presentation === "MVC" ||
          nextBackend.presentation === "Razor Pages"
        ) {
          nextBackend.presentation = "Controllers";
        }
      }

      const rawConfig: StackConfiguration = {
        ...state.config,
        projectType,
        backend: nextBackend,
      };

      const normalized = reconcileCompleteStack(rawConfig);
      return {
        config: normalized,
        validation: validateCompleteStack(normalized),
      };
    }),

  setProjectName: (projectName) =>
    set((state) => {
      const nextConfig = {
        ...state.config,
        projectName,
      };
      return {
        config: nextConfig,
        validation: validateCompleteStack(nextConfig),
      };
    }),

  setBackendPresentation: (presentation) =>
    set((state) => {
      let auth = state.config.backend.auth;
      if (presentation === "MVC" || presentation === "Razor Pages") {
        if (auth === "Identity + JWT") {
          auth = "Identity + Cookies";
        }
      }

      const nextConfig = reconcileCompleteStack({
        ...state.config,
        backend: {
          ...state.config.backend,
          presentation,
          auth,
        },
      });

      return {
        config: nextConfig,
        validation: validateCompleteStack(nextConfig),
      };
    }),

  setBackendArchitecture: (architecture) =>
    set((state) => {
      const nextConfig = reconcileCompleteStack({
        ...state.config,
        backend: { ...state.config.backend, architecture },
      });
      return {
        config: nextConfig,
        validation: validateCompleteStack(nextConfig),
      };
    }),

  setBackendOrm: (orm) =>
    set((state) => {
      let auth = state.config.backend.auth;
      if (orm === "Dapper") {
        auth = "None";
      }

      const nextConfig = reconcileCompleteStack({
        ...state.config,
        backend: { ...state.config.backend, orm, auth },
      });

      return {
        config: nextConfig,
        validation: validateCompleteStack(nextConfig),
      };
    }),

  setBackendDatabase: (database) =>
    set((state) => {
      const nextConfig = {
        ...state.config,
        backend: { ...state.config.backend, database },
      };
      return {
        config: nextConfig,
        validation: validateCompleteStack(nextConfig),
      };
    }),

  setBackendAuth: (auth) =>
    set((state) => {
      const nextConfig = reconcileCompleteStack({
        ...state.config,
        backend: { ...state.config.backend, auth },
      });
      return {
        config: nextConfig,
        validation: validateCompleteStack(nextConfig),
      };
    }),

  setBackendMapping: (mapping) =>
    set((state) => {
      const nextConfig = {
        ...state.config,
        backend: { ...state.config.backend, mapping },
      };
      return {
        config: nextConfig,
        validation: validateCompleteStack(nextConfig),
      };
    }),

  setBackendLogging: (logging) =>
    set((state) => {
      const nextConfig = {
        ...state.config,
        backend: { ...state.config.backend, logging },
      };
      return {
        config: nextConfig,
        validation: validateCompleteStack(nextConfig),
      };
    }),

  toggleSignalR: () =>
    set((state) => {
      const nextConfig = {
        ...state.config,
        backend: {
          ...state.config.backend,
          signalR: !state.config.backend.signalR,
        },
      };
      return {
        config: nextConfig,
        validation: validateCompleteStack(nextConfig),
      };
    }),

  toggleHangfire: () =>
    set((state) => {
      const nextConfig = {
        ...state.config,
        backend: {
          ...state.config.backend,
          hangfire: !state.config.backend.hangfire,
        },
      };
      return {
        config: nextConfig,
        validation: validateCompleteStack(nextConfig),
      };
    }),

  toggleDocker: () =>
    set((state) => {
      const nextConfig = {
        ...state.config,
        backend: {
          ...state.config.backend,
          includeDocker: !state.config.backend.includeDocker,
        },
      };
      return {
        config: nextConfig,
        validation: validateCompleteStack(nextConfig),
      };
    }),

  toggleSwagger: () =>
    set((state) => {
      const nextConfig = {
        ...state.config,
        backend: {
          ...state.config.backend,
          includeSwagger: !state.config.backend.includeSwagger,
        },
      };
      return {
        config: nextConfig,
        validation: validateCompleteStack(nextConfig),
      };
    }),

  setFrontendFramework: (framework) =>
    set((state) => {
      if (state.config.frontend.framework === framework) {
        return state;
      }

      const { reconciled, changed, adjustments } =
        reconcileFrontendOnFrameworkChange(state.config.frontend, framework);

      if (changed) {
        toast.info(`Updated frontend options for ${framework}.`, {
          description: adjustments.join(" · "),
          duration: 3500,
        });
      }

      const nextConfig: StackConfiguration = {
        ...state.config,
        frontend: reconciled,
      };

      return {
        config: nextConfig,
        validation: validateCompleteStack(nextConfig),
      };
    }),

  setFrontendTooling: (tooling) =>
    set((state) => {
      let language = state.config.frontend.language;
      if (tooling === "Next.js" && language === "JavaScript") {
        language = "TypeScript";
      }

      const nextConfig = reconcileCompleteStack({
        ...state.config,
        frontend: { ...state.config.frontend, tooling, language },
      });

      return {
        config: nextConfig,
        validation: validateCompleteStack(nextConfig),
      };
    }),

  setFrontendLanguage: (language) =>
    set((state) => {
      let ui = state.config.frontend.ui;
      if (language === "JavaScript" && ui === "shadcn/ui") {
        ui = "Material UI";
      }

      const nextConfig = reconcileCompleteStack({
        ...state.config,
        frontend: { ...state.config.frontend, language, ui },
      });

      return {
        config: nextConfig,
        validation: validateCompleteStack(nextConfig),
      };
    }),

  setFrontendStyling: (styling) =>
    set((state) => {
      let ui = state.config.frontend.ui;
      if (styling === "Bootstrap" && ui === "shadcn/ui") {
        ui = state.config.frontend.framework === "React" ? "Material UI" : "None";
        toast.info("shadcn/ui requires Tailwind CSS. Switched UI library.");
      }

      const nextConfig = reconcileCompleteStack({
        ...state.config,
        frontend: { ...state.config.frontend, styling, ui },
      });

      return {
        config: nextConfig,
        validation: validateCompleteStack(nextConfig),
      };
    }),

  setFrontendState: (stateMgmt) =>
    set((state) => {
      const nextConfig = reconcileCompleteStack({
        ...state.config,
        frontend: { ...state.config.frontend, state: stateMgmt },
      });
      return {
        config: nextConfig,
        validation: validateCompleteStack(nextConfig),
      };
    }),

  setFrontendHttpClient: (httpClient) =>
    set((state) => {
      const nextConfig = reconcileCompleteStack({
        ...state.config,
        frontend: { ...state.config.frontend, httpClient },
      });
      return {
        config: nextConfig,
        validation: validateCompleteStack(nextConfig),
      };
    }),

  setFrontendForms: (forms) =>
    set((state) => {
      const nextConfig = reconcileCompleteStack({
        ...state.config,
        frontend: { ...state.config.frontend, forms },
      });
      return {
        config: nextConfig,
        validation: validateCompleteStack(nextConfig),
      };
    }),

  setFrontendUi: (ui) =>
    set((state) => {
      let styling = state.config.frontend.styling;
      let language = state.config.frontend.language;
      if (ui === "shadcn/ui") {
        styling = "Tailwind CSS";
        language = "TypeScript";
      }

      const nextConfig = reconcileCompleteStack({
        ...state.config,
        frontend: { ...state.config.frontend, ui, styling, language },
      });

      return {
        config: nextConfig,
        validation: validateCompleteStack(nextConfig),
      };
    }),

  toggleFrontendI18n: () =>
    set((state) => {
      const nextConfig = {
        ...state.config,
        frontend: {
          ...state.config.frontend,
          includeI18n: !state.config.frontend.includeI18n,
        },
      };
      return {
        config: nextConfig,
        validation: validateCompleteStack(nextConfig),
      };
    }),

  setPackageManager: (pm) =>
    set((state) => {
      const nextConfig = {
        ...state.config,
        packageManager: pm,
      };
      return {
        config: nextConfig,
        validation: validateCompleteStack(nextConfig),
      };
    }),

  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),

  toggleSectionExpanded: (section) =>
    set((state) => ({
      expandedSections: {
        ...state.expandedSections,
        [section]: !state.expandedSections[section],
      },
    })),

  applyPreset: (presetId) => {
    const presetConfig = getPresetConfig(presetId);
    if (!presetConfig) return;

    // Atomically set complete normalized configuration
    const normalized = reconcileCompleteStack(presetConfig);
    set({
      config: normalized,
      validation: validateCompleteStack(normalized),
    });
  },
}));
