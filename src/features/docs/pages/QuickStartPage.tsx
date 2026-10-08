import React from "react";
import { DocsPageHeader } from "../components/DocsPageHeader";
import { DocsToc } from "../components/DocsToc";
import { DocsCallout } from "../components/DocsCallout";
import { DocsNextPrevious } from "../components/DocsNextPrevious";
import { DOC_PAGES } from "../docs-data";
import { CodeBlock } from "@/shared/components/ui/CodeBlock";

export const QuickStartPage: React.FC = () => {
  const meta = DOC_PAGES["quick-start"];

  return (
    <div className="flex items-start gap-8 w-full">
      <div className="flex-1 min-w-0">
        <DocsPageHeader
          title={meta.title}
          description={meta.description}
          section={meta.section}
        />

        {/* Section 1: Prerequisites */}
        <section id="prerequisites" className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            Prerequisites
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Ensure your local machine has the following tools installed before getting started:
          </p>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-text-secondary space-y-1.5 font-sans">
            <li><strong>Node.js</strong> &ge; 20.x</li>
            <li><strong>.NET SDK</strong> &ge; 10.0 <em>(for backend Clean Architecture compilation)</em></li>
            <li><strong>Git</strong></li>
          </ul>
        </section>

        {/* Section 2: Step 1 Scaffold */}
        <section id="step-1-scaffold" className="mt-10 space-y-3">
          <h2 className="font-heading text-xl font-bold text-text-primary flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent/10 text-accent font-mono text-xs font-bold">1</span>
            <span>Scaffold a Solution</span>
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Run the Flatron CLI directly using <code className="font-mono text-xs text-accent">npx</code> without prior installation:
          </p>
          <CodeBlock
            code="npx flatron nexus-app"
            language="bash"
            filename="Interactive Wizard"
          />
          <p className="text-xs text-text-muted">
            Or scaffold immediately with recommended production defaults:
          </p>
          <CodeBlock
            code="npx flatron nexus-app --yes"
            language="bash"
            filename="Non-Interactive Defaults"
          />
        </section>

        {/* Section 3: Step 2 Enter Workspace */}
        <section id="step-2-enter-workspace" className="mt-10 space-y-3">
          <h2 className="font-heading text-xl font-bold text-text-primary flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-info/10 text-info font-mono text-xs font-bold">2</span>
            <span>Enter the Project Directory</span>
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Navigate into the generated application workspace:
          </p>
          <CodeBlock
            code="cd nexus-app"
            language="bash"
          />
        </section>

        {/* Section 4: Step 3 Run */}
        <section id="step-3-run-app" className="mt-10 space-y-3">
          <h2 className="font-heading text-xl font-bold text-text-primary flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-success/10 text-success font-mono text-xs font-bold">3</span>
            <span>Run Backend &amp; Frontend</span>
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Launch the ASP.NET Core API backend and the React or Angular frontend client:
          </p>

          <div className="space-y-3">
            <div>
              <span className="text-xs font-semibold text-text-primary font-heading">Backend API:</span>
              <CodeBlock
                code="dotnet run --project Backend/src/nexus-app.API"
                language="bash"
                filename="Backend Terminal"
              />
            </div>

            <div>
              <span className="text-xs font-semibold text-text-primary font-heading">Frontend SPA:</span>
              <CodeBlock
                code="cd Frontend && npm run dev"
                language="bash"
                filename="Frontend Terminal"
              />
            </div>
          </div>

          <DocsCallout type="tip" title="Swagger & Open API">
            By default, Swagger UI is enabled on the backend at <code className="font-mono text-xs text-accent">https://localhost:5001/swagger</code> (or configured local port).
          </DocsCallout>
        </section>

        {/* Section 5: Step 4 Create Feature */}
        <section id="step-4-create-feature" className="mt-10 space-y-3">
          <h2 className="font-heading text-xl font-bold text-text-primary flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent/10 text-accent font-mono text-xs font-bold">4</span>
            <span>Create a Business Domain Feature</span>
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Inside your project root, generate a complete domain entity feature with CQRS commands, MediatR handlers, and data tables:
          </p>
          <CodeBlock
            code="flatron create feature Product"
            language="bash"
            filename="Terminal"
          />
          <p className="text-xs text-text-muted">
            The interactive prompt will guide you through adding fields, validation rules, relationships, and UI dialogs.
          </p>
        </section>

        {/* Section 6: Step 5 Install Module */}
        <section id="step-5-install-module" className="mt-10 space-y-3">
          <h2 className="font-heading text-xl font-bold text-text-primary flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-warning/10 text-warning font-mono text-xs font-bold">5</span>
            <span>Install an Application Module</span>
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Add cross-cutting enterprise capabilities like Authentication or Audit Trail in one command:
          </p>
          <CodeBlock
            code="flatron create module auth"
            language="bash"
            filename="Terminal"
          />
          <DocsCallout type="note" title="Next Steps">
            Explore how the <a href="/docs/stack-builder" className="text-accent underline font-semibold">Stack Builder</a>, <a href="/docs/feature-builder" className="text-accent underline font-semibold">Feature Builder</a>, and <a href="/docs/modules" className="text-accent underline font-semibold">Modules</a> integrate across the development lifecycle.
          </DocsCallout>
        </section>

        <DocsNextPrevious previous={meta.previous} next={meta.next} />
      </div>

      <DocsToc items={meta.toc} />
    </div>
  );
};
