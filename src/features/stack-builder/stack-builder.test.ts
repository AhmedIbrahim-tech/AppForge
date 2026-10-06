import { describe, it, expect } from "vitest";
import {
  DOTNET_VERSIONS,
  DEFAULT_DOTNET_VERSION,
  SUPPORTED_DOTNET_VERSIONS,
  getDotnetDisplay,
  getDotnetTargetFramework,
  isValidDotnetVersion,
} from "./dotnet-versions";
import { STACK_PRESETS, getPresetConfig } from "./presets";
import {
  validateFrontendStack,
  validateCompleteStack,
  validateProjectName,
} from "./compatibility-rules";
import {
  isPresetActive,
  reconcileFrontendOnFrameworkChange,
  buildCliCommand,
  generateStackSummary,
  buildManifestJson,
} from "./capabilities";
import type { StackConfiguration } from "./types";

describe(".NET Runtime Version & Builder Stack Tests", () => {
  it("1. Runtime is fixed to .NET 10", () => {
    expect(DEFAULT_DOTNET_VERSION).toBe("10");
    expect(DOTNET_VERSIONS["10"].isDefault).toBe(true);
    expect(SUPPORTED_DOTNET_VERSIONS).toEqual(["10"]);
    expect(getDotnetDisplay()).toBe(".NET 10");
    expect(getDotnetTargetFramework()).toBe("net10.0");
  });

  it("2. Presets use .NET 10 by default", () => {
    const presetIds = Object.keys(STACK_PRESETS);
    for (const id of presetIds) {
      const preset = STACK_PRESETS[id];
      expect(preset.config.backend.dotnetVersion).toBe("10");
    }
  });

  it("3. Project name is validated", () => {
    const emptyValidation = validateProjectName("");
    expect(emptyValidation.isValid).toBe(false);
    expect(emptyValidation.errors).toContain("Project name is required.");

    const invalidCharValidation = validateProjectName("My App!");
    expect(invalidCharValidation.isValid).toBe(false);
    expect(
      invalidCharValidation.errors.some((e) => e.includes("can only contain")),
    ).toBe(true);

    const validValidation = validateProjectName("my-flatron-app");
    expect(validValidation.isValid).toBe(true);
    expect(validValidation.errors).toHaveLength(0);
  });

  it("4. Presets generate valid configuration objects", () => {
    const presetIds = Object.keys(STACK_PRESETS);
    expect(presetIds.length).toBeGreaterThanOrEqual(5);

    for (const id of presetIds) {
      const presetConfig = getPresetConfig(id);
      expect(presetConfig).not.toBeNull();
      if (!presetConfig) continue;

      expect(presetConfig.projectName).toBeDefined();
      expect(presetConfig.projectType).toBeDefined();
      expect(presetConfig.backend).toBeDefined();
      expect(presetConfig.frontend).toBeDefined();

      const validation = validateCompleteStack(presetConfig);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);

      if (presetConfig.projectType !== "frontend") {
        expect(isValidDotnetVersion(presetConfig.backend.dotnetVersion)).toBe(
          true,
        );
      }

      if (presetConfig.projectType !== "backend") {
        const frontendValidation = validateFrontendStack(
          presetConfig.frontend,
        );
        expect(frontendValidation.isValid).toBe(true);
      }
    }
  });
});

