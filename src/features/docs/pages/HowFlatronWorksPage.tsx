import React from "react";
import { DocsPageHeader } from "../components/DocsPageHeader";
import { DocsToc } from "../components/DocsToc";
import { DocsCallout } from "../components/DocsCallout";
import { DocsNextPrevious } from "../components/DocsNextPrevious";
import { DOC_PAGES } from "../docs-data";
import { CodeBlock } from "@/shared/components/ui/CodeBlock";
import { Sliders, Terminal, Workflow, Boxes, ArrowDown } from "lucide-react";

export const HowFlatronWorksPage: React.FC = () => {
  const meta = DOC_PAGES["how-flatron-works"];

  return (
    <div className="flex items-start gap-8 w-full">
      <div className="flex-1 min-w-0">
        <DocsPageHeader
          title={meta.title}
          description={meta.description}
          section={meta.section}
        />

        {/* Section 1: Mental Model */}
        <section id="mental-model" className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            The Flatron Mental Model
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Flatron is designed around a progressive, continuous development flow. Unlike traditional template generators that abandon you after initial scaffolding, Flatron stays with your project as it evolves:
          </p>

          {/* Visual Lightweight Flow Timeline */}
          <div className="my-6 rounded-2xl border border-border-subtle bg-surface p-6 shadow-card space-y-3">
            {/* Step 1 */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent border border-accent/25">
                <Sliders className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="font-heading text-xs sm:text-sm font-bold text-text-primary">
                  1. Stack Builder (Visual Topology)
                </div>
                <div className="text-xs text-text-muted">
                  Configure architecture, database, ORM, and frontend tooling with real-time constraint validation.
                </div>
              </div>
            </div>

            <div className="pl-4 text-text-muted">
              <ArrowDown className="h-4 w-4 text-accent" />
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-info/10 text-info border border-info/25">
                <Terminal className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="font-heading text-xs sm:text-sm font-bold text-text-primary">
                  2. Flatron CLI Execution
                </div>
                <div className="text-xs text-text-muted">
                  Scaffolds Clean Architecture solution files and writes the declarative <code className="font-mono text-xs text-accent">.fullstack-app.json</code> manifest.
                </div>
              </div>
            </div>

            <div className="pl-4 text-text-muted">
              <ArrowDown className="h-4 w-4 text-info" />
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-success/10 text-success border border-success/25">
                <Workflow className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="font-heading text-xs sm:text-sm font-bold text-text-primary">
                  3. Feature Builder (Domain Models)
                </div>
                <div className="text-xs text-text-muted">
                  Generate business entities (Products, Orders) with MediatR CQRS handlers, validation, and UI tables.
                </div>
              </div>
            </div>

            <div className="pl-4 text-text-muted">
              <ArrowDown className="h-4 w-4 text-success" />
            </div>

            {/* Step 4 */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-warning/10 text-warning border border-warning/25">
                <Boxes className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="font-heading text-xs sm:text-sm font-bold text-text-primary">
                  4. Module Explorer (Horizontal Capabilities)
                </div>
                <div className="text-xs text-text-muted">
                  Install pre-wired enterprise modules like Authentication, Audit Trail, and Permissions whenever required.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Execution Lifecycle */}
        <section id="execution-lifecycle" className="mt-10 space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            The 3-Stage Lifecycle
          </h2>
          <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
            <div className="rounded-xl border border-border-subtle bg-surface p-4">
              <h3 className="font-heading text-xs sm:text-sm font-bold text-text-primary mb-1">
                Stage 1: Solution Topology Scaffolding
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Initial creation sets up the multi-project .NET solution (<code className="font-mono text-xs">Domain</code>, <code className="font-mono text-xs">Application</code>, <code className="font-mono text-xs">Infrastructure</code>, <code className="font-mono text-xs">API</code>) and the frontend SPA workspace. Project references, dependency injection extensions, and database context base classes are immediately compiled.
              </p>
            </div>

            <div className="rounded-xl border border-border-subtle bg-surface p-4">
              <h3 className="font-heading text-xs sm:text-sm font-bold text-text-primary mb-1">
                Stage 2: Continuous Feature Growth
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                As your team receives business requirements for new entities, you invoke <code className="font-mono text-xs text-accent">flatron create feature &lt;Name&gt;</code>. Flatron places domain entities into the Domain layer, CQRS commands/queries into Application, EF Core entity type configurations into Infrastructure, and React/Angular components into Frontend.
              </p>
            </div>

            <div className="rounded-xl border border-border-subtle bg-surface p-4">
              <h3 className="font-heading text-xs sm:text-sm font-bold text-text-primary mb-1">
                Stage 3: Cross-Cutting Capability Modules
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                When your app needs security, audit trails, or notifications, you don't hand-craft JWT middleware or DB change interceptors from scratch. You install verified modules via <code className="font-mono text-xs text-accent">flatron create module &lt;name&gt;</code>.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Manifest System */}
        <section id="manifest-system" className="mt-10 space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            Stack Manifest (<code className="font-mono text-base text-accent">.fullstack-app.json</code>)
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Flatron saves your stack configuration inside the generated project as a declarative JSON manifest. This allows future CLI commands (such as feature generation) to read your project's chosen ORM, frontend framework, and architectural patterns:
          </p>

          <CodeBlock
            code={`{
  "name": "nexus-app",
  "projectType": "fullstack",
  "backend": {
    "presentation": "Controllers",
    "architecture": "Clean Architecture",
    "orm": "EF Core",
    "database": "PostgreSQL",
    "auth": "Identity + JWT",
    "mapping": "AutoMapper",
    "logging": "Serilog",
    "swagger": true
  },
  "frontend": {
    "framework": "React",
    "tooling": "Vite",
    "styling": "Tailwind CSS",
    "state": "Zustand",
    "httpClient": "Axios",
    "forms": "React Hook Form + Zod",
    "ui": "shadcn/ui"
  }
}`}
            language="json"
            filename=".fullstack-app.json"
          />
        </section>

        {/* Section 4: Progressive Expansion */}
        <section id="progressive-expansion" className="mt-10 space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            Progressive Expansion
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Because Flatron generates clean, readable code with explicit project boundaries, you can edit, refactor, or delete any generated file without breaking future CLI commands. Flatron respects your existing code.
          </p>

          <DocsCallout type="note" title="Zero Magic">
            All generated MediatR handlers, DbContext configurations, and frontend views use standard, idiomatic code patterns you already know.
          </DocsCallout>
        </section>

        <DocsNextPrevious previous={meta.previous} next={meta.next} />
      </div>

      <DocsToc items={meta.toc} />
    </div>
  );
};
