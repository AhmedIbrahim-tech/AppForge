import React from "react";
import { DocsPageHeader } from "../components/DocsPageHeader";
import { DocsToc } from "../components/DocsToc";
import { DocsCallout } from "../components/DocsCallout";
import { DocsNextPrevious } from "../components/DocsNextPrevious";
import { DOC_PAGES } from "../docs-data";
import { Check, X, Users, Building, Terminal } from "lucide-react";

export const WhoIsFlatronForPage: React.FC = () => {
  const meta = DOC_PAGES["who-is-flatron-for"];

  return (
    <div className="flex items-start gap-8 w-full">
      <div className="flex-1 min-w-0">
        <DocsPageHeader
          title={meta.title}
          description={meta.description}
          section={meta.section}
        />

        {/* Section 1: Ideal Audiences */}
        <section id="ideal-audiences" className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            Ideal Audiences
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Flatron is crafted specifically for software developers and engineering teams who build and maintain modern web applications with Microsoft .NET:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="rounded-xl border border-border-subtle bg-surface p-5 shadow-xs">
              <div className="flex items-center gap-2 font-heading text-xs font-bold text-text-primary mb-2">
                <Terminal className="h-4 w-4 text-accent" />
                <span>.NET Backend Engineers</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Developers who want clean, modular ASP.NET Core APIs pre-configured with MediatR, FluentValidation, EF Core / Dapper, and JWT auth without spending days assembling boilerplate.
              </p>
            </div>

            <div className="rounded-xl border border-border-subtle bg-surface p-5 shadow-xs">
              <div className="flex items-center gap-2 font-heading text-xs font-bold text-text-primary mb-2">
                <Users className="h-4 w-4 text-info" />
                <span>Full-Stack Teams (.NET + React/Angular)</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Teams that need a synchronized workspace connecting modern SPA frontend clients (Zustand/NgRx, Tailwind, React Hook Form) to robust .NET backends.
              </p>
            </div>

            <div className="rounded-xl border border-border-subtle bg-surface p-5 shadow-xs">
              <div className="flex items-center gap-2 font-heading text-xs font-bold text-text-primary mb-2">
                <Building className="h-4 w-4 text-success" />
                <span>Enterprise Architects &amp; Tech Leads</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Leads seeking a standardized, reproducible starter template and CLI toolchain that enforces consistent Clean Architecture conventions across multiple projects.
              </p>
            </div>

            <div className="rounded-xl border border-border-subtle bg-surface p-5 shadow-xs">
              <div className="flex items-center gap-2 font-heading text-xs font-bold text-text-primary mb-2">
                <Users className="h-4 w-4 text-warning" />
                <span>Rapid Prototypers &amp; Consultants</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Engineers who frequently spin up client MVPs or internal tools and need fast scaffolding of business entities, CRUD forms, and authentication.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Target Use Cases */}
        <section id="target-scenarios" className="mt-10 space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            Target Use Cases
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-xl border border-border-subtle bg-surface p-4">
              <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-text-secondary">
                <strong className="text-text-primary font-heading font-semibold">Greenfield Enterprise Applications:</strong> When kicking off a new line-of-business application that requires enterprise patterns (CQRS, logging, security, audit logging).
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border-subtle bg-surface p-4">
              <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-text-secondary">
                <strong className="text-text-primary font-heading font-semibold">Entity-Heavy CRUD &amp; Workflow Systems:</strong> Applications with dozens of business models (e.g. Products, Orders, Invoices) that benefit from automated generator commands.
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border-subtle bg-surface p-4">
              <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-text-secondary">
                <strong className="text-text-primary font-heading font-semibold">Team Solution Standardization:</strong> Preventing every developer from inventing their own folder structure, MediatR pipeline setup, or DTO mapping strategy.
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: When NOT to Use Flatron */}
        <section id="who-it-is-not-for" className="mt-10 space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            When Not to Use Flatron
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Flatron intentionally focuses on being the best toolchain for .NET 10 and SPA architectures. It is <strong>not</strong> the right fit for:
          </p>

          <div className="rounded-xl border border-danger/30 bg-danger/5 p-5 space-y-3 text-xs text-text-secondary">
            <div className="flex items-start gap-2.5">
              <X className="h-4 w-4 text-danger shrink-0 mt-0.5" />
              <span><strong>Non-.NET Backends:</strong> Projects using Python/Django, Node.js/Express, Go, or Java Spring.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <X className="h-4 w-4 text-danger shrink-0 mt-0.5" />
              <span><strong>Simple Static Websites:</strong> Landing pages or blogs that only need HTML or static site generators.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <X className="h-4 w-4 text-danger shrink-0 mt-0.5" />
              <span><strong>No-Code / Low-Code Seekers:</strong> Flatron outputs real code for software developers; it is not a drag-and-drop runtime app builder.</span>
            </div>
          </div>

          <DocsCallout type="tip" title="Honest Engineering">
            Flatron is designed by developers for developers who want deep control of their C# and TypeScript codebases with zero magic.
          </DocsCallout>
        </section>

        <DocsNextPrevious previous={meta.previous} next={meta.next} />
      </div>

      <DocsToc items={meta.toc} />
    </div>
  );
};
