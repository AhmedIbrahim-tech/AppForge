import React from "react";
import { XCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";

export const Comparison: React.FC = () => {
  const comparisonItems = [
    {
      area: "Project Structure & Boundaries",
      manual: "Ad-hoc folder layouts, mixed concerns, inconsistent dependency references across team members.",
      appforge: "Enforced Clean Architecture layers (Domain, Application, Infrastructure, API, Frontend) with strict separation.",
    },
    {
      area: "Backend Architecture & CQRS",
      manual: "Fat controllers directly querying DbContext or inconsistent repository wrappers without unified pipelines.",
      appforge: "Decoupled CQRS pattern using MediatR, fluent pipeline validation, standardized Result pattern, and auditable entities.",
    },
    {
      area: "Frontend Foundation",
      manual: "Manual configuration of Tailwind, Axios interceptors, state management boilerplate, and route guards.",
      appforge: "Pre-wired modern SPA structure with typed API services, state management, Sonner toasts, and theme setup out-of-the-box.",
    },
    {
      area: "Authentication Foundation",
      manual: "Repetitive writing of JWT token generators, refresh token rotations, password hashing, and authorization filters.",
      appforge: "Ready-to-run ASP.NET Core Identity with JWT bearer tokens, claims transformation, and protected client route wrappers.",
    },
    {
      area: "Configuration Consistency",
      manual: "Divergent environment configs, scattered appsettings, no declarative source of truth across services.",
      appforge: "Centralized .fullstack-app.json manifest preserving project choices for consistent ongoing CLI scaffolding.",
    },
    {
      area: "Feature Scaffolding & Evolution",
      manual: "Manually creating 8-12 files per entity across backend layers and frontend pages, leading to copy-paste mistakes.",
      appforge: "Single-command feature scaffolding (create-fullstack-feature) that generates typed entities, CQRS handlers, APIs, and UI views.",
    },
  ];

  return (
    <section id="comparison" className="relative py-20 border-t border-zinc-850 bg-[#0c0d15]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="amber" dot size="md">
            Architectural Comparison
          </Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Manual Setup vs. AppForge
          </h2>
          <p className="mt-3 text-base text-zinc-400">
            Compare the structural realities of starting from scratch versus initializing
            with AppForge's clean architecture foundation.
          </p>
        </div>

        {/* Comparison Table / Cards */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#10121b]/90 shadow-2xl">
          {/* Table Header */}
          <div className="hidden grid-cols-12 border-b border-zinc-800 bg-[#141624] px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-zinc-300 sm:grid">
            <div className="col-span-3 text-zinc-400">Dimension</div>
            <div className="col-span-4 text-red-400/90 flex items-center gap-1.5">
              <XCircle className="h-4 w-4 text-red-400" />
              <span>Manual Boilerplate Setup</span>
            </div>
            <div className="col-span-5 text-indigo-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-indigo-400" />
              <span>With AppForge Architecture</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-zinc-800/80">
            {comparisonItems.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-12 sm:items-center sm:gap-6 hover:bg-[#131522]/50 transition-colors"
              >
                {/* Area title */}
                <div className="sm:col-span-3">
                  <h3 className="font-semibold text-sm text-white sm:text-zinc-200">
                    {item.area}
                  </h3>
                </div>

                {/* Manual Setup Column */}
                <div className="rounded-xl border border-red-950/40 bg-red-950/10 p-3 sm:col-span-4 sm:border-none sm:bg-transparent sm:p-0">
                  <div className="mb-1 text-[11px] font-mono font-bold text-red-400 sm:hidden">
                    Manual Setup:
                  </div>
                  <p className="text-xs leading-relaxed text-zinc-400">
                    {item.manual}
                  </p>
                </div>

                {/* AppForge Column */}
                <div className="rounded-xl border border-indigo-950/40 bg-indigo-950/10 p-3 sm:col-span-5 sm:border-none sm:bg-transparent sm:p-0">
                  <div className="mb-1 text-[11px] font-mono font-bold text-indigo-400 sm:hidden">
                    AppForge:
                  </div>
                  <p className="text-xs leading-relaxed text-zinc-200 font-medium">
                    {item.appforge}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
