import { describe, it, expect } from "vitest";
import {
  validateFrontendStack,
  validateBackendStack,
  adjustFrontendStackToFramework,
} from "./compatibility-rules";
import type { FrontendConfiguration, BackendConfiguration } from "./types";

describe("Frontend & Backend Compatibility Rules", () => {
  describe("Frontend Validation Rules", () => {
    it("1. React + Next + Zustand + shadcn/ui => valid", () => {
      const config: FrontendConfiguration = {
        framework: "React",
        tooling: "Next.js",
        state: "Zustand",
        httpClient: "Axios",
        forms: "React Hook Form + Zod",
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

    it("2. Angular + Angular CLI + NgRx + Angular Material => valid", () => {
      const config: FrontendConfiguration = {
        framework: "Angular",
        tooling: "Angular CLI",
        state: "NgRx",
        httpClient: "Angular Http",
        forms: "Angular Reactive Forms",
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

    it("3. Angular + Next.js => invalid", () => {
      const config: FrontendConfiguration = {
        framework: "Angular",
        tooling: "Next.js" as unknown as FrontendConfiguration["tooling"],
        state: "NgRx",
        httpClient: "Angular Http",
        forms: "Angular Reactive Forms",
        ui: "Angular Material",
        styling: "Tailwind CSS",
        language: "TypeScript",
        includeI18n: true,
        includeSonner: true,
      };

      const result = validateFrontendStack(config);
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.includes("Tooling 'Next.js' is not supported for Angular"))).toBe(true);
    });

    it("4. Angular + Zustand => invalid", () => {
      const config: FrontendConfiguration = {
        framework: "Angular",
        tooling: "Angular CLI",
        state: "Zustand" as unknown as FrontendConfiguration["state"],
        httpClient: "Angular Http",
        forms: "Angular Reactive Forms",
        ui: "Angular Material",
        styling: "Tailwind CSS",
        language: "TypeScript",
        includeI18n: true,
        includeSonner: true,
      };

      const result = validateFrontendStack(config);
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.includes("State library 'Zustand' is not supported for Angular"))).toBe(true);
    });

    it("5. Angular + shadcn/ui => invalid", () => {
      const config: FrontendConfiguration = {
        framework: "Angular",
        tooling: "Angular CLI",
        state: "NgRx",
        httpClient: "Angular Http",
        forms: "Angular Reactive Forms",
        ui: "shadcn/ui" as unknown as FrontendConfiguration["ui"],
        styling: "Tailwind CSS",
        language: "TypeScript",
        includeI18n: true,
        includeSonner: true,
      };

      const result = validateFrontendStack(config);
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.includes("UI system 'shadcn/ui' is not supported for Angular"))).toBe(true);
    });

    it("should allow 'None' as state management for both React and Angular", () => {
      const reactNoState: FrontendConfiguration = {
        framework: "React",
        tooling: "Vite",
        state: "None",
        httpClient: "Axios",
        forms: "None",
        ui: "Material UI",
        styling: "Tailwind CSS",
        language: "TypeScript",
        includeI18n: false,
        includeSonner: true,
      };
      expect(validateFrontendStack(reactNoState).isValid).toBe(true);

      const angularNoState: FrontendConfiguration = {
        framework: "Angular",
        tooling: "Angular CLI",
        state: "None",
        httpClient: "Angular Http",
        forms: "None",
        ui: "Angular Material",
        styling: "Bootstrap",
        language: "TypeScript",
        includeI18n: false,
        includeSonner: false,
      };
      expect(validateFrontendStack(angularNoState).isValid).toBe(true);
    });
  });

  describe("Backend Validation Rules", () => {
    it("should reject Identity with Dapper-only", () => {
      const backendConfig: BackendConfiguration = {
        framework: "dotnet",
        dotnetVersion: "10",
        presentation: "Controllers",
        architecture: "CQRS + MediatR",
        orm: "Dapper",
        database: "PostgreSQL",
        auth: "Identity + JWT",
        mapping: "AutoMapper",
        signalR: false,
        hangfire: false,
        includeDocker: true,
        includeSwagger: true,
      };

      const result = validateBackendStack(backendConfig);
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.includes("Identity store requires EF Core"))).toBe(true);
    });

    it("should allow EF Core + Dapper (Hybrid) with Identity", () => {
      const backendConfig: BackendConfiguration = {
        framework: "dotnet",
        dotnetVersion: "10",
        presentation: "Controllers",
        architecture: "CQRS + MediatR",
        orm: "EF Core + Dapper",
        database: "PostgreSQL",
        auth: "Identity + JWT",
        mapping: "AutoMapper",
        signalR: true,
        hangfire: false,
        includeDocker: true,
        includeSwagger: true,
      };

      const result = validateBackendStack(backendConfig);
      expect(result.isValid).toBe(true);
    });

    it("should reject JWT auth on MVC / Razor pages", () => {
      const backendConfig: BackendConfiguration = {
        framework: "dotnet",
        dotnetVersion: "10",
        presentation: "MVC",
        architecture: "Application Services",
        orm: "EF Core",
        database: "SQL Server",
        auth: "JWT",
        mapping: "Manual Mapping",
        signalR: false,
        hangfire: false,
        includeDocker: true,
        includeSwagger: false,
      };

      const result = validateBackendStack(backendConfig);
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.includes("Cookie authentication instead of JWT"))).toBe(true);
    });
  });

  describe("Automatic Adjustment on Framework Switch", () => {
    it("should adjust incompatible React options when switching to Angular", () => {
      const reactConfig: FrontendConfiguration = {
        framework: "React",
        tooling: "Next.js",
        state: "Zustand",
        httpClient: "Axios",
        forms: "React Hook Form + Zod",
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

      const validation = validateFrontendStack(adjusted);
      expect(validation.isValid).toBe(true);
    });
  });
});
