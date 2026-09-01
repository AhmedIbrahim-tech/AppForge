import React from "react";
import { Cpu, FileJson, Sparkles, Key } from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { Card } from "@/shared/components/ui/Card";

export const WhyAppForge: React.FC = () => {
  const pillars = [
    {
      id: "architecture-aware",
      icon: <Cpu className="h-6 w-6 text-indigo-400" />,
      badge: "Deep Structural Design",
      badgeVariant: "indigo" as const,
      title: "1. Architecture-Aware",
      headline: "Changes architecture, not just packages.",
      description:
        "Unlike generic project starters that dump dependencies into a single folder, AppForge alters the core layer boundaries, dependency injection graph, and CQRS handler wiring based on your choices. Choose MediatR or Dapper and watch the entire architecture adapt cleanly.",
      highlight: "Clean Architecture boundaries preserved across all solutions",
    },
    {
      id: "manifest-driven",
      icon: <FileJson className="h-6 w-6 text-cyan-400" />,
      badge: "Declarative Source of Truth",
      badgeVariant: "sky" as const,
      title: "2. Manifest-Driven",
      headline: ".fullstack-app.json is your contract.",
      description:
        "Every project includes a canonical configuration manifest. This manifest records the chosen ORM, database engine, frontend UI system, and naming conventions so subsequent generators always generate code aligned with your existing project structure.",
      highlight: "Enables multi-step CLI tooling without guessing project configuration",
    },
    {
      id: "feature-generation",
      icon: <Sparkles className="h-6 w-6 text-emerald-400" />,
      badge: "End-to-End Scaffolding",
      badgeVariant: "emerald" as const,
      title: "3. Full-Stack Feature Generation",
      headline: "One command. Complete vertical slice.",
      description:
        "Run `create-fullstack-feature` and get a complete feature slice: domain entities, database migrations, CQRS commands/queries, API endpoints, and typed frontend state, API client, and UI forms wired end-to-end automatically.",
      highlight: "Eliminates 90% of repetitive full-stack plumbing",
    },
    {
      id: "developer-owned",
      icon: <Key className="h-6 w-6 text-amber-400" />,
      badge: "Zero Runtime Lock-in",
      badgeVariant: "amber" as const,
      title: "4. Developer-Owned Code",
      headline: "Standard, idiomatic source code you own.",
      description:
        "No hidden proprietary runtime, no proprietary SDK wrappers, and no magic black boxes. All generated code uses standard C# (.NET) and modern TypeScript (React/Angular) that you and your team can modify, debug, and test normally.",
      highlight: "Deploy anywhere — Docker, Azure, AWS, Vercel, or on-premise",
    },
  ];

  return (
    <section id="why-appforge" className="relative py-20 border-t border-zinc-850 bg-[#090a0f]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="indigo" dot size="md">
            Product Philosophy
          </Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Why AppForge?
          </h2>
          <p className="mt-3 text-base text-zinc-400">
            Engineered for developers who care about clean software architecture,
            predictable codebases, and long-term project maintainability.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar) => (
            <Card
              key={pillar.id}
              className="flex flex-col justify-between border-zinc-800/90 bg-[#0d0f17]/80 p-7 hover:border-zinc-700 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                    {pillar.icon}
                  </div>
                  <Badge variant={pillar.badgeVariant} size="sm">
                    {pillar.badge}
                  </Badge>
                </div>

                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
                  {pillar.title}
                </h3>
                <h4 className="mt-1 text-xl font-bold text-white tracking-tight">
                  {pillar.headline}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  {pillar.highlight}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
