import React, { useState } from "react";
import { Folder, FileCode, Check } from "lucide-react";

export type HeroProjectMode = "fullstack" | "backend" | "frontend";

interface ProjectTreeItem {
  id: string;
  depth: number;
  type: "folder" | "file";
  name: string;
  comment?: string;
  isRoot?: boolean;
}

const FULLSTACK_TREE: ProjectTreeItem[] = [
  { id: "root", depth: 0, type: "folder", name: "nexus-app/", isRoot: true },
  { id: "manifest", depth: 1, type: "file", name: ".fullstack-app.json", comment: "Stack manifest & metadata" },
  { id: "backend", depth: 1, type: "folder", name: "Backend/", comment: "Clean Architecture • .NET 10" },
  { id: "domain", depth: 2, type: "folder", name: "Domain/", comment: "Entities, Value Objects, Domain Events" },
  { id: "app", depth: 2, type: "folder", name: "Application/", comment: "Features/ (CQRS Commands, Queries), Behaviors" },
  { id: "infra", depth: 2, type: "folder", name: "Infrastructure/", comment: "Persistence (EF Core / Dapper), Auth, Migrations" },
  { id: "api", depth: 2, type: "folder", name: "API/", comment: "Controllers / Minimal APIs, Middleware, Program.cs" },
  { id: "slnx", depth: 2, type: "file", name: "nexus-app.slnx", comment: "Solution file" },
  { id: "frontend", depth: 1, type: "folder", name: "Frontend/", comment: "SPA Client • React / Angular" },
  { id: "f-src", depth: 2, type: "folder", name: "src/", comment: "components/, features/, stores/, services/" },
  { id: "f-conf", depth: 2, type: "file", name: "index.html, vite.config.ts" },
  { id: "f-pkg", depth: 2, type: "file", name: "package.json, tsconfig.json" },
];

const BACKEND_TREE: ProjectTreeItem[] = [
  { id: "root", depth: 0, type: "folder", name: "nexus-app/", isRoot: true },
  { id: "manifest", depth: 1, type: "file", name: ".fullstack-app.json", comment: "Stack manifest & metadata" },
  { id: "domain", depth: 1, type: "folder", name: "Domain/", comment: "Entities, Value Objects, Domain Events" },
  { id: "app", depth: 1, type: "folder", name: "Application/", comment: "Features/ (CQRS Commands, Queries), Behaviors" },
  { id: "infra", depth: 1, type: "folder", name: "Infrastructure/", comment: "Persistence (EF Core / Dapper), Repositories" },
  { id: "api", depth: 1, type: "folder", name: "API/", comment: "Controllers / Minimal APIs, Middleware, Program.cs" },
  { id: "slnx", depth: 1, type: "file", name: "nexus-app.slnx", comment: "Solution file" },
];

const FRONTEND_TREE: ProjectTreeItem[] = [
  { id: "root", depth: 0, type: "folder", name: "nexus-app/", isRoot: true },
  { id: "manifest", depth: 1, type: "file", name: ".fullstack-app.json", comment: "Stack manifest & metadata" },
  { id: "src", depth: 1, type: "folder", name: "src/", comment: "Application source root" },
  { id: "components", depth: 2, type: "folder", name: "components/", comment: "Reusable UI components" },
  { id: "features", depth: 2, type: "folder", name: "features/", comment: "Business domain modules & hooks" },
  { id: "stores", depth: 2, type: "folder", name: "stores/", comment: "Client state management (Zustand/NgRx)" },
  { id: "services", depth: 2, type: "folder", name: "services/", comment: "Type-safe API HTTP client" },
  { id: "main", depth: 2, type: "file", name: "App.tsx, main.tsx, index.css" },
  { id: "config", depth: 1, type: "file", name: "index.html, vite.config.ts" },
  { id: "pkg", depth: 1, type: "file", name: "package.json, tsconfig.json" },
];

