import React from "react";
import { DocsPageHeader } from "../components/DocsPageHeader";
import { DocsToc } from "../components/DocsToc";
import { DocsCallout } from "../components/DocsCallout";
import { DocsNextPrevious } from "../components/DocsNextPrevious";
import { DOC_PAGES } from "../docs-data";
import { Check, X, Terminal, Monitor, Code2, ShieldCheck } from "lucide-react";

export const WhatIsFlatronPage: React.FC = () => {
  const meta = DOC_PAGES["what-is-flatron"];

  return (
    <div className="flex items-start gap-8 w-full">
      <div className="flex-1 min-w-0">
        <DocsPageHeader
          title={meta.title}
          description={meta.description}
          section={meta.section}
        />

        {/* Section 1: Overview */}
        <section id="overview" className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            Overview
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            <strong>Flatron</strong> is a CLI-first scaffolding toolkit accompanied by a web-based visual configuration platform. It accelerates building enterprise full-stack .NET 10 applications by generating production-oriented Clean Architecture solutions, CQRS domain features, and pre-wired application modules.
          </p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Instead of manually creating dozens of projects, configuring MediatR pipelines, wiring DbContext interceptors, and hand-crafting CRUD forms, Flatron gives you an automated, reproducible workflow.
          </p>
        </section>

        {/* Section 2: What Flatron Is & Is Not */}
        <section id="what-flatron-is-and-is-not" className="mt-10 space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            What Flatron Is &amp; What It Is Not
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Understanding Flatron begins with understanding its architectural boundaries:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* What it IS */}
            <div className="rounded-xl border border-success/30 bg-success/5 p-5">
              <div className="flex items-center gap-2 font-heading text-xs uppercase tracking-wider font-bold text-success mb-3">
                <Check className="h-4 w-4" />
                <span>What Flatron Is</span>
              </div>
              <ul className="space-y-2 text-xs text-text-secondary">
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                  <span>A source code generator and project scaffolder.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                  <span>A visual topology configurator with compatibility rules.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                  <span>A domain feature and module generator.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                  <span>100% standard C# and TypeScript code output.</span>
                </li>
              </ul>
            </div>

            {/* What it is NOT */}
            <div className="rounded-xl border border-danger/30 bg-danger/5 p-5">
              <div className="flex items-center gap-2 font-heading text-xs uppercase tracking-wider font-bold text-danger mb-3">
                <X className="h-4 w-4" />
                <span>What Flatron Is Not</span>
              </div>
              <ul className="space-y-2 text-xs text-text-secondary">
                <li className="flex items-start gap-2">
                  <X className="h-3.5 w-3.5 text-danger shrink-0 mt-0.5" />
                  <span>Not a runtime framework (no vendor lock-in).</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-3.5 w-3.5 text-danger shrink-0 mt-0.5" />
                  <span>Not a replacement for ASP.NET Core or React/Angular.</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-3.5 w-3.5 text-danger shrink-0 mt-0.5" />
                  <span>Not a closed-source black box library.</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-3.5 w-3.5 text-danger shrink-0 mt-0.5" />
                  <span>Not required in production servers.</span>
                </li>
              </ul>
            </div>
          </div>

          <DocsCallout type="note" title="Zero Runtime Dependency">
            Once your solution is generated, Flatron is not required to run, build, or deploy your application. You own 100% of the generated source code.
          </DocsCallout>
        </section>

        {/* Section 3: Platform & CLI Relationship */}
        <section id="cli-and-platform-relationship" className="mt-10 space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            Platform &amp; CLI Relationship
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Flatron operates as a synchronized ecosystem of two tools:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="rounded-xl border border-border-subtle bg-surface p-4 shadow-xs">
              <div className="flex items-center gap-2 font-heading text-xs font-bold text-text-primary mb-2">
                <Monitor className="h-4 w-4 text-accent" />
                <span>Flatron Platform (Web UI)</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                The interactive web workspace where you visually configure stacks, validate architectural compatibility, preview project directory trees, and customize domain feature fields. It outputs CLI commands and manifests.
              </p>
            </div>

            <div className="rounded-xl border border-border-subtle bg-surface p-4 shadow-xs">
              <div className="flex items-center gap-2 font-heading text-xs font-bold text-text-primary mb-2">
                <Terminal className="h-4 w-4 text-info" />
                <span>Flatron CLI (npm/npx)</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                The command-line engine that executes file creation, solution references, NuGet and npm installations, and progressive domain generation on your local workstation.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Generated Architecture */}
        <section id="generated-output" className="mt-10 space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            Generated Architecture
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Flatron scaffolds an industry-standard Clean Architecture solution structured with explicit dependency boundaries:
          </p>

          <div className="rounded-xl border border-border-subtle bg-surface p-4 shadow-xs font-mono text-xs space-y-2 text-text-secondary">
            <div className="text-text-primary font-bold">MyApp/</div>
            <div className="pl-4">├── Backend/</div>
            <div className="pl-8">├── src/</div>
            <div className="pl-12">├── MyApp.Domain/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-text-muted"># Core entities, value objects, exceptions</span></div>
            <div className="pl-12">├── MyApp.Application/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-text-muted"># CQRS commands, queries, MediatR, validators</span></div>
            <div className="pl-12">├── MyApp.Infrastructure/ &nbsp;&nbsp;<span className="text-text-muted"># EF Core / Dapper persistence, migrations, JWT</span></div>
            <div className="pl-12">└── MyApp.API/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-text-muted"># ASP.NET Core controllers, middleware, Program.cs</span></div>
            <div className="pl-4">├── Frontend/</div>
            <div className="pl-8">└── src/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-text-muted"># React (Vite/Next) or Angular SPA client</span></div>
            <div className="pl-4">└── .fullstack-app.json &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-text-muted"># Stack manifest for reproducible generation</span></div>
          </div>
        </section>

        {/* Section 5: Key Principles */}
        <section id="key-benefits" className="mt-10 space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            Key Principles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <div className="flex items-start gap-2.5 rounded-lg border border-border-subtle bg-surface p-3">
              <Code2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <div>
                <div className="font-heading text-xs font-bold text-text-primary">Idiomatic Code</div>
                <div className="text-xs text-text-muted mt-0.5">Follows official Microsoft and React/Angular best practices.</div>
              </div>
            </div>
            <div className="flex items-start gap-2.5 rounded-lg border border-border-subtle bg-surface p-3">
              <ShieldCheck className="h-4 w-4 text-success shrink-0 mt-0.5" />
              <div>
                <div className="font-heading text-xs font-bold text-text-primary">Type Safety</div>
                <div className="text-xs text-text-muted mt-0.5">End-to-end typed contracts from C# DTOs to TypeScript fetchers.</div>
              </div>
            </div>
          </div>
        </section>

        <DocsNextPrevious next={meta.next} />
      </div>

      <DocsToc items={meta.toc} />
    </div>
  );
};
