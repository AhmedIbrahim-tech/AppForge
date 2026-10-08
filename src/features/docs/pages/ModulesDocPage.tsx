import React from "react";
import { DocsPageHeader } from "../components/DocsPageHeader";
import { DocsToc } from "../components/DocsToc";
import { DocsCallout } from "../components/DocsCallout";
import { DocsNextPrevious } from "../components/DocsNextPrevious";
import { DOC_PAGES } from "../docs-data";
import { CodeBlock } from "@/shared/components/ui/CodeBlock";
import { CLI_MODULES } from "@/features/modules/modules-data";
import { Boxes, ShieldCheck, Users, Lock, History, Bell, Globe, FileEdit, LayoutDashboard } from "lucide-react";

export const ModulesDocPage: React.FC = () => {
  const meta = DOC_PAGES["modules"];
  const modules = Object.values(CLI_MODULES);

  const getModuleIcon = (id: string) => {
    switch (id) {
      case "auth": return <ShieldCheck className="h-4 w-4 text-accent" />;
      case "users": return <Users className="h-4 w-4 text-info" />;
      case "permissions": return <Lock className="h-4 w-4 text-success" />;
      case "audit": return <History className="h-4 w-4 text-warning" />;
      case "notifications": return <Bell className="h-4 w-4 text-accent" />;
      case "localization": return <Globe className="h-4 w-4 text-info" />;
      case "rich-text": return <FileEdit className="h-4 w-4 text-success" />;
      case "dashboard": return <LayoutDashboard className="h-4 w-4 text-warning" />;
      default: return <Boxes className="h-4 w-4 text-accent" />;
    }
  };

  return (
    <div className="flex items-start gap-8 w-full">
      <div className="flex-1 min-w-0">
        <DocsPageHeader
          title={meta.title}
          description={meta.description}
          section={meta.section}
        />

        {/* Section 1: What is a Module? */}
        <section id="what-is-a-feature" className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            What is a Module?
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            An <strong>Application Module</strong> is a self-contained, cross-cutting enterprise capability that can be installed into any Flatron project. Unlike domain features that model a specific entity (like <em>Product</em>), modules provide shared horizontal infrastructure used across the entire application.
          </p>
        </section>

        {/* Section 2: The 8 Available Modules */}
        <section id="the-8-available-modules" className="mt-10 space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            The 8 Available Modules
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className="rounded-xl border border-border-subtle bg-surface p-4 shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-secondary border border-border-subtle">
                      {getModuleIcon(mod.id)}
                    </div>
                    <span className="font-heading text-xs font-bold text-text-primary">
                      {mod.name}
                    </span>
                  </div>
                  <code className="rounded bg-surface-secondary px-2 py-0.5 font-mono text-[10px] text-accent border border-border-subtle">
                    {mod.id}
                  </code>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed mb-3">
                  {mod.description}
                </p>

                <div className="border-t border-border-subtle pt-2.5 space-y-1 text-[11px] text-text-muted">
                  {mod.requires.length > 0 && (
                    <div className="font-mono text-[10px]">
                      <span className="text-text-secondary font-semibold">Requires:</span>{" "}
                      <span className="text-info">{mod.requires.join(", ")}</span>
                    </div>
                  )}
                  <div>
                    <span className="font-semibold text-text-secondary">Category:</span> {mod.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Dependencies & Requirements */}
        <section id="module-dependencies" className="mt-10 space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            Module Dependencies &amp; Prerequisites
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Some modules build on existing capabilities:
          </p>
          <ul className="list-disc pl-5 text-xs text-text-secondary space-y-1 font-sans">
            <li><strong>User Management (<code className="font-mono text-accent">users</code>)</strong>: Requires the <code className="font-mono text-accent">auth</code> module.</li>
            <li><strong>Permissions (<code className="font-mono text-accent">permissions</code>)</strong>: Requires the <code className="font-mono text-accent">auth</code> module.</li>
            <li><strong>Notifications (<code className="font-mono text-accent">notifications</code>)</strong>: Requires the <code className="font-mono text-accent">auth</code> module for recipient user assignment.</li>
          </ul>
        </section>

        {/* Section 4: Installing Modules */}
        <section id="installing-modules" className="mt-10 space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            Installing Modules via CLI
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Inside your project root, install any module with a single command:
          </p>

          <CodeBlock
            code={`# Install Authentication
flatron create module auth

# Install Audit Trail
flatron create module audit

# Interactive module selection list
flatron create module`}
            language="bash"
            filename="Terminal"
          />

          <DocsCallout type="tip" title="Automatic Integration">
            Installing a module automatically updates your DbContext entity registrations, MediatR pipeline behaviors, and frontend route declarations.
          </DocsCallout>
        </section>

        <DocsNextPrevious previous={meta.previous} next={meta.next} />
      </div>

      <DocsToc items={meta.toc} />
    </div>
  );
};
