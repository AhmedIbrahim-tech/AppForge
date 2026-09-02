import type { StackConfiguration } from "@/features/stack-builder/types";

export function ArchitectureTree({
  config,
  dotnetDisplay,
  targetFrameworkMoniker,
}: {
  config: StackConfiguration;
  dotnetDisplay: string;
  targetFrameworkMoniker: string;
}) {
  return (
    <div className="space-y-0.5 p-4 font-mono text-[12.5px] leading-6 text-zinc-300 sm:p-5">
      <div className="mb-3 text-zinc-500">
        {"// Generated clean architecture layout for "}
        {config.projectName}:
      </div>
      <div className="text-indigo-300 font-semibold">📁 {config.projectName}/</div>
      <div className="pl-4 text-zinc-400">
        ├── 📄 .fullstack-app.json{" "}
        <span className="text-zinc-600">{"// manifest source"}</span>
      </div>

      {config.projectType !== "frontend" && (
        <>
          <div className="pl-4 font-semibold text-cyan-300">
            ├── 📁 src/backend/ (Clean Architecture • {dotnetDisplay})
          </div>
          <div className="pl-8 text-zinc-300">
            ├── 📁 {config.projectName}.Domain/
          </div>
          <div className="pl-12 text-zinc-500">
            ├── Entities, Enums, ValueObjects, DomainEvents ({targetFrameworkMoniker})
          </div>
          <div className="pl-8 text-zinc-300">
            ├── 📁 {config.projectName}.Application/
          </div>
          <div className="pl-12 text-zinc-500">
            ├── Features/ (CQRS Commands & Queries with MediatR)
          </div>
          <div className="pl-12 text-zinc-500">
            ├── Behaviors/ (Validation, Logging, Performance)
          </div>
          <div className="pl-8 text-zinc-300">
            ├── 📁 {config.projectName}.Infrastructure/
          </div>
          <div className="pl-12 text-zinc-500">
            ├── Persistence/ ({config.backend.orm} + {config.backend.database})
          </div>
          {config.backend.signalR && (
            <div className="pl-12 text-zinc-500">
              ├── Hubs/ (SignalR Real-Time notifications)
            </div>
          )}
          {config.backend.hangfire && (
            <div className="pl-12 text-zinc-500">
              ├── BackgroundJobs/ (Hangfire schedules)
            </div>
          )}
          <div className="pl-8 text-zinc-300">
            └── 📁 {config.projectName}.API/
          </div>
          <div className="pl-12 text-zinc-500">
            └── Endpoints, Middleware, Swagger, Program.cs
          </div>
        </>
      )}

      {config.projectType !== "backend" && (
        <>
          <div className="pl-4 font-semibold text-purple-300">
            {config.projectType === "fullstack" ? "└── 📁 src/frontend/" : "├── 📁 src/"}{" "}
            ({config.frontend.framework} + {config.frontend.tooling})
          </div>
          {config.frontend.framework === "React" ? (
            <>
              <div className="pl-8 text-zinc-300">
                ├── 📁 src/app/ (Router, Providers, Layouts)
              </div>
              <div className="pl-8 text-zinc-300">
                ├── 📁 src/modules/ (Feature vertical slices)
              </div>
              {config.frontend.state !== "None" && (
                <div className="pl-8 text-zinc-300">
                  ├── 📁 src/{config.frontend.state === "Zustand" ? "stores" : "store"}/ ({config.frontend.state})
                </div>
              )}
              <div className="pl-8 text-zinc-300">
                ├── 📁 src/shared/components/ ({config.frontend.ui})
              </div>
              <div className="pl-8 text-zinc-400">
                └── 📄 tailwind.config.ts, package.json
              </div>
            </>
          ) : (
            <>
              <div className="pl-8 text-zinc-300">
                ├── 📁 src/app/ (Components, Routes, Core)
              </div>
              <div className="pl-8 text-zinc-300">
                ├── 📁 src/app/features/ (Angular modules & services)
              </div>
              {config.frontend.state !== "None" && (
                <div className="pl-8 text-zinc-300">
                  ├── 📁 src/app/store/ ({config.frontend.state} Reducers & Effects)
                </div>
              )}
              <div className="pl-8 text-zinc-300">
                ├── 📁 src/app/shared/ ({config.frontend.ui})
              </div>
              <div className="pl-8 text-zinc-400">
                └── 📄 angular.json, tsconfig.app.json
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
