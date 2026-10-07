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
  reconcileCompleteStack,
  buildCliCommand,
  generateStackSummary,
  buildManifestJson,
  BACKEND_PRESENTATIONS,
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
    expect(manifest.frontend.framework).toBe(null);
    expect(manifest.frontend.state).toBe("ngrx");
  });

  // GOLDEN PARITY CASE A: Fullstack React Project
  it("Golden Parity Case A: Fullstack React project CLI and manifest match Library", () => {
    const config = getPresetConfig("fullstack-react")!;
    config.projectName = "my-flatron-app";

    const cli = buildCliCommand(config);
    expect(cli).toBe(
      "npx flatron my-flatron-app --type fullstack --architecture cqrs --mapping manual --orm efcore --db sqlserver --auth jwt --frontend react --frontend-tooling vite --language typescript --styling tailwind --state zustand --http axios --forms rhf-zod --ui shadcn --localization --yes"
    );

    const manifest = JSON.parse(buildManifestJson(config));
    expect(manifest.generatorVersion).toBe("1.1.0");
    expect(manifest.backend.enabled).toBe(true);
    expect(manifest.backend.dotnet).toBe("10");
    expect(manifest.backend.targetFramework).toBe("net10.0");
    expect(manifest.backend.architecture).toBe("cqrs-mediatr");
    expect(manifest.backend.orm).toBe("efcore");
    expect(manifest.backend.database).toBe("sqlserver");
    expect(manifest.frontend.enabled).toBe(true);
    expect(manifest.frontend.library).toBe("react");
    expect(manifest.frontend.framework).toBe("vite");
    expect(manifest.frontend.localization).toBe(true);
  });

  // GOLDEN PARITY CASE B: Backend-only CQRS Project
  it("Golden Parity Case B: Backend-only CQRS project CLI and manifest match Library", () => {
    const config = getPresetConfig("backend-api")!;
    config.projectName = "my-flatron-api";

    const cli = buildCliCommand(config);
    expect(cli).toBe(
      "npx flatron my-flatron-api --type backend --backend-type controllers --architecture cqrs --mapping manual --orm hybrid --db sqlserver --auth jwt --hangfire --yes"
    );

    const manifest = JSON.parse(buildManifestJson(config));
    expect(manifest.generatorVersion).toBe("1.1.0");
    expect(manifest.backend.enabled).toBe(true);
    expect(manifest.backend.architecture).toBe("cqrs-mediatr");
    expect(manifest.backend.orm).toBe("efcore-dapper");
    expect(manifest.backend.database).toBe("sqlserver");
    expect(manifest.backend.backgroundJobs).toBe("hangfire");
    expect(manifest.frontend.enabled).toBe(false);
    expect(manifest.frontend.library).toBe(null);
    expect(manifest.frontend.framework).toBe(null);
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

  describe("Backend Presentation Parity Across Project Modes", () => {
    it("1. Backend Only exposes all Library-supported Presentation options as enabled", () => {
      const backendConfig = getPresetConfig("backend-api")!;
      expect(backendConfig.projectType).toBe("backend");

      // Verify all 4 Library presentation types exist in definition
      const values = BACKEND_PRESENTATIONS.map((p) => p.value);
      expect(values).toEqual(["Controllers", "Minimal API", "MVC", "Razor Pages"]);

      // Verify all 4 are enabled for Backend Only
      for (const pres of BACKEND_PRESENTATIONS) {
        const disabledState = pres.getDisabledState?.(backendConfig) || { disabled: false };
        expect(disabledState.disabled).toBe(false);
      }
    });

    it("2. Full Stack enables Controllers and Minimal API, and disables MVC and Razor Pages with Library reasons", () => {
      const fullstackConfig = getPresetConfig("fullstack-react")!;
      expect(fullstackConfig.projectType).toBe("fullstack");

      // Controllers is enabled
      const controllersOpt = BACKEND_PRESENTATIONS.find((p) => p.value === "Controllers")!;
      const controllersState = controllersOpt.getDisabledState?.(fullstackConfig) || { disabled: false };
      expect(controllersState.disabled).toBe(false);

      // Minimal API is enabled without disabled state
      const minimalOpt = BACKEND_PRESENTATIONS.find((p) => p.value === "Minimal API")!;
      const minimalState = minimalOpt.getDisabledState?.(fullstackConfig) || { disabled: false };
      expect(minimalState.disabled).toBe(false);

      // MVC is disabled
      const mvcOpt = BACKEND_PRESENTATIONS.find((p) => p.value === "MVC")!;
      const mvcState = mvcOpt.getDisabledState?.(fullstackConfig);
      expect(mvcState?.disabled).toBe(true);
      expect(mvcState?.reason).toBe("Full Stack SPA mode does not support server-rendered MVC presentation.");

      // Razor Pages is disabled
      const razorOpt = BACKEND_PRESENTATIONS.find((p) => p.value === "Razor Pages")!;
      const razorState = razorOpt.getDisabledState?.(fullstackConfig);
      expect(razorState?.disabled).toBe(true);
      expect(razorState?.reason).toBe("Full Stack SPA mode does not support Razor Pages presentation.");
    });

    it("3. Full Stack supports Controllers and Minimal API, rejects MVC and Razor Pages", () => {
      const fullstackConfig = getPresetConfig("fullstack-react")!;

      // Full Stack + Controllers -> valid
      fullstackConfig.backend.presentation = "Controllers";
      expect(validateCompleteStack(fullstackConfig).isValid).toBe(true);
      expect(reconcileCompleteStack(fullstackConfig).backend.presentation).toBe("Controllers");

      // Full Stack + Minimal API -> valid
      fullstackConfig.backend.presentation = "Minimal API";
      expect(validateCompleteStack(fullstackConfig).isValid).toBe(true);
      expect(reconcileCompleteStack(fullstackConfig).backend.presentation).toBe("Minimal API");

      // Full Stack + MVC -> invalid and reconciles to Controllers
      fullstackConfig.backend.presentation = "MVC";
      const mvcResult = validateCompleteStack(fullstackConfig);
      expect(mvcResult.isValid).toBe(false);
      expect(mvcResult.errors.some((e) =>
        e.includes("Full Stack mode only supports Web API (Controllers or Minimal API). Cannot use with backend type \"mvc\".")
      )).toBe(true);
      expect(reconcileCompleteStack(fullstackConfig).backend.presentation).toBe("Controllers");

      // Full Stack + Razor Pages -> invalid and reconciles to Controllers
      fullstackConfig.backend.presentation = "Razor Pages";
      const razorResult = validateCompleteStack(fullstackConfig);
      expect(razorResult.isValid).toBe(false);
      expect(razorResult.errors.some((e) =>
        e.includes("Full Stack mode only supports Web API (Controllers or Minimal API). Cannot use with backend type \"razor-pages\".")
      )).toBe(true);
      expect(reconcileCompleteStack(fullstackConfig).backend.presentation).toBe("Controllers");
    });

    it("4. Generated CLI values match Library syntax across all 4 presentations", () => {
      const config = getPresetConfig("backend-api")!;

      config.backend.presentation = "Controllers";
      expect(buildCliCommand(config)).toContain("--backend-type controllers");

      config.backend.presentation = "Minimal API";
      expect(buildCliCommand(config)).toContain("--backend-type minimal-api");

      config.backend.presentation = "MVC";
      config.backend.auth = "Identity + Cookies";
      expect(buildCliCommand(config)).toContain("--backend-type mvc");

      config.backend.presentation = "Razor Pages";
      config.backend.auth = "Identity + Cookies";
      expect(buildCliCommand(config)).toContain("--backend-type razor-pages");

      // Fullstack with Controllers uses default syntax without --backend-type
      const fullstackConfig = getPresetConfig("fullstack-react")!;
      expect(buildCliCommand(fullstackConfig)).toContain("--type fullstack");
      expect(buildCliCommand(fullstackConfig)).not.toContain("--backend-type");

      // Fullstack with Minimal API emits explicit --backend-type minimal-api
      fullstackConfig.backend.presentation = "Minimal API";
      expect(buildCliCommand(fullstackConfig)).toContain("--type fullstack");
      expect(buildCliCommand(fullstackConfig)).toContain("--backend-type minimal-api");
    });

    it("5. Generated manifest values match Library schema across presentations", () => {
      const config = getPresetConfig("backend-api")!;

      config.backend.presentation = "Controllers";
      expect(JSON.parse(buildManifestJson(config)).backend.presentation).toBe("controllers");

      config.backend.presentation = "Minimal API";
      expect(JSON.parse(buildManifestJson(config)).backend.presentation).toBe("minimal-api");

      config.backend.presentation = "MVC";
      expect(JSON.parse(buildManifestJson(config)).backend.presentation).toBe("mvc");

      config.backend.presentation = "Razor Pages";
      expect(JSON.parse(buildManifestJson(config)).backend.presentation).toBe("razor-pages");

      // Fullstack Controllers
      const fullstackConfig = getPresetConfig("fullstack-react")!;
      expect(JSON.parse(buildManifestJson(fullstackConfig)).backend.presentation).toBe("controllers");

      // Fullstack Minimal API
      fullstackConfig.backend.presentation = "Minimal API";
      expect(JSON.parse(buildManifestJson(fullstackConfig)).backend.presentation).toBe("minimal-api");
    });
  });

  describe("Angular Frontend Stack Clarity & Parity", () => {
    it("1. Fixed Angular configuration values (Tooling, Language, HttpClient, Reactive Forms)", () => {
      const config = getPresetConfig("fullstack-angular")!;
      expect(config.frontend.framework).toBe("Angular");
      expect(config.frontend.tooling).toBe("Angular CLI");
      expect(config.frontend.language).toBe("TypeScript");
      expect(config.frontend.httpClient).toBe("Angular Http");
      expect(config.frontend.forms).toBe("Angular Reactive Forms");

      // Validation passes with fixed settings
      const result = validateCompleteStack(config);
      expect(result.isValid).toBe(true);
    });

    it("2. Selectable Angular options support only genuine domain capabilities", () => {
      const config = getPresetConfig("fullstack-angular")!;

      // State: NgRx and None
      config.frontend.state = "NgRx";
      expect(validateCompleteStack(config).isValid).toBe(true);
      config.frontend.state = "None";
      expect(validateCompleteStack(config).isValid).toBe(true);

      // Styling: Tailwind CSS and Bootstrap
      config.frontend.styling = "Tailwind CSS";
      expect(validateCompleteStack(config).isValid).toBe(true);
      config.frontend.styling = "Bootstrap";
      expect(validateCompleteStack(config).isValid).toBe(true);

      // UI Library: Angular Material, NG-ZORRO, None
      config.frontend.ui = "Angular Material";
      expect(validateCompleteStack(config).isValid).toBe(true);
      config.frontend.ui = "Ant Design Angular";
      expect(validateCompleteStack(config).isValid).toBe(true);
      config.frontend.ui = "None";
      expect(validateCompleteStack(config).isValid).toBe(true);
    });

    it("3. Switching React -> Angular reconciles values to canonical Angular capabilities", () => {
      const reactConfig = getPresetConfig("fullstack-react")!;
      expect(reactConfig.frontend.framework).toBe("React");

      // Switch to Angular
      const angularReconciled = reconcileFrontendOnFrameworkChange(
        reactConfig.frontend,
        "Angular",
      );
      expect(angularReconciled.reconciled.framework).toBe("Angular");
      expect(angularReconciled.reconciled.tooling).toBe("Angular CLI");
      expect(angularReconciled.reconciled.language).toBe("TypeScript");
      expect(angularReconciled.reconciled.httpClient).toBe("Angular Http");
      expect(angularReconciled.reconciled.forms).toBe("Angular Reactive Forms");
      expect(angularReconciled.reconciled.state).toBe("NgRx");
      expect(angularReconciled.reconciled.ui).toBe("Angular Material");
    });

    it("4. Switching Angular -> React reconciles back to valid React defaults", () => {
      const angularConfig = getPresetConfig("fullstack-angular")!;
      expect(angularConfig.frontend.framework).toBe("Angular");

      // Switch to React
      const reactReconciled = reconcileFrontendOnFrameworkChange(
        angularConfig.frontend,
        "React",
      );
      expect(reactReconciled.reconciled.framework).toBe("React");
      expect(reactReconciled.reconciled.tooling).toBe("Vite");
      expect(reactReconciled.reconciled.language).toBe("TypeScript");
      expect(reactReconciled.reconciled.httpClient).toBe("Axios");
      expect(reactReconciled.reconciled.forms).toBe("React Hook Form + Zod");
      expect(reactReconciled.reconciled.state).toBe("Zustand");
      expect(reactReconciled.reconciled.ui).toBe("shadcn/ui");
    });

    it("5. CLI generation for Angular stack produces exact canonical flags", () => {
      const config = getPresetConfig("fullstack-angular")!;
      const cli = buildCliCommand(config);

      expect(cli).toContain("--frontend angular");
      expect(cli).toContain("--frontend-tooling angular-cli");
      expect(cli).toContain("--language typescript");
      expect(cli).toContain("--http angular-http");
      expect(cli).toContain("--forms angular-reactive");
      expect(cli).toContain("--state ngrx");
      expect(cli).toContain("--ui angular-material");
    });

    it("6. Manifest generation for Angular matches Library schema", () => {
      const config = getPresetConfig("fullstack-angular")!;
      const manifest = JSON.parse(buildManifestJson(config));

      expect(manifest.frontend.enabled).toBe(true);
      expect(manifest.frontend.library).toBe("angular");
      expect(manifest.frontend.framework).toBeNull();
      expect(manifest.frontend.language).toBe("typescript");
      expect(manifest.frontend.httpClient).toBe("httpclient");
      expect(manifest.frontend.forms).toBe("reactive-forms");
      expect(manifest.frontend.state).toBe("ngrx");
      expect(manifest.frontend.componentSystem).toBe("none");
    });
  });
});
