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
    <div className="space-y-0.5 p-3.5 font-mono text-xs leading-relaxed text-[#F3F6FA] select-text">
      <div className="mb-2 text-[11px] text-[#737D8C]">
        {"// Generated filesystem structure for "}
        <span className="text-[#F3F6FA] font-medium">{config.projectName}</span>:
      </div>

      <div className="text-[#6487FF] font-semibold">📁 {config.projectName}/</div>
      <div className="pl-4 text-[#A1AAB8]">
        ├── 📄 .fullstack-app.json{" "}
        <span className="text-[#737D8C]">{"// Stack manifest"}</span>
      </div>

      {/* BACKEND SECTION */}
      {!isFrontend && (
        <>
          {isFullstack ? (
            <div className="pl-4 font-semibold text-[#F3F6FA]">
              ├── 📁 Backend/{" "}
              <span className="text-[11px] font-normal text-[#737D8C]">
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
                <div className={`${indent} text-[#F3F6FA]`}>
                  ├── 📁 Domain/
                </div>
                <div className={`${subIndent} text-[#737D8C]`}>
                  ├── Entities, ValueObjects, Common, Exceptions
                </div>

                <div className={`${indent} text-[#F3F6FA]`}>
                  ├── 📁 Application/
                </div>
                {isCQRS ? (
                  <div className={`${subIndent} text-[#737D8C]`}>
                    ├── Features/ (CQRS Commands, Queries, Handlers)
                  </div>
                ) : (
                  <div className={`${subIndent} text-[#737D8C]`}>
                    ├── Modules/ (Application Services & Interfaces)
                  </div>
                )}
                <div className={`${subIndent} text-[#737D8C]`}>
                  ├── Common/ (Behaviors, Interfaces, Exceptions)
                </div>
                {config.backend.mapping === "AutoMapper" && (
                  <div className={`${subIndent} text-[#737D8C]`}>
                    ├── Common/Mappings/ (MappingProfile.cs)
                  </div>
                )}

                <div className={`${indent} text-[#F3F6FA]`}>
                  ├── 📁 Infrastructure/
                </div>
                <div className={`${subIndent} text-[#737D8C]`}>
                  ├── Persistence/ (
                  {isHybrid
                    ? "ApplicationDbContext + DapperContext"
                    : isDapperOnly
                      ? `DapperContext + Repositories (${config.backend.database})`
                      : `ApplicationDbContext + Migrations (${config.backend.database})`}
                  )
                </div>
                {config.backend.auth.includes("Identity") && (
                  <div className={`${subIndent} text-[#737D8C]`}>
                    ├── Identity/ (ApplicationUser, IdentityService)
                  </div>
                )}
                {config.backend.signalR && (
                  <div className={`${subIndent} text-[#737D8C]`}>
                    ├── Hubs/ (NotificationHub.cs)
                  </div>
                )}
                {config.backend.hangfire && (
                  <div className={`${subIndent} text-[#737D8C]`}>
                    ├── BackgroundJobs/ (JobScheduler.cs)
                  </div>
                )}

                <div className={`${indent} text-[#F3F6FA]`}>
                  ├── 📁 {presentationDir}/
                </div>
                {config.backend.presentation === "Controllers" && (
                  <div className={`${subIndent} text-[#737D8C]`}>
                    ├── Controllers/, Filters/, Middleware/, Program.cs
                  </div>
                )}
                {config.backend.presentation === "Minimal API" && (
                  <div className={`${subIndent} text-[#737D8C]`}>
                    ├── Endpoints/, Extensions/, Middleware/, Program.cs
                  </div>
                )}
                {config.backend.presentation === "MVC" && (
                  <div className={`${subIndent} text-[#737D8C]`}>
                    ├── Controllers/, Views/, wwwroot/, Program.cs
                  </div>
                )}
                {config.backend.presentation === "Razor Pages" && (
                  <div className={`${subIndent} text-[#737D8C]`}>
                    ├── Pages/, wwwroot/, Program.cs
                  </div>
                )}

                <div className={`${indent} text-[#A1AAB8]`}>
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
            <div className="pl-4 pt-1 font-semibold text-[#F3F6FA]">
              └── 📁 Frontend/{" "}
              <span className="text-[11px] font-normal text-[#737D8C]">
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
                  <div className={`${indent} text-[#F3F6FA]`}>
                    ├── 📁 src/
                  </div>
                  <div className={`${subIndent} text-[#737D8C]`}>
                    ├── components/ ({config.frontend.ui !== "None" ? config.frontend.ui : "UI Components"})
                  </div>
                  <div className={`${subIndent} text-[#737D8C]`}>
                    ├── features/ (Modular Feature Components & Hooks)
                  </div>
                  {config.frontend.state !== "None" && (
                    <div className={`${subIndent} text-[#737D8C]`}>
                      ├── stores/ ({config.frontend.state} Store State)
                    </div>
                  )}
                  <div className={`${subIndent} text-[#737D8C]`}>
                    ├── services/ ({config.frontend.httpClient} API Client)
                  </div>
                  {config.frontend.includeI18n && (
                    <div className={`${subIndent} text-[#737D8C]`}>
                      ├── i18n/ (Translations & Localization)
                    </div>
                  )}
                  <div className={`${subIndent} text-[#737D8C]`}>
                    ├── App.tsx, main.tsx, index.css
                  </div>
                  <div className={`${indent} text-[#A1AAB8]`}>
                    ├── 📄 index.html, vite.config.ts
                  </div>
                  <div className={`${indent} text-[#A1AAB8]`}>
                    └── 📄 package.json, tsconfig.json
                  </div>
                </>
              );
            }

            if (isReact && isNext) {
              return (
                <>
                  <div className={`${indent} text-[#F3F6FA]`}>
                    ├── 📁 src/
                  </div>
                  <div className={`${subIndent} text-[#737D8C]`}>
                    ├── app/ (layout.tsx, page.tsx, globals.css)
                  </div>
                  <div className={`${subIndent} text-[#737D8C]`}>
                    ├── components/ ({config.frontend.ui !== "None" ? config.frontend.ui : "UI Components"})
                  </div>
                  {config.frontend.state !== "None" && (
                    <div className={`${subIndent} text-[#737D8C]`}>
                      ├── stores/ ({config.frontend.state} Global State)
                    </div>
                  )}
                  <div className={`${subIndent} text-[#737D8C]`}>
                    ├── services/ ({config.frontend.httpClient} Fetchers)
                  </div>
                  <div className={`${indent} text-[#A1AAB8]`}>
                    ├── 📄 next.config.ts, tailwind.config.ts
                  </div>
                  <div className={`${indent} text-[#A1AAB8]`}>
                    └── 📄 package.json, tsconfig.json
                  </div>
                </>
              );
            }

            if (isAngular) {
              return (
                <>
                  <div className={`${indent} text-[#F3F6FA]`}>
                    ├── 📁 src/app/
                  </div>
                  <div className={`${subIndent} text-[#737D8C]`}>
                    ├── core/ (Guards, Interceptors, Services)
                  </div>
                  <div className={`${subIndent} text-[#737D8C]`}>
                    ├── features/ (Lazy-Loaded Feature Routes)
                  </div>
                  <div className={`${subIndent} text-[#737D8C]`}>
                    ├── shared/ ({config.frontend.ui !== "None" ? config.frontend.ui : "Shared Components"})
                  </div>
                  {config.frontend.state === "NgRx" && (
                    <div className={`${subIndent} text-[#737D8C]`}>
                      ├── store/ (NgRx Reducers, Effects, Selectors)
                    </div>
                  )}
                  <div className={`${subIndent} text-[#737D8C]`}>
                    ├── app.component.ts, app.config.ts, app.routes.ts
                  </div>
                  <div className={`${indent} text-[#A1AAB8]`}>
                    ├── 📄 angular.json, tsconfig.app.json
                  </div>
                  <div className={`${indent} text-[#A1AAB8]`}>
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
