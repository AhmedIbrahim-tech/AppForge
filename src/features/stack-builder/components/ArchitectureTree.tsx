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
    <div className="space-y-1 p-4 font-mono text-xs leading-relaxed bg-[var(--bg-code)] text-[var(--text-code-primary)] select-text">
      <div className="mb-2 text-[11px] text-slate-400">
        {"// Generated filesystem structure for "}
        <span className="text-white font-medium">{config.projectName}</span>:
      </div>

      <div className="text-accent font-bold">📁 {config.projectName}/</div>
      <div className="pl-4 text-slate-300">
        ├── 📄 .fullstack-app.json{" "}
        <span className="text-slate-500">{"// Stack manifest"}</span>
      </div>

      {/* BACKEND SECTION */}
      {!isFrontend && (
        <>
          {isFullstack ? (
            <div className="pl-4 font-semibold text-white">
              ├── 📁 Backend/{" "}
              <span className="text-[11px] font-normal text-slate-400">
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
                <div className={`${indent} text-slate-200`}>
                  ├── 📁 Domain/
                </div>
                <div className={`${subIndent} text-slate-400`}>
                  ├── Entities, ValueObjects, Common, Exceptions
                </div>

                <div className={`${indent} text-slate-200`}>
                  ├── 📁 Application/
                </div>
                {isCQRS ? (
                  <div className={`${subIndent} text-slate-400`}>
                    ├── Features/ (CQRS Commands, Queries, Handlers)
                  </div>
                ) : (
                  <div className={`${subIndent} text-slate-400`}>
                    ├── Modules/ (Application Services &amp; Interfaces)
                  </div>
                )}
                <div className={`${subIndent} text-slate-400`}>
                  ├── Common/ (Behaviors, Interfaces, Exceptions)
                </div>
                {config.backend.mapping === "AutoMapper" && (
                  <div className={`${subIndent} text-slate-400`}>
                    ├── Common/Mappings/ (MappingProfile.cs)
                  </div>
                )}

                <div className={`${indent} text-slate-200`}>
                  ├── 📁 Infrastructure/
                </div>
                <div className={`${subIndent} text-slate-400`}>
                  ├── Persistence/ (
                  {isHybrid
                    ? "ApplicationDbContext + DapperContext"
                    : isDapperOnly
                      ? `DapperContext + Repositories (${config.backend.database})`
                      : `ApplicationDbContext + Migrations (${config.backend.database})`}
                  )
                </div>
                {config.backend.auth.includes("Identity") && (
                  <div className={`${subIndent} text-slate-400`}>
                    ├── Identity/ (ApplicationUser, IdentityService)
                  </div>
                )}
                {config.backend.signalR && (
                  <div className={`${subIndent} text-slate-400`}>
                    ├── Hubs/ (NotificationHub.cs)
                  </div>
                )}
                {config.backend.hangfire && (
                  <div className={`${subIndent} text-slate-400`}>
                    ├── BackgroundJobs/ (JobScheduler.cs)
                  </div>
                )}

                <div className={`${indent} text-slate-200`}>
                  ├── 📁 {presentationDir}/
                </div>
                {config.backend.presentation === "Controllers" && (
                  <div className={`${subIndent} text-slate-400`}>
                    ├── Controllers/, Filters/, Middleware/, Program.cs
                  </div>
                )}
                {config.backend.presentation === "Minimal API" && (
                  <div className={`${subIndent} text-slate-400`}>
                    ├── Endpoints/, Extensions/, Middleware/, Program.cs
                  </div>
                )}
                {config.backend.presentation === "MVC" && (
                  <div className={`${subIndent} text-slate-400`}>
                    ├── Controllers/, Views/, wwwroot/, Program.cs
                  </div>
                )}
                {config.backend.presentation === "Razor Pages" && (
                  <div className={`${subIndent} text-slate-400`}>
                    ├── Pages/, wwwroot/, Program.cs
                  </div>
                )}

                <div className={`${indent} text-slate-300`}>
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
            <div className="pl-4 pt-1 font-semibold text-white">
              └── 📁 Frontend/{" "}
              <span className="text-[11px] font-normal text-slate-400">
                ({config.frontend.framework} • {config.frontend.tooling})
              </span>
            </div>
          ) : null}

          {/* Frontend sub-tree */}
          {(() => {
            const indent = isFullstack ? "pl-8" : "pl-4";
            const subIndent = isFullstack ? "pl-12" : "pl-8";

            if (isReact && !isNext) {
              return (
                <>
                  <div className={`${indent} text-slate-200`}>
                    ├── 📁 src/
                  </div>
                  <div className={`${subIndent} text-slate-400`}>
                    ├── components/ ({config.frontend.ui !== "None" ? config.frontend.ui : "UI Components"})
                  </div>
                  <div className={`${subIndent} text-slate-400`}>
                    ├── features/ (Modular Feature Components &amp; Hooks)
                  </div>
                  {config.frontend.state !== "None" && (
                    <div className={`${subIndent} text-slate-400`}>
                      ├── stores/ ({config.frontend.state} Store State)
                    </div>
                  )}
                  <div className={`${subIndent} text-slate-400`}>
                    ├── services/ ({config.frontend.httpClient} API Client)
                  </div>
                  {config.frontend.includeI18n && (
                    <div className={`${subIndent} text-slate-400`}>
                      ├── i18n/ (Translations &amp; Localization)
                    </div>
                  )}
                  <div className={`${subIndent} text-slate-400`}>
                    ├── App.tsx, main.tsx, index.css
                  </div>
                  <div className={`${indent} text-slate-300`}>
                    ├── 📄 index.html, vite.config.ts
                  </div>
                  <div className={`${indent} text-slate-300`}>
                    └── 📄 package.json, tsconfig.json
                  </div>
                </>
              );
            }

            if (isReact && isNext) {
              return (
                <>
                  <div className={`${indent} text-slate-200`}>
                    ├── 📁 src/
                  </div>
                  <div className={`${subIndent} text-slate-400`}>
                    ├── app/ (layout.tsx, page.tsx, globals.css)
                  </div>
                  <div className={`${subIndent} text-slate-400`}>
                    ├── components/ ({config.frontend.ui !== "None" ? config.frontend.ui : "UI Components"})
                  </div>
                  {config.frontend.state !== "None" && (
                    <div className={`${subIndent} text-slate-400`}>
                      ├── stores/ ({config.frontend.state} Global State)
                    </div>
                  )}
                  <div className={`${subIndent} text-slate-400`}>
                    ├── services/ ({config.frontend.httpClient} Fetchers)
                  </div>
                  <div className={`${indent} text-slate-300`}>
                    ├── 📄 next.config.ts, tailwind.config.ts
                  </div>
                  <div className={`${indent} text-slate-300`}>
                    └── 📄 package.json, tsconfig.json
                  </div>
                </>
              );
            }

            if (isAngular) {
              return (
                <>
                  <div className={`${indent} text-slate-200`}>
                    ├── 📁 src/app/
                  </div>
                  <div className={`${subIndent} text-slate-400`}>
                    ├── core/ (Guards, Interceptors, Services)
                  </div>
                  <div className={`${subIndent} text-slate-400`}>
                    ├── features/ (Lazy-Loaded Feature Routes)
                  </div>
                  <div className={`${subIndent} text-slate-400`}>
                    ├── shared/ ({config.frontend.ui !== "None" ? config.frontend.ui : "Shared Components"})
                  </div>
                  {config.frontend.state === "NgRx" && (
                    <div className={`${subIndent} text-slate-400`}>
                      ├── store/ (NgRx Reducers, Effects, Selectors)
                    </div>
                  )}
                  <div className={`${subIndent} text-slate-400`}>
                    ├── app.component.ts, app.config.ts, app.routes.ts
                  </div>
                  <div className={`${indent} text-slate-300`}>
                    ├── 📄 angular.json, tsconfig.app.json
                  </div>
                  <div className={`${indent} text-slate-300`}>
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
