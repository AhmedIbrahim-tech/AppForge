import { create } from "zustand";
import { toast } from "sonner";
import type {
  ProjectType,
  BackendOrm,
  BackendDatabase,
  FrontendFramework,
  FrontendTooling,
  FrontendLanguage,
  FrontendStyling,
  FrontendState,
  FrontendUi,
  StackConfiguration,
  ValidationResult,
} from "../types";
import type { DotnetVersion } from "../dotnet-versions";
import {
  adjustFrontendStackToFramework,
  validateCompleteStack,
} from "../compatibility-rules";
import { STACK_PRESETS, getPresetConfig } from "../presets";

interface StackBuilderState {
  config: StackConfiguration;
  validation: ValidationResult;
  activeInspectorTab: "manifest" | "tree" | "cli";
  setProjectType: (type: ProjectType) => void;
  setProjectName: (name: string) => void;
  setBackendDotnetVersion: (version: DotnetVersion) => void;
  setBackendOrm: (orm: BackendOrm) => void;
  setBackendDatabase: (db: BackendDatabase) => void;
  toggleSignalR: () => void;
  toggleHangfire: () => void;
  setFrontendFramework: (framework: FrontendFramework) => void;
  setFrontendTooling: (tooling: FrontendTooling) => void;
  setFrontendLanguage: (language: FrontendLanguage) => void;
  setFrontendStyling: (styling: FrontendStyling) => void;
  setFrontendState: (state: FrontendState) => void;
  setFrontendUi: (ui: FrontendUi) => void;
  setActiveInspectorTab: (tab: "manifest" | "tree" | "cli") => void;
  applyPreset: (presetId: string) => void;
  resetToPreset: (
    preset: "default" | "enterprise" | "angular-enterprise" | "microservice" | "spa",
  ) => void;
}

const initialConfig: StackConfiguration = STACK_PRESETS["fullstack-modern"].config;

export const useStackBuilderStore = create<StackBuilderState>((set) => ({
  config: initialConfig,
  validation: validateCompleteStack(initialConfig),
  activeInspectorTab: "tree",

  setProjectType: (projectType) =>
    set((state) => {
      const newConfig = { ...state.config, projectType };
      return {
        config: newConfig,
        validation: validateCompleteStack(newConfig),
      };
    }),

  setProjectName: (projectName) =>
    set((state) => {
      const newConfig = {
        ...state.config,
        projectName: projectName,
      };
      return {
        config: newConfig,
        validation: validateCompleteStack(newConfig),
      };
    }),

  setBackendDotnetVersion: (dotnetVersion) =>
    set((state) => {
      const newConfig = {
        ...state.config,
        backend: { ...state.config.backend, dotnetVersion },
      };
      return {
        config: newConfig,
        validation: validateCompleteStack(newConfig),
      };
    }),

  setBackendOrm: (orm) =>
    set((state) => {
      const newConfig = {
        ...state.config,
        backend: { ...state.config.backend, orm },
      };
      return {
        config: newConfig,
        validation: validateCompleteStack(newConfig),
      };
    }),

  setBackendDatabase: (database) =>
    set((state) => {
      const newConfig = {
        ...state.config,
        backend: { ...state.config.backend, database },
      };
      return {
        config: newConfig,
        validation: validateCompleteStack(newConfig),
      };
    }),

  toggleSignalR: () =>
    set((state) => {
      const newConfig = {
        ...state.config,
        backend: {
          ...state.config.backend,
          signalR: !state.config.backend.signalR,
        },
      };
      return {
        config: newConfig,
        validation: validateCompleteStack(newConfig),
      };
    }),

  toggleHangfire: () =>
    set((state) => {
      const newConfig = {
        ...state.config,
        backend: {
          ...state.config.backend,
          hangfire: !state.config.backend.hangfire,
        },
      };
      return {
        config: newConfig,
        validation: validateCompleteStack(newConfig),
      };
    }),

  setFrontendFramework: (framework) =>
    set((state) => {
      if (state.config.frontend.framework === framework) {
        return state;
      }

      // Automatically adjust child options to the nearest valid choices
      const { adjusted, changed } = adjustFrontendStackToFramework(
        state.config.frontend,
        framework,
      );

      if (changed) {
        toast.info(
          `Some options were adjusted because they are not compatible with ${framework}.`,
          {
            duration: 4000,
          },
        );
      }

      const newConfig = {
        ...state.config,
        frontend: adjusted,
      };

      return {
        config: newConfig,
        validation: validateCompleteStack(newConfig),
      };
    }),

  setFrontendTooling: (tooling) =>
    set((state) => {
      const newConfig = {
        ...state.config,
        frontend: { ...state.config.frontend, tooling },
      };
      return {
        config: newConfig,
        validation: validateCompleteStack(newConfig),
      };
    }),

  setFrontendLanguage: (language) =>
    set((state) => {
      const newConfig = {
        ...state.config,
        frontend: { ...state.config.frontend, language },
      };
      return {
        config: newConfig,
        validation: validateCompleteStack(newConfig),
      };
    }),

  setFrontendStyling: (styling) =>
    set((state) => {
      const newConfig = {
        ...state.config,
        frontend: { ...state.config.frontend, styling },
      };
      return {
        config: newConfig,
        validation: validateCompleteStack(newConfig),
      };
    }),

  setFrontendState: (stateMgmt) =>
    set((state) => {
      const newConfig = {
        ...state.config,
        frontend: { ...state.config.frontend, state: stateMgmt },
      };
      return {
        config: newConfig,
        validation: validateCompleteStack(newConfig),
      };
    }),

  setFrontendUi: (ui) =>
    set((state) => {
      const newConfig = {
        ...state.config,
        frontend: { ...state.config.frontend, ui },
      };
      return {
        config: newConfig,
        validation: validateCompleteStack(newConfig),
      };
    }),

  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),

  applyPreset: (presetId) => {
    const presetConfig = getPresetConfig(presetId);
    if (!presetConfig) return;

    set({
      config: presetConfig,
      validation: validateCompleteStack(presetConfig),
    });
  },

  resetToPreset: (preset) => {
    const presetMap: Record<string, string> = {
      default: "fullstack-modern",
      enterprise: "enterprise-dotnet-next",
      "angular-enterprise": "angular-enterprise",
      microservice: "microservice-api",
      spa: "frontend-spa",
    };

    const targetId = presetMap[preset] || "fullstack-modern";
    const presetConfig = getPresetConfig(targetId) || initialConfig;

    set({
      config: presetConfig,
      validation: validateCompleteStack(presetConfig),
    });
  },
}));
