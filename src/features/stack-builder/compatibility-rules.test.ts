import { describe, it, expect } from "vitest";
import {
  validateFrontendStack,
  adjustFrontendStackToFramework,
  FRONTEND_CAPABILITY_MATRIX,
} from "./compatibility-rules";
import type { FrontendConfiguration } from "./types";

describe("Frontend Compatibility Rules", () => {
  describe("Validation Rules", () => {
    // Test Case 1
    it("1. React + Next + Zustand + shadcn/ui => valid", () => {
      const config: FrontendConfiguration = {
        framework: "React",
        tooling: "Next.js",
        state: "Zustand",
        ui: "shadcn/ui",
        styling: "Tailwind CSS",
        language: "TypeScript",
        includeI18n: true,
        includeSonner: true,
      };

      const result = validateFrontendStack(config);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    // Test Case 2
    it("2. Angular + Angular CLI + NgRx + Angular Material => valid", () => {
      const config: FrontendConfiguration = {
        framework: "Angular",
        tooling: "Angular CLI",
        state: "NgRx",
        ui: "Angular Material",
        styling: "Tailwind CSS",
        language: "TypeScript",
        includeI18n: true,
        includeSonner: true,
      };

      const result = validateFrontendStack(config);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    // Test Case 3
    it("3. Angular + Next.js => invalid", () => {
      const config: FrontendConfiguration = {
        framework: "Angular",
        tooling: "Next.js",
        state: "NgRx",
        ui: "Angular Material",
        styling: "Tailwind CSS",
        language: "TypeScript",
        includeI18n: true,
        includeSonner: true,
      };

      const result = validateFrontendStack(config);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Next.js is only available for React projects.");
    });

    // Test Case 4
    it("4. Angular + Zustand => invalid", () => {
      const config: FrontendConfiguration = {
        framework: "Angular",
        tooling: "Angular CLI",
        state: "Zustand",
        ui: "Angular Material",
        styling: "Tailwind CSS",
        language: "TypeScript",
        includeI18n: true,
        includeSonner: true,
      };

      const result = validateFrontendStack(config);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Zustand is only available for React projects.");
    });

    // Test Case 5
    it("5. Angular + shadcn/ui => invalid", () => {
      const config: FrontendConfiguration = {
        framework: "Angular",
        tooling: "Angular CLI",
        state: "NgRx",
        ui: "shadcn/ui",
        styling: "Tailwind CSS",
        language: "TypeScript",
        includeI18n: true,
        includeSonner: true,
      };

      const result = validateFrontendStack(config);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("shadcn/ui is only available for React projects.");
    });

    it("should reject React with Angular-specific dependencies", () => {
      const configWithNgRx: FrontendConfiguration = {
        framework: "React",
        tooling: "Vite",
        state: "NgRx",
        ui: "shadcn/ui",
        styling: "Tailwind CSS",
        language: "TypeScript",
        includeI18n: true,
        includeSonner: true,
      };
      expect(validateFrontendStack(configWithNgRx).errors).toContain(
        "NgRx is only available for Angular projects.",
      );

      const configWithAngularCli: FrontendConfiguration = {
        framework: "React",
        tooling: "Angular CLI",
        state: "Zustand",
        ui: "shadcn/ui",
        styling: "Tailwind CSS",
        language: "TypeScript",
        includeI18n: true,
        includeSonner: true,
      };
      expect(validateFrontendStack(configWithAngularCli).errors).toContain(
        "Angular CLI is only available for Angular projects.",
      );

      const configWithAngularMaterial: FrontendConfiguration = {
        framework: "React",
        tooling: "Vite",
        state: "Zustand",
        ui: "Angular Material",
        styling: "Tailwind CSS",
        language: "TypeScript",
        includeI18n: true,
        includeSonner: true,
      };
      expect(validateFrontendStack(configWithAngularMaterial).errors).toContain(
        "Angular Material is only available for Angular projects.",
      );
    });

    it("should allow 'None' as state management for both React and Angular", () => {
      const reactNoState: FrontendConfiguration = {
        framework: "React",
        tooling: "Vite",
        state: "None",
        ui: "Material UI",
        styling: "Tailwind CSS",
        language: "TypeScript",
        includeI18n: true,
        includeSonner: true,
      };
      expect(validateFrontendStack(reactNoState).isValid).toBe(true);

      const angularNoState: FrontendConfiguration = {
        framework: "Angular",
        tooling: "Angular CLI",
        state: "None",
        ui: "Bootstrap",
        styling: "Bootstrap",
        language: "TypeScript",
        includeI18n: true,
        includeSonner: true,
      };
      expect(validateFrontendStack(angularNoState).isValid).toBe(true);
    });
  });

  describe("Automatic Adjustment on Framework Switch", () => {
    it("should adjust incompatible React options when switching to Angular", () => {
      const reactConfig: FrontendConfiguration = {
        framework: "React",
        tooling: "Next.js",
        state: "Zustand",
        ui: "shadcn/ui",
        styling: "Tailwind CSS",
        language: "TypeScript",
        includeI18n: true,
        includeSonner: true,
      };

      const { adjusted, changed, adjustedFields } = adjustFrontendStackToFramework(
        reactConfig,
        "Angular",
      );

      expect(changed).toBe(true);
      expect(adjusted.framework).toBe("Angular");
      expect(adjusted.tooling).toBe("Angular CLI");
      expect(adjusted.state).toBe("NgRx");
      expect(adjusted.ui).toBe("Angular Material");
      expect(adjustedFields.length).toBeGreaterThanOrEqual(3);

      // Verify the resulting configuration is completely valid
      const validation = validateFrontendStack(adjusted);
      expect(validation.isValid).toBe(true);
    });

    it("should adjust incompatible Angular options when switching to React", () => {
      const angularConfig: FrontendConfiguration = {
        framework: "Angular",
        tooling: "Angular CLI",
        state: "NgRx",
        ui: "Angular Material",
        styling: "Tailwind CSS",
        language: "TypeScript",
        includeI18n: true,
        includeSonner: true,
      };

      const { adjusted, changed } = adjustFrontendStackToFramework(
        angularConfig,
        "React",
      );

      expect(changed).toBe(true);
      expect(adjusted.framework).toBe("React");
      expect(adjusted.tooling).toBe("Vite");
      expect(adjusted.state).toBe("Zustand");
      expect(adjusted.ui).toBe("shadcn/ui");

      // Verify the resulting configuration is completely valid
      const validation = validateFrontendStack(adjusted);
      expect(validation.isValid).toBe(true);
    });
  });

  describe("Capability Matrix Integrity", () => {
    it("should define strictly segregated options per framework", () => {
      const reactRules = FRONTEND_CAPABILITY_MATRIX.React;
      const angularRules = FRONTEND_CAPABILITY_MATRIX.Angular;

      // React should not include Angular CLI or NgRx or Angular Material
      expect(reactRules.tooling).not.toContain("Angular CLI");
      expect(reactRules.state).not.toContain("NgRx");
      expect(reactRules.ui).not.toContain("Angular Material");

      // Angular should not include Next.js, Vite, Zustand, Redux Toolkit, or shadcn/ui
      expect(angularRules.tooling).not.toContain("Next.js");
      expect(angularRules.tooling).not.toContain("Vite");
      expect(angularRules.state).not.toContain("Zustand");
      expect(angularRules.state).not.toContain("Redux Toolkit");
      expect(angularRules.ui).not.toContain("shadcn/ui");
      expect(angularRules.ui).not.toContain("Material UI");
    });
  });
});
