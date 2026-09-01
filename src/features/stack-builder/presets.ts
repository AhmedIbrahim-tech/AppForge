import type { StackConfiguration } from "./types";
import { DEFAULT_DOTNET_VERSION } from "./dotnet-versions";

export interface PresetDefinition {
  id: string;
  name: string;
  description: string;
  badge: string;
  config: StackConfiguration;
}

export const STACK_PRESETS: Record<string, PresetDefinition> = {
  "fullstack-modern": {
    id: "fullstack-modern",
    name: "Full Stack Modern",
    description: "React (Vite) + .NET 10 with Clean Architecture, EF Core & PostgreSQL",
    badge: "Recommended",
    config: {
      projectName: "nexus-app",
      projectType: "fullstack",
      backend: {
        framework: "dotnet",
        dotnetVersion: DEFAULT_DOTNET_VERSION,
        architecture: "CQRS + MediatR (Clean Architecture)",
        orm: "EF Core",
        database: "PostgreSQL",
        auth: "ASP.NET Core Identity + JWT",
        signalR: true,
        hangfire: true,
        includeDocker: true,
        includeSwagger: true,
      },
      frontend: {
        framework: "React",
        tooling: "Vite",
        language: "TypeScript",
        styling: "Tailwind CSS",
        state: "Zustand",
        ui: "shadcn/ui",
        includeI18n: true,
        includeSonner: true,
      },
    },
  },
  "enterprise-dotnet-next": {
    id: "enterprise-dotnet-next",
    name: "Enterprise .NET + Next.js",
    description: "Next.js + .NET 10 with SQL Server, Redux Toolkit & Material UI",
    badge: "Enterprise",
    config: {
      projectName: "enterprise-portal",
      projectType: "fullstack",
      backend: {
        framework: "dotnet",
        dotnetVersion: DEFAULT_DOTNET_VERSION,
        architecture: "CQRS + MediatR (Clean Architecture)",
        orm: "EF Core",
        database: "SQL Server",
        auth: "ASP.NET Core Identity + JWT",
        signalR: true,
        hangfire: true,
        includeDocker: true,
        includeSwagger: true,
      },
      frontend: {
        framework: "React",
        tooling: "Next.js",
        language: "TypeScript",
        styling: "Tailwind CSS",
        state: "Redux Toolkit",
        ui: "Material UI",
        includeI18n: true,
        includeSonner: true,
      },
    },
  },
  "angular-enterprise": {
    id: "angular-enterprise",
    name: "Angular + NgRx Enterprise",
    description: "Angular CLI + .NET 10 with PostgreSQL, NgRx & Angular Material",
    badge: "Angular",
    config: {
      projectName: "enterprise-ng-portal",
      projectType: "fullstack",
      backend: {
        framework: "dotnet",
        dotnetVersion: DEFAULT_DOTNET_VERSION,
        architecture: "CQRS + MediatR (Clean Architecture)",
        orm: "EF Core",
        database: "PostgreSQL",
        auth: "ASP.NET Core Identity + JWT",
        signalR: true,
        hangfire: true,
        includeDocker: true,
        includeSwagger: true,
      },
      frontend: {
        framework: "Angular",
        tooling: "Angular CLI",
        language: "TypeScript",
        styling: "Tailwind CSS",
        state: "NgRx",
        ui: "Angular Material",
        includeI18n: true,
        includeSonner: true,
      },
    },
  },
  "microservice-api": {
    id: "microservice-api",
    name: "Backend-Only Microservice",
    description: ".NET 10 High-Performance API with Dapper, MediatR & PostgreSQL",
    badge: "Backend",
    config: {
      projectName: "order-service",
      projectType: "backend",
      backend: {
        framework: "dotnet",
        dotnetVersion: DEFAULT_DOTNET_VERSION,
        architecture: "CQRS + MediatR (Clean Architecture)",
        orm: "Dapper",
        database: "PostgreSQL",
        auth: "ASP.NET Core Identity + JWT",
        signalR: false,
        hangfire: true,
        includeDocker: true,
        includeSwagger: true,
      },
      frontend: {
        framework: "React",
        tooling: "Vite",
        language: "TypeScript",
        styling: "Tailwind CSS",
        state: "Zustand",
        ui: "shadcn/ui",
        includeI18n: false,
        includeSonner: false,
      },
    },
  },
  "frontend-spa": {
    id: "frontend-spa",
    name: "Frontend SPA",
    description: "React + Vite + TypeScript + Zustand + Tailwind CSS + shadcn/ui",
    badge: "Frontend",
    config: {
      projectName: "dashboard-app",
      projectType: "frontend",
      backend: {
        framework: "dotnet",
        dotnetVersion: DEFAULT_DOTNET_VERSION,
        architecture: "CQRS + MediatR (Clean Architecture)",
        orm: "EF Core",
        database: "PostgreSQL",
        auth: "ASP.NET Core Identity + JWT",
        signalR: false,
        hangfire: false,
        includeDocker: false,
        includeSwagger: false,
      },
      frontend: {
        framework: "React",
        tooling: "Vite",
        language: "TypeScript",
        styling: "Tailwind CSS",
        state: "Zustand",
        ui: "shadcn/ui",
        includeI18n: true,
        includeSonner: true,
      },
    },
  },
};

/**
 * Returns a clone of the configuration for a given preset
 */
export function getPresetConfig(presetId: string): StackConfiguration | null {
  const preset = STACK_PRESETS[presetId];
  if (!preset) return null;
  return JSON.parse(JSON.stringify(preset.config));
}
