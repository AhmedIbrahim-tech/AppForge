import React from "react";
import { Link } from "react-router-dom";
import { DocsPageHeader } from "../components/DocsPageHeader";
import { DocsCard } from "../components/DocsCard";
import { DocsCallout } from "../components/DocsCallout";
import {
  Sliders,
  Workflow,
  Boxes,
  Zap,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

export const DocsHomePage: React.FC = () => {
  return (
    <div className="w-full">
      <DocsPageHeader
        title="Flatron Documentation"
        description="Learn how to scaffold production-ready .NET 10 architectures, generate CQRS domain features, and install pre-tested application modules."
        section="Getting Started"
      />

      {/* Quick Summary Callout */}
      <DocsCallout type="note" title="Core Philosophy">
        Flatron is a <strong>CLI-first scaffolding toolkit</strong> paired with an interactive visual configuration platform. It generates standard native C# and TypeScript source code directly in your solution with <strong>zero runtime lock-in</strong>.
      </DocsCallout>

      {/* 4 Core Entry Cards */}
      <h2 className="font-heading text-lg font-bold text-text-primary mt-8 mb-4">
        Start Here
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DocsCard
          title="Quick Start Guide"
          description="Create your first solution in under 5 minutes with npx flatron."
          href="/docs/quick-start"
          icon={<Zap className="h-4 w-4 text-warning" />}
          badge="5 min"
        />
        <DocsCard
          title="Stack Builder"
          description="Configure backend architecture, ORMs, databases, and frontend tooling."
          href="/docs/stack-builder"
          icon={<Sliders className="h-4 w-4 text-accent" />}
          badge="Configurator"
        />
        <DocsCard
          title="Feature Builder"
          description="Scaffold CQRS commands, validation, fields, and entity data tables."
          href="/docs/feature-builder"
          icon={<Workflow className="h-4 w-4 text-success" />}
          badge="Domain Model"
        />
        <DocsCard
          title="Application Modules"
          description="Install cross-cutting capabilities like Auth, Audit Trail, and Permissions."
          href="/docs/modules"
          icon={<Boxes className="h-4 w-4 text-info" />}
          badge="8 Modules"
        />
      </div>

      {/* The 4-Step Lifecycle Flow */}
      <h2 className="font-heading text-lg font-bold text-text-primary mt-10 mb-4">
        The Flatron Workflow
      </h2>
      <div className="rounded-2xl border border-border-subtle bg-surface p-6 shadow-xs space-y-4">
        <div className="flex items-start gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent/10 text-accent font-mono text-xs font-bold shrink-0">
            1
          </span>
          <div>
            <div className="font-heading text-xs sm:text-sm font-semibold text-text-primary">
              Blueprint &amp; Validate Topology
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Use the visual Stack Builder to test compatibility constraints (e.g., ORM + Auth + Presentation rules) and produce a verified CLI command.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-info/10 text-info font-mono text-xs font-bold shrink-0">
            2
          </span>
          <div>
            <div className="font-heading text-xs sm:text-sm font-semibold text-text-primary">
              CLI Scaffolding
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Run <code className="font-mono text-xs text-accent">npx flatron nexus-app</code> to generate clean domain, application, infrastructure, and presentation project layers.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-success/10 text-success font-mono text-xs font-bold shrink-0">
            3
          </span>
          <div>
            <div className="font-heading text-xs sm:text-sm font-semibold text-text-primary">
              Domain Features
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Scaffold business entities (Products, Orders, Customers) with C# MediatR handlers, validation rules, and React/Angular views via <code className="font-mono text-xs text-accent">flatron create feature</code>.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-warning/10 text-warning font-mono text-xs font-bold shrink-0">
            4
          </span>
          <div>
            <div className="font-heading text-xs sm:text-sm font-semibold text-text-primary">
              Reusable Modules
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Install ready-to-run enterprise modules (Authentication, Permissions, Audit Trail, Localization) via <code className="font-mono text-xs text-accent">flatron create module</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Critical Architecture Callout */}
      <div className="mt-8 rounded-2xl border border-accent/20 bg-accent/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-heading text-sm font-bold text-text-primary">
            <HelpCircle className="h-4 w-4 text-accent" />
            <span>Unsure whether to build a Feature or install a Module?</span>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Read our dedicated guide explaining the core mental distinction and decision criteria.
          </p>
        </div>
        <Link
          to="/docs/feature-vs-module"
          className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-accent-hover transition-all shrink-0 font-heading"
        >
          <span>Feature vs Module</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};
