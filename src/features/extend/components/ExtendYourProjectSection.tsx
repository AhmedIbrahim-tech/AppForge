import React from "react";
import { Link } from "react-router-dom";
import {
  PackagePlus,
  Boxes,
  ArrowRight,
  Check,
} from "lucide-react";

export const ExtendYourProjectSection: React.FC = () => {
  return (
    <section id="extend" className="relative w-full py-16 sm:py-20 border-b border-border-line bg-base">
      <div className="app-container">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-medium text-text-secondary">
            <span className="flex h-2 w-2 rounded-full bg-accent" />
            <span>Developer workflow</span>
          </div>
          <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Extend beyond initial scaffolding
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-text-secondary leading-relaxed">
            Flatron stays in your repository. After generating your base stack, scaffold domain business features and install modular capabilities on demand.
          </p>
        </div>

        {/* 3-Step Lifecycle */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-[8px] border border-border-subtle bg-surface p-4">
            <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-surface-raised text-white font-semibold">1</span>
              <span>Scaffold Solution</span>
            </div>
            <p className="mt-2 text-xs text-text-muted">Initialize clean architecture stack</p>
            <div className="mt-2.5 rounded-[5px] bg-base px-2.5 py-1.5 font-mono text-xs text-accent-hover border border-border-subtle">
              flatron nexus-app
            </div>
          </div>

          <div className="rounded-[8px] border border-border-subtle bg-surface p-4">
            <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-surface-raised text-white font-semibold">2</span>
              <span>Enter Workspace</span>
            </div>
            <p className="mt-2 text-xs text-text-muted">Navigate into project directory</p>
            <div className="mt-2.5 rounded-[5px] bg-base px-2.5 py-1.5 font-mono text-xs text-accent-hover border border-border-subtle">
              cd nexus-app
            </div>
          </div>


          <div className="rounded-[8px] border border-border-subtle bg-surface p-4">
            <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-surface-raised text-white font-semibold">3</span>
              <span>Generate Features</span>
            </div>
            <p className="mt-2 text-xs text-text-muted">Add entities, CRUD, and modules</p>
            <div className="mt-2.5 rounded-[5px] bg-base px-2.5 py-1.5 font-mono text-xs text-accent-hover border border-border-subtle">
              flatron create [feature|module]
            </div>
          </div>
        </div>

        {/* Two Entry Cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card 1: Feature Builder */}
          <div className="flex flex-col justify-between rounded-[8px] border border-border-subtle bg-surface p-5 sm:p-6 hover:border-zinc-700 transition-colors">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-border-subtle bg-surface-secondary text-accent">
                  <PackagePlus className="h-4 w-4" />
                </div>
                <span className="rounded bg-surface-secondary px-2 py-0.5 font-mono text-[11px] text-text-muted border border-border-subtle">
                  CLI Generator
                </span>
              </div>

              <h3 className="mt-4 font-heading text-base font-semibold text-white">
                Business Feature Builder
              </h3>
              <p className="mt-1.5 text-xs text-text-secondary leading-relaxed">
                Define business entities like <strong>Product</strong> or <strong>Order</strong> with typed attributes, validation rules, relationships, enums, and media attachments.
              </p>

              <div className="mt-4 space-y-2 text-xs text-text-secondary">
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-success shrink-0" />
                  <span>C# Domain Entities, Repositories, &amp; CQRS Handlers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-success shrink-0" />
                  <span>React / Angular Data Tables, Forms &amp; Dialogs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-success shrink-0" />
                  <span>FluentValidation and Zod schemas</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border-line pt-4">
              <code className="font-mono text-xs text-text-muted">
                flatron create feature &lt;name&gt;
              </code>
              <Link
                to="/features"
                className="flex items-center gap-1.5 rounded-[6px] bg-surface-secondary px-3 py-1.5 text-xs font-medium text-white border border-border-subtle hover:bg-surface-raised hover:border-zinc-700 transition-colors font-heading"
              >
                <span>Feature Builder</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Module Explorer */}
          <div className="flex flex-col justify-between rounded-[8px] border border-border-subtle bg-surface p-5 sm:p-6 hover:border-zinc-700 transition-colors">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-border-subtle bg-surface-secondary text-accent">
                  <Boxes className="h-4 w-4" />
                </div>
                <span className="rounded bg-surface-secondary px-2 py-0.5 font-mono text-[11px] text-text-muted border border-border-subtle">
                  8 Modules Ready
                </span>
              </div>

              <h3 className="mt-4 font-heading text-base font-semibold text-white">
                Application Module Explorer
              </h3>
              <p className="mt-1.5 text-xs text-text-secondary leading-relaxed">
                Add cross-cutting enterprise capabilities with pre-wired persistence, security handlers, API endpoints, and admin UI views.
              </p>

              <div className="mt-4 space-y-2 text-xs text-text-secondary">
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-success shrink-0" />
                  <span>Authentication, User Management, &amp; Permissions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-success shrink-0" />
                  <span>Audit Trail with Entity Change Redaction</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-success shrink-0" />
                  <span>Notifications, Domain Localization, &amp; Rich Text</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border-line pt-4">
              <code className="font-mono text-xs text-text-muted">
                flatron create module &lt;name&gt;
              </code>
              <Link
                to="/modules"
                className="flex items-center gap-1.5 rounded-[6px] bg-surface-secondary px-3 py-1.5 text-xs font-medium text-white border border-border-subtle hover:bg-surface-raised hover:border-zinc-700 transition-colors font-heading"
              >
                <span>Browse Modules</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

