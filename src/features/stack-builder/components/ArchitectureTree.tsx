import type { StackConfiguration } from "@/features/stack-builder/types";

export function ArchitectureTree({
  config,
  dotnetDisplay = ".NET 10",
}: {
  config: StackConfiguration;
  dotnetDisplay?: string;
  targetFrameworkMoniker?: string;
}) {
  const isFullstack = config.projectType === "fullstack";
  const isBackend = config.projectType === "backend";
  const isFrontend = config.projectType === "frontend";

  const isCQRS = config.backend.architecture === "CQRS + MediatR";
  const isWebLayer =
    config.backend.presentation === "MVC" ||
    config.backend.presentation === "Razor Pages";
  const presentationDir = isWebLayer ? "Web" : "API";

  const isDapperOnly = config.backend.orm === "Dapper";
  const isHybrid = config.backend.orm === "EF Core + Dapper";

  const isReact = config.frontend.framework === "React";
  const isNext = config.frontend.tooling === "Next.js";
  const isAngular = config.frontend.framework === "Angular";

  return (
    <div className="space-y-0.5 p-4 font-mono text-[12.5px] leading-6 text-zinc-300 sm:p-5 select-text">
      <div className="mb-3 text-xs text-zinc-500">
        {"// Generated filesystem structure for "}
        <span className="text-zinc-300 font-semibold">{config.projectName}</span>:
      </div>

      <div className="text-indigo-300 font-semibold">📁 {config.projectName}/</div>
      <div className="pl-4 text-zinc-400">
        ├── 📄 .fullstack-app.json{" "}
        <span className="text-zinc-600">{"// Flatron stack manifest"}</span>
      </div>

      {/* BACKEND SECTION */}
      {!isFrontend && (
        <>
          {isFullstack ? (
            <div className="pl-4 font-semibold text-cyan-300">
              ├── 📁 Backend/{" "}
              <span className="text-xs font-normal text-cyan-500/80">
                (Clean Architecture • {dotnetDisplay})
              </span>
            </div>
          ) : null}

          {/* Backend sub-tree indent prefix */}
          {(() => {
            const indent = isFullstack ? "pl-8" : "pl-4";
            const subIndent = isFullstack ? "pl-12" : "pl-8";
            return (
              <>
                <div className={`${indent} text-zinc-300`}>
                  ├── 📁 Domain/
                </div>
                <div className={`${subIndent} text-zinc-500`}>
                  ├── Entities, ValueObjects, Common, Exceptions
                </div>

                <div className={`${indent} text-zinc-300`}>
                  ├── 📁 Application/
                </div>
                {isCQRS ? (
                  <div className={`${subIndent} text-zinc-500`}>
                    ├── Features/ (CQRS Commands, Queries, Handlers)
                  </div>
                ) : (
                  <div className={`${subIndent} text-zinc-500`}>
                    ├── Modules/ (Application Services & Interfaces)
                  </div>
                )}
                <div className={`${subIndent} text-zinc-500`}>
                  ├── Common/ (Behaviors, Interfaces, Exceptions)
                </div>
                {config.backend.mapping === "AutoMapper" && (
                  <div className={`${subIndent} text-zinc-500`}>
                    ├── Common/Mappings/ (MappingProfile.cs)
                  </div>
                )}

                <div className={`${indent} text-zinc-300`}>
                  ├── 📁 Infrastructure/
                </div>
                <div className={`${subIndent} text-zinc-500`}>
                  ├── Persistence/ (
                  {isHybrid
                    ? "ApplicationDbContext + DapperContext"
                    : isDapperOnly
                      ? `DapperContext + Repositories (${config.backend.database})`
                      : `ApplicationDbContext + Migrations (${config.backend.database})`}
                  )
                </div>
                {config.backend.auth.includes("Identity") && (
                  <div className={`${subIndent} text-zinc-500`}>
                    ├── Identity/ (ApplicationUser, IdentityService)
                  </div>
                )}
                {config.backend.signalR && (
                  <div className={`${subIndent} text-zinc-500`}>
                    ├── Hubs/ (NotificationHub.cs)
                  </div>
                )}
                {config.backend.hangfire && (
                  <div className={`${subIndent} text-zinc-500`}>
                    ├── BackgroundJobs/ (JobScheduler.cs)
                  </div>
                )}

                <div className={`${indent} text-zinc-300`}>
                  ├── 📁 {presentationDir}/
                </div>
                {config.backend.presentation === "Controllers" && (
                  <div className={`${subIndent} text-zinc-500`}>
                    ├── Controllers/, Filters/, Middleware/, Program.cs
                  </div>
                )}
                {config.backend.presentation === "Minimal API" && (
                  <div className={`${subIndent} text-zinc-500`}>
                    ├── Endpoints/, Extensions/, Middleware/, Program.cs
                  </div>
                )}
                {config.backend.presentation === "MVC" && (
                  <div className={`${subIndent} text-zinc-500`}>
                    ├── Controllers/, Views/, wwwroot/, Program.cs
                  </div>
                )}
                {config.backend.presentation === "Razor Pages" && (
                  <div className={`${subIndent} text-zinc-500`}>
                    ├── Pages/, wwwroot/, Program.cs
                  </div>
                )}

                <div className={`${indent} text-zinc-400`}>
                  └── 📄 {config.projectName}.slnx
                </div>
              </>
            );
          })()}
        </>
      )}

      {/* FRONTEND SECTION */}
      {!isBackend && (
        <>
          {isFullstack ? (
            <div className="pl-4 pt-2 font-semibold text-purple-300">
              └── 📁 Frontend/{" "}
              <span className="text-xs font-normal text-purple-400/80">
                ({config.frontend.framework} • {config.frontend.tooling})
              </span>
            </div>
          ) : null}

          {/* Frontend sub-tree */}
          {(() => {
            const indent = isFullstack ? "pl-8" : "pl-4";
            const subIndent = isFullstack ? "pl-12" : "pl-8";

            if (isReact && !isNext) {
              // React + Vite
              return (
                <>
                  <div className={`${indent} text-zinc-300`}>
                    ├── 📁 src/
                  </div>
                  <div className={`${subIndent} text-zinc-500`}>
                    ├── components/ ({config.frontend.ui !== "None" ? config.frontend.ui : "UI Components"})
                  </div>
                  <div className={`${subIndent} text-zinc-500`}>
                    ├── features/ (Modular Feature Components & Hooks)
                  </div>
                  {config.frontend.state !== "None" && (
                    <div className={`${subIndent} text-zinc-500`}>
                      ├── stores/ ({config.frontend.state} Store State)
                    </div>
                  )}
                  <div className={`${subIndent} text-zinc-500`}>
                    ├── services/ ({config.frontend.httpClient} API Client)
                  </div>
                  {config.frontend.includeI18n && (
                    <div className={`${subIndent} text-zinc-500`}>
                      ├── i18n/ (Translations & Localization)
                    </div>
                  )}
                  <div className={`${subIndent} text-zinc-500`}>
                    ├── App.tsx, main.tsx, index.css
                  </div>
                  <div className={`${indent} text-zinc-400`}>
                    ├── 📄 index.html, vite.config.ts
                  </div>
                  <div className={`${indent} text-zinc-400`}>
                    └── 📄 package.json, tsconfig.json
                  </div>
                </>
              );
            }

            if (isReact && isNext) {
              // React + Next.js
              return (
                <>
                  <div className={`${indent} text-zinc-300`}>
                    ├── 📁 src/
                  </div>
                  <div className={`${subIndent} text-zinc-500`}>
                    ├── app/ (layout.tsx, page.tsx, globals.css)
                  </div>
                  <div className={`${subIndent} text-zinc-500`}>
                    ├── components/ ({config.frontend.ui !== "None" ? config.frontend.ui : "UI Components"})
                  </div>
                  {config.frontend.state !== "None" && (
                    <div className={`${subIndent} text-zinc-500`}>
                      ├── stores/ ({config.frontend.state} Global State)
                    </div>
                  )}
                  <div className={`${subIndent} text-zinc-500`}>
                    ├── services/ ({config.frontend.httpClient} Fetchers)
                  </div>
                  <div className={`${indent} text-zinc-400`}>
                    ├── 📄 next.config.ts, tailwind.config.ts
                  </div>
                  <div className={`${indent} text-zinc-400`}>
                    └── 📄 package.json, tsconfig.json
                  </div>
                </>
              );
            }

            if (isAngular) {
              // Angular CLI
              return (
                <>
                  <div className={`${indent} text-zinc-300`}>
                    ├── 📁 src/app/
                  </div>
                  <div className={`${subIndent} text-zinc-500`}>
                    ├── core/ (Guards, Interceptors, Services)
                  </div>
                  <div className={`${subIndent} text-zinc-500`}>
                    ├── features/ (Lazy-Loaded Feature Routes)
                  </div>
                  <div className={`${subIndent} text-zinc-500`}>
                    ├── shared/ ({config.frontend.ui !== "None" ? config.frontend.ui : "Shared Components"})
                  </div>
                  {config.frontend.state === "NgRx" && (
                    <div className={`${subIndent} text-zinc-500`}>
                      ├── store/ (NgRx Reducers, Effects, Selectors)
                    </div>
                  )}
                  <div className={`${subIndent} text-zinc-500`}>
                    ├── app.component.ts, app.config.ts, app.routes.ts
                  </div>
                  <div className={`${indent} text-zinc-400`}>
                    ├── 📄 angular.json, tsconfig.app.json
                  </div>
                  <div className={`${indent} text-zinc-400`}>
                    └── 📄 package.json, styles.css
                  </div>
                </>
              );
            }

            return null;
          })()}
        </>
      )}
    </div>
  );
}
