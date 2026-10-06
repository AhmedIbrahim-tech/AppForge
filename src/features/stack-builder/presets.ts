import type { StackConfiguration } from "./types";
import { DEFAULT_DOTNET_VERSION } from "./dotnet-versions";

export interface PresetDefinition {
  id: string;
  name: string;
  secondary: string;
  fullName: string;
  description: string;
  badge?: string;
  config: StackConfiguration;
}

export const STACK_PRESETS: Record<string, PresetDefinition> = {
  "fullstack-react": {
    id: "fullstack-react",
    name: "React + Vite",
    secondary: "Full Stack",
    fullName: "Full Stack (React + Vite)",
    description: "React (Vite) + .NET 10 with CQRS, EF Core & PostgreSQL",
    badge: "Popular",
    config: {
      projectName: "my-flatron-app",
      projectType: "fullstack",
      packageManager: "npm",
      backend: {
        framework: "dotnet",
        dotnetVersion: DEFAULT_DOTNET_VERSION,
        presentation: "Controllers",
        architecture: "CQRS + MediatR",
        orm: "EF Core",
        database: "PostgreSQL",
        auth: "Identity + JWT",
        mapping: "AutoMapper",
        logging: "Serilog",
        signalR: true,
        hangfire: false,
        includeDocker: true,
        includeSwagger: true,
      },
      frontend: {
        framework: "React",
        tooling: "Vite",
        language: "TypeScript",
        styling: "Tailwind CSS",
        state: "Zustand",
        httpClient: "Axios",
        forms: "React Hook Form + Zod",
        ui: "shadcn/ui",
        includeI18n: false,
        includeSonner: true,
      },
    },
  },
  "fullstack-next": {
    id: "fullstack-next",
    name: "Next.js",
    secondary: "Full Stack",
    fullName: "Full Stack (Next.js)",
    description: "Next.js + .NET 10 with SQL Server, Redux Toolkit & shadcn/ui",
    badge: "Full Stack",
    config: {
      projectName: "my-flatron-next",
      projectType: "fullstack",
      packageManager: "npm",
      backend: {
        framework: "dotnet",
        dotnetVersion: DEFAULT_DOTNET_VERSION,
        presentation: "Controllers",
        architecture: "CQRS + MediatR",
        orm: "EF Core",
        database: "SQL Server",
        auth: "Identity + JWT",
        mapping: "AutoMapper",
        logging: "Serilog",
        signalR: true,
        hangfire: false,
        includeDocker: true,
        includeSwagger: true,
      },
      frontend: {
        framework: "React",
        tooling: "Next.js",
        language: "TypeScript",
        styling: "Tailwind CSS",
        state: "Redux Toolkit",
        httpClient: "Axios",
        forms: "React Hook Form + Zod",
        ui: "shadcn/ui",
        includeI18n: false,
        includeSonner: true,
      },
    },
  },
  "fullstack-angular": {
    id: "fullstack-angular",
    name: "Angular",
    secondary: "Full Stack",
    fullName: "Full Stack (Angular)",
    description: "Angular CLI + .NET 10 with Application Services, NgRx & Angular Material",
    badge: "Angular",
    config: {
      projectName: "my-flatron-angular",
      projectType: "fullstack",
      packageManager: "npm",
      backend: {
        framework: "dotnet",
        dotnetVersion: DEFAULT_DOTNET_VERSION,
        presentation: "Controllers",
        architecture: "Application Services",
        orm: "EF Core",
        database: "PostgreSQL",
        auth: "Identity + JWT",
        mapping: "AutoMapper",
        logging: "Serilog",
        signalR: false,
        hangfire: false,
        includeDocker: true,
        includeSwagger: true,
      },
      frontend: {
        framework: "Angular",
        tooling: "Angular CLI",
        language: "TypeScript",
        styling: "Tailwind CSS",
        state: "NgRx",
        httpClient: "Angular Http",
        forms: "Angular Reactive Forms",
        ui: "Angular Material",
        includeI18n: false,
        includeSonner: false,
      },
    },
  },
  "backend-api": {
    id: "backend-api",
    name: "Backend API",
    secondary: "Backend Only",
    fullName: "Backend Only (API)",
    description: ".NET 10 Controllers API with CQRS + MediatR, EF Core + Dapper (Hybrid) & PostgreSQL",
    badge: "Backend",
    config: {
      projectName: "my-flatron-api",
      projectType: "backend",
      packageManager: "npm",
      backend: {
        framework: "dotnet",
        dotnetVersion: DEFAULT_DOTNET_VERSION,
        presentation: "Controllers",
        architecture: "CQRS + MediatR",
        orm: "EF Core + Dapper",
        database: "PostgreSQL",
        auth: "JWT",
        mapping: "AutoMapper",
        logging: "Serilog",
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
        httpClient: "Axios",
        forms: "React Hook Form + Zod",
        ui: "shadcn/ui",
        includeI18n: false,
        includeSonner: false,
      },
    },
  },
  "frontend-spa": {
    id: "frontend-spa",
    name: "Frontend SPA",
    secondary: "Frontend Only",
    fullName: "Frontend Only (SPA)",
    description: "React + Vite + TypeScript + Zustand + Tailwind CSS + shadcn/ui",
    badge: "Frontend",
    config: {
      projectName: "my-flatron-web",
      projectType: "frontend",
      packageManager: "npm",
      backend: {
        framework: "dotnet",
        dotnetVersion: DEFAULT_DOTNET_VERSION,
        presentation: "Controllers",
        architecture: "CQRS + MediatR",
        orm: "EF Core",
        database: "PostgreSQL",
        auth: "Identity + JWT",
        mapping: "AutoMapper",
        logging: "Serilog",
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
        httpClient: "Axios",
        forms: "React Hook Form + Zod",
        ui: "shadcn/ui",
        includeI18n: false,
        includeSonner: true,
      },
    },
  },
};

/**
 * Returns a deep clone of the configuration for a given preset
 */
export function getPresetConfig(presetId: string): StackConfiguration | null {
  const preset = STACK_PRESETS[presetId];
  if (!preset) return null;
  return JSON.parse(JSON.stringify(preset.config));
}
