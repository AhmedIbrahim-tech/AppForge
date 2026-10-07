import React from "react";
import { Check, X } from "lucide-react";

interface ComparisonRow {
  feature: string;
  category: string;
  manual: string;
  flatron: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    category: "Scaffolding",
    feature: "Project Creation",
    manual: "Multiple separate CLI commands and manual folder assembly",
    flatron: "One command unified scaffolding (npx flatron nexus-app)",
  },
  {
    category: "Architecture",
    feature: "Clean Architecture",
    manual: "Manual project references and boundary configuration",
    flatron: "Domain, Application, Infrastructure, and API pre-wired",
  },
  {
    category: "Architecture",
    feature: "CQRS / Handlers",
    manual: "Manual MediatR pipeline behaviors and DI container setup",
    flatron: "Automated CQRS commands, queries, and behaviors",
  },
  {
    category: "Data",
    feature: "Persistence Layer",
    manual: "Manual DbContext, Dapper factories, and migrations setup",
    flatron: "EF Core, Dapper, or Hybrid persistence out-of-the-box",
  },
  {
    category: "Security",
    feature: "Authentication",
    manual: "Complex ASP.NET Identity and JWT middleware configuration",
    flatron: "Pre-configured Identity, JWT Bearer, or Cookies",
  },
  {
    category: "Frontend",
    feature: "Full-Stack Integration",
    manual: "Separate SPA setup, styling setup, and API fetcher wiring",
    flatron: "React or Angular with Tailwind, state stores, and typed clients",
  },
  {
    category: "Manifest",
    feature: "Reproducibility",
    manual: "No schema definition for team reproduction",
    flatron: "Declarative .fullstack-app.json stack manifest",
  },
];

export const ManualSetupComparison: React.FC = () => {
  return (
    <section id="comparison" className="relative w-full py-16 sm:py-20 bg-base">
      <div className="app-container">
        {/* Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-medium text-text-secondary">
            <span className="flex h-2 w-2 rounded-full bg-accent" />
            <span>Why Flatron</span>
          </div>
          <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Manual assembly vs Flatron
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-text-secondary leading-relaxed">
            Compare manually assembling enterprise .NET architectures against generating a verified, reproducible solution.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mt-8 overflow-hidden rounded-[8px] border border-border-subtle bg-surface">
          {/* Table Header */}
          <div className="grid grid-cols-12 border-b border-border-subtle bg-base px-4 py-3 text-xs font-semibold text-text-muted">
            <div className="col-span-4 sm:col-span-3 font-mono text-[11px] uppercase tracking-wider">
              Capability
            </div>
            <div className="col-span-4 sm:col-span-4 font-mono text-[11px] uppercase tracking-wider text-text-muted">
              Manual Setup
            </div>
            <div className="col-span-4 sm:col-span-5 font-mono text-[11px] uppercase tracking-wider text-accent">
              Flatron Toolchain
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-border-line">
            {COMPARISON_ROWS.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 items-center gap-2 px-4 py-3.5 text-xs transition-colors hover:bg-surface-secondary"
              >
                {/* Column 1: Feature */}
                <div className="col-span-4 sm:col-span-3">
                  <div className="font-medium text-text-primary">{row.feature}</div>
                  <div className="text-[10px] font-mono text-text-muted mt-0.5">{row.category}</div>
                </div>

                {/* Column 2: Manual */}
                <div className="col-span-4 sm:col-span-4 flex items-start gap-2 text-text-muted">
                  <X className="h-3.5 w-3.5 text-text-muted shrink-0 mt-0.5" />
                  <span className="text-xs leading-relaxed">{row.manual}</span>
                </div>

                {/* Column 3: Flatron */}
                <div className="col-span-4 sm:col-span-5 flex items-start gap-2 text-text-primary font-medium">
                  <Check className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                  <span className="text-xs leading-relaxed text-text-primary">{row.flatron}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