export const GeneratedProjectPreview: React.FC = () => {
  const [mode, setMode] = useState<HeroProjectMode>("fullstack");

  const activeTree =
    mode === "fullstack"
      ? FULLSTACK_TREE
      : mode === "backend"
      ? BACKEND_TREE
      : FRONTEND_TREE;

  const modeBadge =
    mode === "fullstack"
      ? ".NET 10 Clean Architecture + React SPA"
      : mode === "backend"
      ? ".NET 10 Clean Architecture API"
      : "Vite SPA Client Application";

  return (
    <div className="flex flex-col rounded-lg border border-border bg-surface shadow-xl overflow-hidden animate-fade-in">
      {/* Header bar with Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border bg-surface-secondary px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-accent" />
          <span className="font-heading text-xs font-semibold text-text-primary">
            Generated Project Output
          </span>
        </div>

        {/* Project Mode Tabs */}
        <div
          role="tablist"
          aria-label="Project mode preview"
          className="flex items-center rounded-md border border-border bg-surface-raised p-0.5"
        >
          <button
            role="tab"
            aria-selected={mode === "fullstack"}
            type="button"
            onClick={() => setMode("fullstack")}
            className={`rounded px-2.5 py-1 text-[11px] font-medium transition-all cursor-pointer ${
              mode === "fullstack"
                ? "bg-accent text-white font-semibold shadow-sm"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            Full Stack
          </button>
          <button
            role="tab"
            aria-selected={mode === "backend"}
            type="button"
            onClick={() => setMode("backend")}
            className={`rounded px-2.5 py-1 text-[11px] font-medium transition-all cursor-pointer ${
              mode === "backend"
                ? "bg-accent text-white font-semibold shadow-sm"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            Backend
          </button>
          <button
            role="tab"
            aria-selected={mode === "frontend"}
            type="button"
            onClick={() => setMode("frontend")}
            className={`rounded px-2.5 py-1 text-[11px] font-medium transition-all cursor-pointer ${
              mode === "frontend"
                ? "bg-accent text-white font-semibold shadow-sm"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            Frontend
          </button>
        </div>
      </div>

      {/* Output source hint */}
      <div className="flex items-center justify-between border-b border-border-line bg-surface/80 px-4 py-2 text-[11px] font-mono text-text-muted">
        <div className="flex items-center gap-1.5 truncate">
          <span className="text-accent font-semibold">$</span>
          <span className="text-text-secondary">
            flatron {mode === "backend" ? "--mode backend " : mode === "frontend" ? "--mode frontend " : ""}nexus-app
          </span>
        </div>
        <span className="hidden sm:inline-block text-[10px] text-text-muted shrink-0">
          Scaffolded structure
        </span>
      </div>


      {/* Filesystem Tree */}
      <div className="p-4 sm:p-5 font-mono text-xs overflow-x-auto min-h-[300px] bg-[#0B0E11]/60">
        <div key={mode} className="space-y-1.5 animate-fade-in">
          {activeTree.map((item, index) => {
            const indentClass =
              item.depth === 0
                ? "pl-0"
                : item.depth === 1
                ? "pl-4"
                : item.depth === 2
                ? "pl-8"
                : "pl-12";

            const isFolder = item.type === "folder";

            return (
              <div
                key={item.id}
                style={{ animationDelay: `${index * 25}ms` }}
                className={`flex items-baseline justify-between gap-3 ${indentClass} group leading-relaxed`}
              >
                <div className="flex items-center gap-2 truncate">
                  {isFolder ? (
                    <Folder className={`h-3.5 w-3.5 shrink-0 ${item.isRoot ? "text-accent" : "text-text-secondary"}`} />
                  ) : (
                    <FileCode className="h-3.5 w-3.5 shrink-0 text-text-muted" />
                  )}
                  <span
                    className={`${
                      item.isRoot
                        ? "font-semibold text-text-primary font-mono text-[13px]"
                        : isFolder
                        ? "font-medium text-text-primary"
                        : "text-text-secondary"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>

                {item.comment && (
                  <span className="text-[11px] text-text-muted truncate hidden sm:inline opacity-80 group-hover:opacity-100 transition-opacity">
                    // {item.comment}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer metadata */}
      <div className="border-t border-border-line bg-surface px-4 py-2.5 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 text-text-muted">
          <Check className="h-3.5 w-3.5 text-success shrink-0" />
          <span className="font-mono text-text-secondary">{modeBadge}</span>
        </div>
        <span className="text-text-muted font-mono text-[10px]">Ready to build</span>
      </div>
    </div>
  );
};
