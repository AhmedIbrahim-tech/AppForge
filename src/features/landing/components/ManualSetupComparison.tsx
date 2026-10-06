import React from "react";
import { Check, X, Sparkles, Terminal, Layers } from "lucide-react";

interface ComparisonRow {
  feature: string;
  category: string;
  manual: string;
  flatron: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    category: "Scaffolding",
    feature: "Project Creation",
    manual: "Multiple separate CLI commands & manual folder assembly",
    flatron: "One-command unified generation (npx flatron MyApp)",
  },
  {
    category: "Architecture",
    feature: "Clean Architecture Setup",
    manual: "Manual project references, layer boundaries & dependency setup",
    flatron: "Domain, Application, Infrastructure & API pre-wired",
  },
  {
    category: "Architecture",
    feature: "CQRS / Modular Services",
    manual: "Manual MediatR pipeline behaviors & DI container plumbing",
    flatron: "Automated CQRS Features or Modular Application Services",
  },
  {
    category: "Data Access",
    feature: "ORM & Persistence",
    manual: "Manual DbContext, Dapper factories & custom SQL queries",
    flatron: "EF Core, Dapper, or EF Core + Dapper (Hybrid)",
  },
  {
    category: "Data Access",
    feature: "Database Engine",
    manual: "Manual driver packages & connection string wiring",
    flatron: "PostgreSQL, SQL Server, or SQLite ready-to-run",
  },
  {
    category: "Security",
    feature: "Authentication & Identity",
    manual: "Complex ASP.NET Identity setup & JWT middleware plumbing",
    flatron: "Pre-configured ASP.NET Identity, JWT Bearer or Cookies",
  },
  {
    category: "Frontend",
    feature: "Frontend Stack Integration",
    manual: "Separate SPA setup, manual Tailwind CSS & state store wiring",
    flatron: "React (Vite/Next.js) or Angular with Tailwind & state stores",
  },
  {
    category: "Frontend",
    feature: "UI Components & HTTP Client",
    manual: "Manual component library config & API fetcher setup",
    flatron: "shadcn/ui, MUI, Angular Material & Axios/Fetch configured",
  },
  {
    category: "Extensions",
    feature: "Real-Time & Background Jobs",
    manual: "Manual SignalR Hubs & Hangfire storage setup",
    flatron: "Optional SignalR WebSockets & Hangfire jobs out-of-the-box",
  },
  {
    category: "Workflow",
    feature: "Reproducible Stack Manifest",
    manual: "No declarative schema for team reproducibility",
    flatron: "Declarative .fullstack-app.json manifest file",
  },
];

export const ManualSetupComparison: React.FC = () => {
  return (
    <section
      id="comparison"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#070910] py-20 sm:py-28"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.12),transparent_70%)]" />

      <div className="relative mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-medium text-indigo-300 backdrop-blur-sm mb-4">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>Why Flatron</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Manual Setup vs Flatron
          </h2>
          <p className="mt-3.5 text-base leading-relaxed text-zinc-400">
            Compare manually assembling a production-grade Full Stack architecture versus generating a cohesive, validated solution with Flatron.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-[#0c0e18]/95 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          {/* Table Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/10 bg-[#101322] px-5 py-4 text-xs font-semibold text-zinc-400 sm:px-6">
            <div className="hidden md:block md:col-span-3 font-mono uppercase tracking-wider text-[11px] text-zinc-400">
              Capability
            </div>
            <div className="hidden md:flex md:col-span-4 items-center gap-2 font-mono uppercase tracking-wider text-[11px] text-zinc-400">
              <Layers className="h-3.5 w-3.5 text-zinc-500" />
              <span>Manual Assembly</span>
            </div>
            <div className="hidden md:flex md:col-span-5 items-center gap-2 font-mono uppercase tracking-wider text-[11px] text-cyan-300 bg-cyan-500/10 -my-4 -mr-6 py-4 px-6 border-l border-cyan-500/20">
              <Terminal className="h-3.5 w-3.5 text-cyan-400" />
              <span>Flatron CLI</span>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/[0.06]">
            {COMPARISON_ROWS.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 px-5 py-4 text-xs transition-colors duration-150 hover:bg-white/[0.02] sm:gap-4 sm:px-6 sm:py-4.5"
              >
                {/* Column 1: Feature & Category */}
                <div className="md:col-span-3 pr-2">
                  <div className="font-semibold text-zinc-100 text-[13px] tracking-tight">
                    {row.feature}
                  </div>
                  <span className="mt-1 inline-block rounded border border-white/6 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
                    {row.category}
                  </span>
                </div>

                {/* Column 2: Manual Setup */}
                <div className="md:col-span-4 flex items-start gap-2.5 text-zinc-400">
                  <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 text-red-400/90">
                    <X className="h-3 w-3" />
                  </span>
                  <span className="text-xs leading-relaxed text-zinc-400">
                    {row.manual}
                  </span>
                </div>

                {/* Column 3: Flatron CLI */}
                <div className="md:col-span-5 flex items-start gap-2.5 md:bg-cyan-500/[0.02] md:-my-4.5 md:-mr-6 md:py-4.5 md:px-6 md:border-l md:border-cyan-500/15">
                  <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/15 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.25)]">
                    <Check className="h-3 w-3 text-cyan-400 stroke-[2.5]" />
                  </span>
                  <span className="text-xs font-medium leading-relaxed text-zinc-100">
                    {row.flatron}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
