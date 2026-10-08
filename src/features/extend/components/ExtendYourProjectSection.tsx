import React from "react";
import { Link } from "react-router-dom";
import {
  PackagePlus,
  Boxes,
  ArrowRight,
  Check,
  Terminal,
} from "lucide-react";

export const ExtendYourProjectSection: React.FC = () => {
  return (
    <section id="extend" className="relative w-full py-16 sm:py-20 border-b border-border-subtle bg-base">
      <div className="app-container">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3 py-1 font-mono text-xs font-medium text-text-secondary shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-accent" />
            <span>Developer Workflow</span>
          </div>
          <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Extend beyond initial scaffolding
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-text-secondary leading-relaxed">
            Flatron stays with you after scaffolding. Generate domain features, CQRS commands, and install pre-tested application modules whenever your application grows.
          </p>
        </div>

        {/* 3-Step Lifecycle */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border-subtle bg-surface p-4 shadow-xs">
            <div className="flex items-center gap-2.5 text-xs font-mono text-text-secondary">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent/10 text-accent font-semibold border border-accent/25">
                1
              </span>
              <span className="font-semibold text-text-primary">Scaffold Solution</span>
            </div>
            <p className="mt-2 text-xs text-text-muted">Initialize full-stack clean architecture</p>
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-[var(--bg-code)] px-3 py-2 font-mono text-xs text-accent-text border border-[var(--bg-code-border)]">
              <Terminal className="h-3.5 w-3.5 text-accent" />
              <span className="text-slate-200">flatron nexus-app</span>
            </div>
          </div>

          <div className="rounded-xl border border-border-subtle bg-surface p-4 shadow-xs">
            <div className="flex items-center gap-2.5 text-xs font-mono text-text-secondary">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-info/10 text-info font-semibold border border-info/25">
                2
              </span>
              <span className="font-semibold text-text-primary">Enter Workspace</span>
            </div>
            <p className="mt-2 text-xs text-text-muted">Navigate into the project directory</p>
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-[var(--bg-code)] px-3 py-2 font-mono text-xs text-accent-text border border-[var(--bg-code-border)]">
              <Terminal className="h-3.5 w-3.5 text-info" />
              <span className="text-slate-200">cd nexus-app</span>
            </div>
          </div>

          <div className="rounded-xl border border-border-subtle bg-surface p-4 shadow-xs">
            <div className="flex items-center gap-2.5 text-xs font-mono text-text-secondary">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-success/10 text-success font-semibold border border-success/25">
                3
              </span>
              <span className="font-semibold text-text-primary">Generate Features</span>
            </div>
            <p className="mt-2 text-xs text-text-muted">Scaffold entities, CRUD, and modules</p>
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-[var(--bg-code)] px-3 py-2 font-mono text-xs text-accent-text border border-[var(--bg-code-border)]">
              <Terminal className="h-3.5 w-3.5 text-success" />
              <span className="text-slate-200">flatron create [feature|module]</span>
            </div>
          </div>
        </div>

        {/* Two Entry Cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card 1: Feature Builder */}
          <div className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-surface p-6 shadow-xs hover:border-border-hover transition-all">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-subtle bg-accent/10 text-accent">
                  <PackagePlus className="h-4 w-4" />
                </div>
                <span className="rounded-md bg-surface-secondary px-2.5 py-1 font-mono text-[11px] text-text-muted border border-border-subtle">
                  CLI Generator
                </span>
              </div>

              <h3 className="mt-4 font-heading text-lg font-bold text-text-primary">
                Business Feature Builder
              </h3>
              <p className="mt-1.5 text-xs text-text-secondary leading-relaxed">
                Define business entities like <strong>Product</strong> or <strong>Order</strong> with typed attributes, validation rules, relationships, enums, and media attachments.
              </p>

              <div className="mt-4 space-y-2.5 text-xs text-text-secondary">
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

            <div className="mt-6 flex items-center justify-between border-t border-border-subtle pt-4">
              <code className="font-mono text-xs text-text-muted">
                flatron create feature &lt;name&gt;
              </code>
              <Link
                to="/features"
                className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-accent-hover transition-all active:scale-[0.985] font-heading"
              >
                <span>Feature Builder</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Module Explorer */}
          <div className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-surface p-6 shadow-xs hover:border-border-hover transition-all">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-subtle bg-info/10 text-info">
                  <Boxes className="h-4 w-4" />
                </div>
                <span className="rounded-md bg-surface-secondary px-2.5 py-1 font-mono text-[11px] text-text-muted border border-border-subtle">
                  8 Modules Ready
                </span>
              </div>

              <h3 className="mt-4 font-heading text-lg font-bold text-text-primary">
                Application Module Explorer
              </h3>
              <p className="mt-1.5 text-xs text-text-secondary leading-relaxed">
                Add cross-cutting enterprise capabilities with pre-wired persistence, security handlers, API endpoints, and admin UI views.
              </p>

              <div className="mt-4 space-y-2.5 text-xs text-text-secondary">
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

            <div className="mt-6 flex items-center justify-between border-t border-border-subtle pt-4">
              <code className="font-mono text-xs text-text-muted">
                flatron create module &lt;name&gt;
              </code>
              <Link
                to="/modules"
                className="flex items-center gap-1.5 rounded-lg bg-surface-secondary px-3.5 py-1.5 text-xs font-semibold text-text-primary border border-border-subtle hover:bg-surface-hover transition-all font-heading shadow-xs"
              >
                <span>Browse Modules</span>
                <ArrowRight className="h-3.5 w-3.5 text-text-muted" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
