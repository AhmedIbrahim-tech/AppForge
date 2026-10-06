import React from "react";
import { Link } from "react-router-dom";
import {
  PackagePlus,
  Boxes,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export const ExtendYourProjectSection: React.FC = () => {
  return (
    <section id="extend" className="relative w-full py-16 sm:py-20 border-t border-white/[0.08] bg-[#090a0f]">
      <div className="mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Post-Scaffolding Developer Experience</span>
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            Extend Your Project
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Flatron doesn&apos;t stop at initial scaffolding. After generating your stack, build domain business
            features and add production-grade application modules with dedicated generators.
          </p>
        </div>

        {/* 3-Step Lifecycle Workflow Bar */}
        <div className="mt-10 rounded-2xl border border-white/[0.08] bg-[#11131a]/80 p-5 backdrop-blur-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Step 1 */}
            <div className="flex items-start gap-3 rounded-xl border border-white/[0.04] bg-[#0c0d14] p-3.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 font-mono text-xs font-bold text-indigo-400">
                1
              </span>
              <div>
                <h4 className="text-xs font-semibold text-white">Scaffold Solution</h4>
                <p className="mt-0.5 text-[11px] text-zinc-400">Initial clean architecture stack</p>
                <code className="mt-1.5 block rounded bg-black/60 px-2 py-1 font-mono text-[11px] text-indigo-300">
                  flatron MyApp
                </code>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3 rounded-xl border border-white/[0.04] bg-[#0c0d14] p-3.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 font-mono text-xs font-bold text-indigo-400">
                2
              </span>
              <div>
                <h4 className="text-xs font-semibold text-white">Enter Workspace</h4>
                <p className="mt-0.5 text-[11px] text-zinc-400">Navigate to project root</p>
                <code className="mt-1.5 block rounded bg-black/60 px-2 py-1 font-mono text-[11px] text-indigo-300">
                  cd MyApp
                </code>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3 rounded-xl border border-white/[0.04] bg-[#0c0d14] p-3.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 font-mono text-xs font-bold text-indigo-400">
                3
              </span>
              <div>
                <h4 className="text-xs font-semibold text-white">Build &amp; Extend</h4>
                <p className="mt-0.5 text-[11px] text-zinc-400">Features &amp; reusable modules</p>
                <code className="mt-1.5 block rounded bg-black/60 px-2 py-1 font-mono text-[11px] text-indigo-300">
                  flatron create [feature|module]
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Two Balanced Entry Cards */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card 1: Feature Builder */}
          <div className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#11131a] p-6 transition-all duration-200 hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.12)]">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
                  <PackagePlus className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-300">
                  v4.0 Schema Engine
                </span>
              </div>

              <h3 className="mt-4 text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                Business Feature Builder
              </h3>
              <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                Define custom business entities such as <strong>Product</strong>, <strong>Category</strong>, or <strong>Order</strong> with typed attributes, validation rules, relationships, enums, and media attachments.
              </p>

              <div className="mt-4 space-y-1.5 rounded-lg border border-white/[0.04] bg-[#0c0d14] p-3 text-[11px] text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>C# Domain Entities, Repositories, &amp; CQRS Handlers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>React / Angular Data Tables, Forms &amp; Dialogs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Automatic schema validation (FluentValidation &amp; Zod)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
              <code className="font-mono text-xs text-zinc-400">
                flatron create feature &lt;name&gt;
              </code>
              <Link
                to="/features"
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow transition-all hover:bg-indigo-500 active:scale-95"
              >
                <span>Launch Feature Builder</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Module Explorer */}
          <div className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#11131a] p-6 transition-all duration-200 hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.12)]">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-400">
                  <Boxes className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-purple-300">
                  8 Modules Registered
                </span>
              </div>

              <h3 className="mt-4 text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                Application Module Explorer
              </h3>
              <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                Add cross-cutting enterprise capabilities to your application. Flatron modules integrate domain models, security policies, and UI dashboards seamlessly.
              </p>

              <div className="mt-4 space-y-1.5 rounded-lg border border-white/[0.04] bg-[#0c0d14] p-3 text-[11px] text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Authentication, User Management, &amp; Permissions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Audit Trail with Change Redaction &amp; Event Logs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Notifications, Domain Localization, &amp; Rich Text</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
              <code className="font-mono text-xs text-zinc-400">
                flatron create module &lt;name&gt;
              </code>
              <Link
                to="/modules"
                className="flex items-center gap-1.5 rounded-xl border border-purple-500/40 bg-purple-500/10 px-3.5 py-2 text-xs font-semibold text-purple-300 transition-all hover:bg-purple-500/20 hover:text-white active:scale-95"
              >
                <span>Explore All Modules</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
