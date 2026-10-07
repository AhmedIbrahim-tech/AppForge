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
    icon: <Layers className="h-4 w-4 text-accent" />,
    title: "Full Stack Scaffolding",
    description: "End-to-end applications connecting ASP.NET Core with modern frontend SPAs.",
  },
  {
    icon: <Server className="h-4 w-4 text-accent" />,
    title: "Clean Architecture Backend",
    description: "CQRS with MediatR, Domain-Driven Design boundaries, and dependency injection.",
  },
  {
    icon: <Layout className="h-4 w-4 text-accent" />,
    title: "React & Angular Frontend",
    description: "Vite, Next.js, or Angular CLI pre-configured with Tailwind CSS and state stores.",
  },
  {
    icon: <Database className="h-4 w-4 text-accent" />,
    title: "EF Core & Dapper",
    description: "Production data access with PostgreSQL, SQL Server, or SQLite.",
  },
  {
    icon: <Cpu className="h-4 w-4 text-accent" />,
    title: "Real-Time & Jobs",
    description: "Optional SignalR real-time hubs and Hangfire recurring background job processing.",
  },
  {
    icon: <FileCode className="h-4 w-4 text-accent" />,
    title: "Manifest-Driven",
    description: "Declarative .fullstack-app.json configuration for reproducible CLI generation.",
  },
];

export const Capabilities: React.FC = () => {
  return (
    <section id="capabilities" className="relative py-16 sm:py-20 border-t border-border bg-base">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Supported Capabilities
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Engineered for enterprise standards without excessive boilerplate.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.title}
              className="rounded-lg border border-border bg-surface p-4 transition-all hover:border-border-hover hover:bg-surface-secondary"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-[5px] bg-surface-raised border border-border">
                  {cap.icon}
                </div>
                <h3 className="font-heading text-sm font-semibold text-text-primary">{cap.title}</h3>
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-text-secondary">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

