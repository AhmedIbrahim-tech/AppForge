import React from "react";
import { DocsPageHeader } from "../components/DocsPageHeader";
import { DocsToc } from "../components/DocsToc";
import { DocsCallout } from "../components/DocsCallout";
import { DocsNextPrevious } from "../components/DocsNextPrevious";
import { DOC_PAGES } from "../docs-data";
import { ShieldAlert, FileCode2, Terminal, FolderTree } from "lucide-react";

export const StackBuilderDocPage: React.FC = () => {
  const meta = DOC_PAGES["stack-builder"];

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
            The <strong>Stack Builder</strong> is Flatron's visual architecture configurator. It allows you to design your application's technical topology in your browser, test compatibility rules in real-time, inspect the resulting directory tree, and export a reproducible CLI command.
          </p>
        </section>

        {/* Section 2: Project Scope & Presentation */}
        <section id="project-scope" className="mt-10 space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            Project Scope &amp; Presentation Rules
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Flatron supports three project scopes with specific presentation constraints:
          </p>

          <div className="overflow-x-auto rounded-xl border border-border-subtle bg-surface shadow-xs mt-3">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border-subtle bg-surface-secondary text-text-muted font-mono uppercase tracking-wider">
                <tr>
                  <th className="p-3">Project Scope</th>
                  <th className="p-3">Allowed Presentation Models</th>
                  <th className="p-3">Target Clients</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle text-text-secondary">
                <tr>
                  <td className="p-3 font-semibold text-text-primary font-heading">Full Stack</td>
                  <td className="p-3 font-mono text-accent font-medium">Controllers, Minimal API</td>
                  <td className="p-3">React (Vite / Next.js) or Angular</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-text-primary font-heading">Backend Only</td>
                  <td className="p-3 font-mono text-text-primary">Controllers, Minimal API, MVC, Razor Pages</td>
                  <td className="p-3">Standalone Web API or Server-Rendered</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-text-primary font-heading">Frontend Only</td>
                  <td className="p-3 text-text-muted">N/A (Client-only)</td>
                  <td className="p-3">React or Angular Web Client</td>
                </tr>
              </tbody>
            </table>
          </div>

          <DocsCallout type="warning" title="Presentation Constraint in Full Stack Mode">
            In <strong>Full Stack</strong> mode, MVC and Razor Pages are not supported because Full Stack solutions pair an API backend with separate React or Angular single-page applications. Server-rendered MVC and Razor Pages are available in <strong>Backend Only</strong> mode.
          </DocsCallout>
        </section>

        {/* Section 3: Backend Options */}
        <section id="backend-options" className="mt-10 space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            Backend Architecture &amp; Data Options
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-border-subtle bg-surface p-3.5">
              <div className="font-heading font-bold text-text-primary mb-1">Architecture</div>
              <div className="text-text-muted">Clean Architecture (MediatR CQRS) or Vertical Slices.</div>
            </div>
            <div className="rounded-xl border border-border-subtle bg-surface p-3.5">
              <div className="font-heading font-bold text-text-primary mb-1">ORM / Data Access</div>
              <div className="text-text-muted">EF Core, Dapper, or EF Core + Dapper (Hybrid).</div>
            </div>
            <div className="rounded-xl border border-border-subtle bg-surface p-3.5">
              <div className="font-heading font-bold text-text-primary mb-1">Database Engine</div>
              <div className="text-text-muted">PostgreSQL, Microsoft SQL Server, or SQLite.</div>
            </div>
            <div className="rounded-xl border border-border-subtle bg-surface p-3.5">
              <div className="font-heading font-bold text-text-primary mb-1">Authentication</div>
              <div className="text-text-muted">ASP.NET Identity + JWT Bearer, Cookies, or None.</div>
            </div>
          </div>
        </section>

        {/* Section 4: Frontend Options */}
        <section id="frontend-options" className="mt-10 space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            Frontend Frameworks &amp; Tooling
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            When configuring the frontend, Flatron automatically adjusts supported state managers, HTTP clients, form libraries, and UI component kits:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="rounded-xl border border-border-subtle bg-surface p-4">
              <div className="font-heading text-xs font-bold text-text-primary mb-2">React Ecosystem</div>
              <ul className="space-y-1.5 text-xs text-text-secondary font-mono">
                <li>• Tooling: Vite, Next.js</li>
                <li>• State: Zustand, Redux Toolkit, None</li>
                <li>• Forms: React Hook Form + Zod</li>
                <li>• UI: shadcn/ui, Material UI, Ant Design</li>
                <li>• Styling: Tailwind CSS, Bootstrap</li>
              </ul>
            </div>

            <div className="rounded-xl border border-border-subtle bg-surface p-4">
              <div className="font-heading text-xs font-bold text-text-primary mb-2">Angular Ecosystem</div>
              <ul className="space-y-1.5 text-xs text-text-secondary font-mono">
                <li>• Tooling: Angular CLI</li>
                <li>• State: NgRx, None</li>
                <li>• Forms: Angular Reactive Forms</li>
                <li>• UI: Angular Material, Ant Design Angular</li>
                <li>• Styling: Tailwind CSS, Bootstrap</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Compatibility Rules */}
        <section id="compatibility-rules" className="mt-10 space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            Compatibility Constraints
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            The Stack Builder validates every change against verified production rules:
          </p>

          <div className="space-y-2.5 text-xs text-text-secondary">
            <div className="flex items-start gap-2 rounded-lg border border-border-subtle bg-surface p-3">
              <ShieldAlert className="h-4 w-4 text-warning shrink-0 mt-0.5" />
              <span><strong>Identity requires EF Core:</strong> ASP.NET Core Identity store requires EF Core. If Dapper is selected, use <em>EF Core + Dapper (Hybrid)</em> or select <em>None</em> for auth.</span>
            </div>
            <div className="flex items-start gap-2 rounded-lg border border-border-subtle bg-surface p-3">
              <ShieldAlert className="h-4 w-4 text-warning shrink-0 mt-0.5" />
              <span><strong>MVC / Razor Pages with Cookies:</strong> Server-rendered apps require Cookie authentication rather than JWT Bearer tokens.</span>
            </div>
          </div>
        </section>

        {/* Section 6: Builder Outputs */}
        <section id="builder-outputs" className="mt-10 space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            Builder Outputs
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            The live inspector provides three real-time outputs:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded-xl border border-border-subtle bg-surface p-3.5 text-center">
              <FolderTree className="h-5 w-5 text-accent mx-auto mb-1.5" />
              <span className="font-heading font-bold text-text-primary block">Architecture Tree</span>
              <span className="text-[11px] text-text-muted">Live filesystem preview of projects and files.</span>
            </div>
            <div className="rounded-xl border border-border-subtle bg-surface p-3.5 text-center">
              <FileCode2 className="h-5 w-5 text-info mx-auto mb-1.5" />
              <span className="font-heading font-bold text-text-primary block">Stack Manifest</span>
              <span className="text-[11px] text-text-muted">Complete JSON blueprint configuration.</span>
            </div>
            <div className="rounded-xl border border-border-subtle bg-surface p-3.5 text-center">
              <Terminal className="h-5 w-5 text-success mx-auto mb-1.5" />
              <span className="font-heading font-bold text-text-primary block">CLI Command</span>
              <span className="text-[11px] text-text-muted">Exact flags ready to copy and run.</span>
            </div>
          </div>
        </section>

        <DocsNextPrevious previous={meta.previous} next={meta.next} />
      </div>

      <DocsToc items={meta.toc} />
    </div>
  );
};
