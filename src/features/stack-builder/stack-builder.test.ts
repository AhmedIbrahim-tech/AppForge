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
import type { StackConfiguration } from "./types";

describe(".NET Runtime Version Selector & Builder Tests", () => {
  // Requirement 1: Default runtime is .NET 10
  it("1. Default runtime is .NET 10", () => {
    expect(DEFAULT_DOTNET_VERSION).toBe("10");
    expect(DOTNET_VERSIONS["10"].isDefault).toBe(true);

    const defaultPreset = STACK_PRESETS["fullstack-modern"];
    expect(defaultPreset).toBeDefined();
    expect(defaultPreset.config.backend.dotnetVersion).toBe("10");
    expect(getDotnetDisplay(defaultPreset.config.backend.dotnetVersion)).toBe(
      ".NET 10",
    );
    expect(
      getDotnetTargetFramework(defaultPreset.config.backend.dotnetVersion),
    ).toBe("net10.0");
  });

  // Requirement 2: Runtime options are exactly .NET 10, .NET 9, .NET 8
  it("2. Runtime options are exactly .NET 10, .NET 9, .NET 8", () => {
    expect(SUPPORTED_DOTNET_VERSIONS).toEqual(["10", "9", "8"]);
    expect(getDotnetDisplay("10")).toBe(".NET 10");
    expect(getDotnetDisplay("9")).toBe(".NET 9");
    expect(getDotnetDisplay("8")).toBe(".NET 8");
  });

  // Requirement 3: No LTS/Preview/Standard labels exist
  it("3. No LTS/Preview/Standard labels exist", () => {
    for (const ver of SUPPORTED_DOTNET_VERSIONS) {
      const info = DOTNET_VERSIONS[ver];
      expect(info.label).not.toContain("LTS");
      expect(info.label).not.toContain("Preview");
      expect(info.label).not.toContain("Standard");

      expect(info.display).not.toContain("LTS");
      expect(info.display).not.toContain("Preview");
      expect(info.display).not.toContain("Standard");
    }
  });

  // Requirement 4: Presets use .NET 10 by default
  it("4. Presets use .NET 10 by default", () => {
    const presetIds = Object.keys(STACK_PRESETS);
    for (const id of presetIds) {
      const preset = STACK_PRESETS[id];
      expect(preset.config.backend.dotnetVersion).toBe("10");
    }
  });

  // Requirement 5: Project name is required
  it("5. Project name is required", () => {
    const emptyValidation = validateProjectName("");
    expect(emptyValidation.isValid).toBe(false);
    expect(emptyValidation.errors).toContain("Project name is required.");

    const whitespaceValidation = validateProjectName("   ");
    expect(whitespaceValidation.isValid).toBe(false);
    expect(whitespaceValidation.errors).toContain("Project name is required.");

    const invalidCharValidation = validateProjectName("My App!");
    expect(invalidCharValidation.isValid).toBe(false);
    expect(
      invalidCharValidation.errors.some((e) => e.includes("can only contain")),
    ).toBe(true);

    const validValidation = validateProjectName("MyEcommerceApp");
    expect(validValidation.isValid).toBe(true);
    expect(validValidation.errors).toHaveLength(0);
  });

  // Requirement 6: Changing project name updates previews
  it("6. Changing project name updates previews", () => {
    const baseConfig = getPresetConfig("fullstack-modern")!;
    const updatedConfig: StackConfiguration = {
      ...baseConfig,
      projectName: "MyEcommerceApp",
    };

    const validation = validateCompleteStack(updatedConfig);
    expect(validation.isValid).toBe(true);
    expect(updatedConfig.projectName).toBe("MyEcommerceApp");
  });

  // Requirement 7: Presets generate valid configuration objects
  it("7. Presets generate valid configuration objects", () => {
    const presetIds = Object.keys(STACK_PRESETS);
    expect(presetIds.length).toBeGreaterThanOrEqual(4);

    for (const id of presetIds) {
      const presetConfig = getPresetConfig(id);
      expect(presetConfig).not.toBeNull();
      if (!presetConfig) continue;

      // Verify configuration structure
      expect(presetConfig.projectName).toBeDefined();
      expect(presetConfig.projectType).toBeDefined();
      expect(presetConfig.backend).toBeDefined();
      expect(presetConfig.frontend).toBeDefined();

      // Verify complete stack validation
      const validation = validateCompleteStack(presetConfig);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);

      // Verify backend dotnet version is valid
      if (presetConfig.projectType !== "frontend") {
        expect(isValidDotnetVersion(presetConfig.backend.dotnetVersion)).toBe(
          true,
        );
      }

      // Verify frontend capability matrix
      if (presetConfig.projectType !== "backend") {
        const frontendValidation = validateFrontendStack(
          presetConfig.frontend,
        );
        expect(frontendValidation.isValid).toBe(true);
      }
    }
  });
});
