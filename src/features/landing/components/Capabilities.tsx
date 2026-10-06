import React from "react";
import {
  Layers,
  Server,
  Layout,
  Database,
  Cpu,
  FileCode,
} from "lucide-react";

interface Capability {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const CAPABILITIES: Capability[] = [
  {
    icon: <Layers className="h-4 w-4 text-indigo-400" />,
    title: "Full Stack",
    description: "End-to-end applications connecting ASP.NET Core with modern frontend SPAs.",
  },
  {
    icon: <Server className="h-4 w-4 text-cyan-400" />,
    title: "Clean Architecture Backend",
    description: "CQRS with MediatR, Domain-Driven Design boundaries, and dependency injection.",
  },
  {
    icon: <Layout className="h-4 w-4 text-purple-400" />,
    title: "React & Angular Frontend",
    description: "Vite, Next.js, or Angular CLI pre-configured with Tailwind CSS and state stores.",
  },
  {
    icon: <Database className="h-4 w-4 text-emerald-400" />,
    title: "EF Core & Dapper",
    description: "Production data access with PostgreSQL, SQL Server, or SQLite.",
  },
  {
    icon: <Cpu className="h-4 w-4 text-amber-400" />,
    title: "Real-Time & Jobs",
    description: "Optional SignalR real-time hubs and Hangfire recurring background job processing.",
  },
  {
    icon: <FileCode className="h-4 w-4 text-sky-400" />,
    title: "Manifest-Driven",
    description: "Declarative .fullstack-app.json configuration for reproducible CLI generation.",
  },
];

export const Capabilities: React.FC = () => {
  return (
    <section id="capabilities" className="relative py-16 sm:py-20 border-t border-white/[0.06] bg-[#07080d]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Supported Capabilities
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Engineered for enterprise standards without excessive boilerplate.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.title}
              className="rounded-xl border border-white/[0.06] bg-[#0d0f18]/70 p-4 transition-all duration-150 hover:border-white/10 hover:bg-[#101320]"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                  {cap.icon}
                </div>
                <h3 className="text-sm font-semibold text-zinc-200">{cap.title}</h3>
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-zinc-400">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