describe("Acceptance Validation Matrix (Sections 43-50 & 59)", () => {
  // Case A: Full Stack React + Vite + TypeScript + Tailwind + Zustand + Axios + RHF + Zod + shadcn
  it("A. Full Stack React + Vite + Tailwind + shadcn is fully valid and synchronized", () => {
    const config = getPresetConfig("fullstack-react")!;
    expect(config.frontend.framework).toBe("React");
    expect(config.frontend.tooling).toBe("Vite");
    expect(config.frontend.ui).toBe("shadcn/ui");

    const validation = validateCompleteStack(config);
    expect(validation.isValid).toBe(true);

    const cli = buildCliCommand(config);
    expect(cli).toContain("--frontend react");
    expect(cli).toContain("--frontend-tooling vite");
    expect(cli).toContain("--ui shadcn");
    expect(cli).toContain("--forms rhf-zod");

    const summary = generateStackSummary(config);
    expect(summary.some((c) => c.label === "React")).toBe(true);
    expect(summary.some((c) => c.label === "shadcn/ui")).toBe(true);
    expect(summary.some((c) => c.label === "Angular")).toBe(false);
  });

  // Case B: Full Stack React + Vite + TypeScript + Bootstrap (shadcn invalid, MUI/None valid)
  it("B. Full Stack React + Vite + Bootstrap rejects shadcn/ui and accepts Material UI", () => {
    const config: StackConfiguration = {
      ...getPresetConfig("fullstack-react")!,
      frontend: {
        ...getPresetConfig("fullstack-react")!.frontend,
        styling: "Bootstrap",
        ui: "shadcn/ui",
      },
    };

    const invalidResult = validateCompleteStack(config);
    expect(invalidResult.isValid).toBe(false);
    expect(
      invalidResult.errors.some((e) => e.includes("shadcn/ui requires Tailwind CSS")),
    ).toBe(true);

    // Now change UI to Material UI
    config.frontend.ui = "Material UI";
    const validResult = validateCompleteStack(config);
    expect(validResult.isValid).toBe(true);

    const cli = buildCliCommand(config);
    expect(cli).toContain("--styling bootstrap");
    expect(cli).toContain("--ui mui");
  });

  // Case C: Full Stack React + Next.js
  it("C. Full Stack React + Next.js is valid and emits next tooling", () => {
    const config = getPresetConfig("fullstack-next")!;
    expect(config.frontend.tooling).toBe("Next.js");

    const validation = validateCompleteStack(config);
    expect(validation.isValid).toBe(true);

    const cli = buildCliCommand(config);
    expect(cli).toContain("--frontend-tooling next");
    expect(cli).toContain("--state redux");
  });

  // Case D: Full Stack Angular (CRITICAL ACCEPTANCE BUG CHECK)
  it("D. Full Stack Angular preset contains ZERO React/Vite/Zustand artifacts across all surfaces", () => {
    const angularPreset = STACK_PRESETS["fullstack-angular"];
    const config = getPresetConfig("fullstack-angular")!;

    // 1. Preset is detected active
    expect(isPresetActive(angularPreset, config)).toBe(true);

    // 2. State has pure Angular choices
    expect(config.frontend.framework).toBe("Angular");
    expect(config.frontend.tooling).toBe("Angular CLI");
    expect(config.frontend.state).toBe("NgRx");
    expect(config.frontend.httpClient).toBe("Angular Http");
    expect(config.frontend.forms).toBe("Angular Reactive Forms");
    expect(config.frontend.ui).toBe("Angular Material");

    // 3. Validation is valid
    const validation = validateCompleteStack(config);
    expect(validation.isValid).toBe(true);
    expect(validation.errors).toHaveLength(0);

    // 4. Summary displays ONLY Angular items, zero React/Vite/Zustand
    const summary = generateStackSummary(config);
    const summaryLabels = summary.map((s) => s.label);
    expect(summaryLabels).toContain("Angular");
    expect(summaryLabels).toContain("NgRx");
    expect(summaryLabels).toContain("Angular Http");
    expect(summaryLabels).toContain("Angular Material");

    expect(summaryLabels).not.toContain("React");
    expect(summaryLabels).not.toContain("Vite");
    expect(summaryLabels).not.toContain("Zustand");
    expect(summaryLabels).not.toContain("shadcn/ui");
    expect(summaryLabels).not.toContain("Axios");

    // 5. CLI command contains Angular flags and zero React flags
    const cli = buildCliCommand(config);
    expect(cli).toContain("--frontend angular");
    expect(cli).toContain("--frontend-tooling angular-cli");
    expect(cli).toContain("--state ngrx");
    expect(cli).toContain("--http angular-http");
    expect(cli).toContain("--forms angular-reactive");
    expect(cli).toContain("--ui angular-material");

    expect(cli).not.toContain("vite");
    expect(cli).not.toContain("--frontend react");
    expect(cli).not.toContain("zustand");
    expect(cli).not.toContain("axios");
    expect(cli).not.toContain("shadcn");

    // 6. Manifest contains Angular values
    const manifestStr = buildManifestJson(config);
    const manifest = JSON.parse(manifestStr);
    expect(manifest.frontend.library).toBe("angular");
    expect(manifest.frontend.framework).toBe("angular-cli");
    expect(manifest.frontend.state).toBe("ngrx");
  });

  // Case E: Angular with State = None
  it("E. Angular supports State = None", () => {
    const config = getPresetConfig("fullstack-angular")!;
    config.frontend.state = "None";

    const validation = validateCompleteStack(config);
    expect(validation.isValid).toBe(true);

    const cli = buildCliCommand(config);
    expect(cli).toContain("--state none");

    const summary = generateStackSummary(config);
    expect(summary.some((c) => c.label === "NgRx")).toBe(false);
  });

  // Case F: Backend Only Controllers with Hybrid & JWT
  it("F. Backend Only emits zero frontend flags and valid backend flags", () => {
    const config = getPresetConfig("backend-api")!;
    expect(config.projectType).toBe("backend");

    const validation = validateCompleteStack(config);
    expect(validation.isValid).toBe(true);

    const cli = buildCliCommand(config);
    expect(cli).toContain("--type backend");
    expect(cli).toContain("--backend-type controllers");
    expect(cli).toContain("--orm hybrid");
    expect(cli).toContain("--auth jwt");
    expect(cli).not.toContain("--frontend");
    expect(cli).not.toContain("--styling");

    const summary = generateStackSummary(config);
    expect(summary.some((c) => c.category === "frontend")).toBe(false);

    const manifest = JSON.parse(buildManifestJson(config));
    expect(manifest.backend.enabled).toBe(true);
    expect(manifest.frontend.enabled).toBe(false);
  });

  // Case G: Backend Only Minimal API
  it("G. Backend Only Minimal API is valid", () => {
    const config = getPresetConfig("backend-api")!;
    config.backend.presentation = "Minimal API";

    const validation = validateCompleteStack(config);
    expect(validation.isValid).toBe(true);

    const cli = buildCliCommand(config);
    expect(cli).toContain("--backend-type minimal-api");
  });

  // Case H: Frontend Only React + Vite
  it("H. Frontend Only emits zero backend flags", () => {
    const config = getPresetConfig("frontend-spa")!;
    expect(config.projectType).toBe("frontend");

    const validation = validateCompleteStack(config);
    expect(validation.isValid).toBe(true);

    const cli = buildCliCommand(config);
    expect(cli).toContain("--type frontend");
    expect(cli).toContain("--frontend react");
    expect(cli).not.toContain("--backend-type");
    expect(cli).not.toContain("--architecture");
    expect(cli).not.toContain("--orm");
    expect(cli).not.toContain("--db");

    const summary = generateStackSummary(config);
    expect(summary.some((c) => c.category === "backend")).toBe(false);

    const manifest = JSON.parse(buildManifestJson(config));
    expect(manifest.backend.enabled).toBe(false);
    expect(manifest.frontend.enabled).toBe(true);
  });

  // Case I: Framework Switching Reconciliation
  it("I. Switching from React to Angular reconciles dependent state", () => {
    const reactConfig = getPresetConfig("fullstack-react")!.frontend;
    const { reconciled, changed, adjustments } =
      reconcileFrontendOnFrameworkChange(reactConfig, "Angular");

    expect(changed).toBe(true);
    expect(reconciled.framework).toBe("Angular");
    expect(reconciled.tooling).toBe("Angular CLI");
    expect(reconciled.state).toBe("NgRx");
    expect(reconciled.httpClient).toBe("Angular Http");
    expect(reconciled.forms).toBe("Angular Reactive Forms");
    expect(reconciled.ui).toBe("Angular Material");
    expect(adjustments.length).toBeGreaterThanOrEqual(4);
  });

  // Case J: Preset Active State Invalidation
  it("J. Preset active state is invalidated immediately when an option is modified", () => {
    const reactPreset = STACK_PRESETS["fullstack-react"];
    const config = getPresetConfig("fullstack-react")!;

    expect(isPresetActive(reactPreset, config)).toBe(true);

    // User changes Vite to Next.js
    config.frontend.tooling = "Next.js";
    expect(isPresetActive(reactPreset, config)).toBe(false);
  });
});
