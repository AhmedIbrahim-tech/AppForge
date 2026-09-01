import React from "react";
import { Sliders, Terminal, Rocket } from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { CodeBlock } from "@/shared/components/ui/CodeBlock";

export const HowItWorks: React.FC = () => {
  const workflowSteps = [
    {
      step: "01",
      icon: <Sliders className="h-5 w-5 text-indigo-400" />,
      title: "Choose your stack",
      description:
        "Select your architectural scope (Full Stack, Backend Only, or Frontend Only), data access layer (EF Core or Dapper), database, and client framework.",
      snippet: "# Option A: Interactive CLI prompt\nnpx create-fullstack-app MyStore\n\n# Option B: Declarative manifest run\nnpx create-fullstack-app MyStore --type fullstack --db postgresql",
    },
    {
      step: "02",
      icon: <Terminal className="h-5 w-5 text-cyan-400" />,
      title: "Generate the foundation",
      description:
        "AppForge scaffolds the complete layered solution: Domain, Application (CQRS + MediatR), Infrastructure, API, and modular Frontend with authentication wired in.",
      snippet: "cd MyStore\n\n# Run backend API\ndotnet run --project src/backend/MyStore.API\n\n# Run frontend client (Vite/Next)\ncd src/frontend && npm run dev",
    },
    {
      step: "03",
      icon: <Rocket className="h-5 w-5 text-emerald-400" />,
      title: "Build your application features",
      description:
        "Scaffold complete end-to-end vertical feature slices on-demand as your product grows. Features seamlessly integrate into your existing project structure.",
      snippet: "# Generate full-stack 'Product' feature slice\nnpx create-fullstack-feature Product\n\n# Automatically creates Domain Entity, CQRS Handlers,\n# EF Core Configuration, API Controller, and React UI slice!",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-20 border-t border-zinc-850 bg-[#0c0d15]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="sky" dot size="md">
            Developer Workflow
          </Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 text-base text-zinc-400">
            From zero to a running, enterprise-ready full-stack architecture in three simple commands.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {workflowSteps.map((s) => (
            <div
              key={s.step}
              className="relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-[#11131d]/90 p-6 shadow-xl backdrop-blur-sm"
            >
              <div>
                {/* Step number badge & icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800">
                    {s.icon}
                  </div>
                  <span className="font-mono text-2xl font-black text-zinc-700">
                    {s.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  {s.description}
                </p>
              </div>

              {/* Code snippet */}
              <div className="mt-5">
                <CodeBlock
                  code={s.snippet}
                  language="bash"
                  filename={`step-${s.step}.sh`}
                  className="text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
