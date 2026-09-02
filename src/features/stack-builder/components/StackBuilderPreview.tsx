import React from "react";
import {
  Layers,
  Server,
  Layout,
  FileCode2,
  Terminal,
  FolderTree,
  Sliders,
  Flame,
  Radio,
  Info,
  AlertOctagon,
} from "lucide-react";
import { useStackBuilderStore } from "@/features/stack-builder/store/stackBuilderStore";
import { FRONTEND_CAPABILITY_MATRIX } from "@/features/stack-builder/compatibility-rules";
import {
  DOTNET_VERSIONS,
  SUPPORTED_DOTNET_VERSIONS,
  getDotnetDisplay,
  getDotnetTargetFramework,
} from "@/features/stack-builder/dotnet-versions";
import { STACK_PRESETS } from "@/features/stack-builder/presets";
import type { PresetDefinition } from "@/features/stack-builder/presets";
import type { StackConfiguration } from "@/features/stack-builder/types";
import { Badge } from "@/shared/components/ui/Badge";
import { CodeBlock } from "@/shared/components/ui/CodeBlock";
import { ArchitectureTree } from "./ArchitectureTree";
import {
  BuilderTabs,
  OptionCard,
  PresetChip,
  PreviewPanel,
  SectionCard,
  SelectionGroup,
  StatusBadge,
} from "./ui";

function isPresetSelected(preset: PresetDefinition, config: StackConfiguration) {
  const snapshot = (value: StackConfiguration) =>
    JSON.stringify({
      projectType: value.projectType,
      backend: value.backend,
      frontend: value.frontend,
    });
  return snapshot(preset.config) === snapshot(config);
}

export const StackBuilderPreview: React.FC = () => {
  const {
    config,
    validation,
    activeInspectorTab,
    setProjectName,
    setProjectType,
    setBackendDotnetVersion,
    setBackendOrm,
    setBackendDatabase,
    toggleSignalR,
    toggleHangfire,
    setFrontendFramework,
    setFrontendTooling,
    setFrontendLanguage,
    setFrontendStyling,
    setFrontendState,
    setFrontendUi,
    setActiveInspectorTab,
    applyPreset,
  } = useStackBuilderStore();

  const currentCapabilityMatrix =
    FRONTEND_CAPABILITY_MATRIX[config.frontend.framework];

  const dotnetDisplay = getDotnetDisplay(config.backend.dotnetVersion);
  const targetFrameworkMoniker = getDotnetTargetFramework(
    config.backend.dotnetVersion,
  );

  const projectNameError = validation.errors.find((err) =>
    err.toLowerCase().includes("project name"),
  );

  const manifestJson = JSON.stringify(
    {
      $schema: "https://appforge.dev/schemas/fullstack-app.v1.json",
      name: config.projectName || "my-app",
      version: "1.0.0",
      type: config.projectType,
      backend:
        config.projectType === "frontend"
          ? null
          : {
              framework: "dotnet",
              version: config.backend.dotnetVersion,
              targetFramework: targetFrameworkMoniker,
              architecture: "CleanArchitecture",
              pattern: "CQRS_MediatR",
              orm: config.backend.orm.toLowerCase().replace(" ", ""),
              database: config.backend.database.toLowerCase().replace(" ", ""),
              authentication: "Identity_JWT",
              features: {
                signalR: config.backend.signalR,
                hangfire: config.backend.hangfire,
                docker: config.backend.includeDocker,
                swagger: config.backend.includeSwagger,
              },
            },
      frontend:
        config.projectType === "backend"
          ? null
          : {
              framework: config.frontend.framework.toLowerCase(),
              tooling: config.frontend.tooling.toLowerCase().replace(/ /g, "-"),
              language: config.frontend.language === "TypeScript" ? "ts" : "js",
              styling:
                config.frontend.styling === "Tailwind CSS"
                  ? "tailwind"
                  : "bootstrap",
              stateManagement:
                config.frontend.state === "None"
                  ? "none"
                  : config.frontend.state.toLowerCase().replace(/ /g, "-"),
              uiLibrary: config.frontend.ui.toLowerCase().replace(/[\/\s]/g, "-"),
              i18n: config.frontend.includeI18n,
            },
    },
    null,
    2,
  );

  const cliFlags: string[] = [];
  cliFlags.push(`--type ${config.projectType}`);
  if (config.projectType !== "frontend") {
    cliFlags.push(`--dotnet ${config.backend.dotnetVersion}`);
    cliFlags.push(`--orm ${config.backend.orm.toLowerCase().replace(" ", "")}`);
    cliFlags.push(
      `--db ${config.backend.database.toLowerCase().replace(" ", "")}`,
    );
    if (config.backend.signalR) cliFlags.push(`--signalr`);
    if (config.backend.hangfire) cliFlags.push(`--hangfire`);
  }
  if (config.projectType !== "backend") {
    cliFlags.push(`--fe-framework ${config.frontend.framework.toLowerCase()}`);
    cliFlags.push(
      `--fe-tooling ${config.frontend.tooling.toLowerCase().replace(/ /g, "-")}`,
    );
    cliFlags.push(
      `--lang ${config.frontend.language === "TypeScript" ? "ts" : "js"}`,
    );
    cliFlags.push(
      `--styling ${config.frontend.styling === "Tailwind CSS" ? "tailwind" : "bootstrap"}`,
    );
    cliFlags.push(
      `--state ${config.frontend.state.toLowerCase().replace(/ /g, "-")}`,
    );
    cliFlags.push(
      `--ui ${config.frontend.ui.toLowerCase().replace(/[\/\s]/g, "-")}`,
    );
  }
  const generatedCliCommand = `npx generate-fullstack-app ${config.projectName || "my-app"} ${cliFlags.join(" ")}`;

  return (
    <section id="builder" className="relative overflow-hidden border-t border-white/5 py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.12),transparent_60%)]" />
      <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-cyan-500/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="indigo" dot size="md">
            Interactive Stack Builder Studio
          </Badge>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            Configure Your Target Architecture
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
            Experiment with stack configurations. Dependency rules strictly enforce framework compatibility
            between .NET runtimes, frontend frameworks, state libraries, and UI systems.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span className="mr-1 text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
              Presets
            </span>
            {Object.values(STACK_PRESETS).map((preset) => (
              <PresetChip
                key={preset.id}
                selected={isPresetSelected(preset, config)}
                onClick={() => applyPreset(preset.id)}
                title={preset.description}
              >
                {preset.name}
              </PresetChip>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-6 lg:col-span-7">
            <SectionCard
              icon={<Sliders className="h-4 w-4" />}
              title="1. Project Settings & Scope"
              stepLabel="Step 1 of 3"
            >
              <div>
                <label
                  htmlFor="projectName"
                  className="mb-2.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-400"
                >
                  Project Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="projectName"
                  type="text"
                  value={config.projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. MyEcommerceApp"
                  className={`w-full rounded-2xl border bg-[#090c14] px-4 py-3.5 font-mono text-[15px] text-white placeholder-zinc-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-200 focus:outline-none focus:ring-2 ${
                    projectNameError
                      ? "border-red-500/70 focus:border-red-400 focus:ring-red-500/20"
                      : "border-white/10 focus:border-indigo-400/80 focus:ring-indigo-500/25"
                  }`}
                />
                {projectNameError ? (
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
                    <AlertOctagon className="h-3.5 w-3.5 shrink-0" />
                    <span>{projectNameError}</span>
                  </p>
                ) : null}
              </div>

              <SelectionGroup label="Project Mode">
                <OptionCard
                  layout="tile"
                  accent="indigo"
                  selected={config.projectType === "fullstack"}
                  onClick={() => setProjectType("fullstack")}
                  icon={
                    <Layers
                      className={`h-6 w-6 ${config.projectType === "fullstack" ? "text-indigo-300" : "text-zinc-500"}`}
                    />
                  }
                  title="Full Stack"
                  description="Backend + Frontend"
                />
                <OptionCard
                  layout="tile"
                  accent="cyan"
                  selected={config.projectType === "backend"}
                  onClick={() => setProjectType("backend")}
                  icon={
                    <Server
                      className={`h-6 w-6 ${config.projectType === "backend" ? "text-cyan-300" : "text-zinc-500"}`}
                    />
                  }
                  title="Backend Only"
                  description="ASP.NET Core API"
                />
                <OptionCard
                  layout="tile"
                  accent="purple"
                  selected={config.projectType === "frontend"}
                  onClick={() => setProjectType("frontend")}
                  icon={
                    <Layout
                      className={`h-6 w-6 ${config.projectType === "frontend" ? "text-purple-300" : "text-zinc-500"}`}
                    />
                  }
                  title="Frontend Only"
                  description="React / Angular SPA"
                />
              </SelectionGroup>
            </SectionCard>

            {config.projectType !== "frontend" && (
              <SectionCard
                icon={<Server className="h-4 w-4 text-cyan-300" />}
                title="2. Backend Architecture"
                badge={
                  <Badge variant="sky" size="sm">
                    Clean Architecture + CQRS
                  </Badge>
                }
              >
                <SelectionGroup label=".NET Runtime Version">
                  {SUPPORTED_DOTNET_VERSIONS.map((ver) => {
                    const info = DOTNET_VERSIONS[ver];
                    return (
                      <OptionCard
                        key={ver}
                        accent="cyan"
                        selected={config.backend.dotnetVersion === ver}
                        onClick={() => setBackendDotnetVersion(ver)}
                        title={info.label}
                      />
                    );
                  })}
                </SelectionGroup>

                <SelectionGroup label="Data Access & ORM" columns={2}>
                  {(["EF Core", "Dapper"] as const).map((orm) => (
                    <OptionCard
                      key={orm}
                      accent="cyan"
                      selected={config.backend.orm === orm}
                      onClick={() => setBackendOrm(orm)}
                      title={orm}
                    />
                  ))}
                </SelectionGroup>

                <SelectionGroup label="Target Database">
                  {(["PostgreSQL", "SQL Server", "SQLite"] as const).map((db) => (
                    <OptionCard
                      key={db}
                      accent="cyan"
                      selected={config.backend.database === db}
                      onClick={() => setBackendDatabase(db)}
                      title={db}
                    />
                  ))}
                </SelectionGroup>

                <SelectionGroup label="Enterprise Modules" columns={2}>
                  <OptionCard
                    accent="cyan"
                    selected={config.backend.signalR}
                    onClick={toggleSignalR}
                    icon={<Radio className="h-3.5 w-3.5 text-cyan-400" />}
                    title="SignalR Real-Time"
                    trailing={
                      <span
                        className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                          config.backend.signalR
                            ? "bg-cyan-500/20 text-cyan-300"
                            : "bg-white/5 text-zinc-500"
                        }`}
                      >
                        {config.backend.signalR ? "ON" : "OFF"}
                      </span>
                    }
                  />
                  <OptionCard
                    accent="cyan"
                    selected={config.backend.hangfire}
                    onClick={toggleHangfire}
                    icon={<Flame className="h-3.5 w-3.5 text-orange-400" />}
                    title="Hangfire Background Jobs"
                    trailing={
                      <span
                        className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                          config.backend.hangfire
                            ? "bg-orange-500/20 text-orange-300"
                            : "bg-white/5 text-zinc-500"
                        }`}
                      >
                        {config.backend.hangfire ? "ON" : "OFF"}
                      </span>
                    }
                  />
                </SelectionGroup>
              </SectionCard>
            )}

            {config.projectType !== "backend" && (
              <SectionCard
                icon={<Layout className="h-4 w-4 text-purple-300" />}
                title={
                  config.projectType === "fullstack"
                    ? "3. Frontend Stack"
                    : "2. Frontend Stack"
                }
                badge={
                  <Badge
                    variant={config.frontend.framework === "React" ? "indigo" : "sky"}
                    size="sm"
                  >
                    {config.frontend.framework} Ecosystem
                  </Badge>
                }
              >
                <SelectionGroup label="Framework" columns={2}>
                  {(["React", "Angular"] as const).map((fw) => (
                    <OptionCard
                      key={fw}
                      accent="purple"
                      selected={config.frontend.framework === fw}
                      onClick={() => setFrontendFramework(fw)}
                      title={fw}
                    />
                  ))}
                </SelectionGroup>

                <SelectionGroup
                  label="Supported Tooling"
                  hint={`(${config.frontend.framework} only)`}
                >
                  {currentCapabilityMatrix.tooling.map((tool) => (
                    <OptionCard
                      key={tool}
                      accent="purple"
                      selected={config.frontend.tooling === tool}
                      onClick={() => setFrontendTooling(tool)}
                      title={tool}
                    />
                  ))}
                </SelectionGroup>

                <SelectionGroup
                  label="State Management"
                  hint={`(${config.frontend.framework} only)`}
                >
                  {currentCapabilityMatrix.state.map((st) => (
                    <OptionCard
                      key={st}
                      accent="purple"
                      selected={config.frontend.state === st}
                      onClick={() => setFrontendState(st)}
                      title={st}
                    />
                  ))}
                </SelectionGroup>

                <SelectionGroup
                  label="UI Component System"
                  hint={`(${config.frontend.framework} only)`}
                >
                  {currentCapabilityMatrix.ui.map((ui) => (
                    <OptionCard
                      key={ui}
                      accent="purple"
                      selected={config.frontend.ui === ui}
                      onClick={() => setFrontendUi(ui)}
                      title={ui}
                    />
                  ))}
                </SelectionGroup>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <SelectionGroup label="Language" columns={2}>
                    {(["TypeScript", "JavaScript"] as const).map((lang) => (
                      <OptionCard
                        key={lang}
                        accent="purple"
                        selected={config.frontend.language === lang}
                        onClick={() => setFrontendLanguage(lang)}
                        title={lang}
                      />
                    ))}
                  </SelectionGroup>

                  <SelectionGroup label="Styling" columns={2}>
                    {currentCapabilityMatrix.styling.map((sty) => (
                      <OptionCard
                        key={sty}
                        accent="purple"
                        selected={config.frontend.styling === sty}
                        onClick={() => setFrontendStyling(sty)}
                        title={sty}
                      />
                    ))}
                  </SelectionGroup>
                </div>
              </SectionCard>
            )}
          </div>

          <div className="space-y-4 lg:sticky lg:top-24 lg:col-span-5">
            {!validation.isValid ? (
              <div className="rounded-2xl border border-red-500/25 bg-red-500/8 p-4 text-xs text-red-200 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.8)] backdrop-blur-md">
                <div className="mb-2 flex items-center gap-2 font-semibold text-red-300">
                  <AlertOctagon className="h-4 w-4 shrink-0" />
                  <span>Architecture Preview Blocked</span>
                </div>
                <ul className="list-disc space-y-1 pl-6 text-red-200/90">
                  {validation.errors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <StatusBadge valid>
                Stack Verified: Compatible with {dotnetDisplay}.
              </StatusBadge>
            )}

            <PreviewPanel
              header={
                <BuilderTabs
                  tabs={[
                    {
                      id: "tree" as const,
                      label: "Architecture",
                      icon: <FolderTree className="h-3.5 w-3.5" />,
                    },
                    {
                      id: "manifest" as const,
                      label: ".fullstack-app.json",
                      icon: <FileCode2 className="h-3.5 w-3.5" />,
                    },
                    {
                      id: "cli" as const,
                      label: "CLI Run",
                      icon: <Terminal className="h-3.5 w-3.5" />,
                    },
                  ]}
                  active={activeInspectorTab}
                  onChange={setActiveInspectorTab}
                  trailing={
                    <Badge variant={validation.isValid ? "emerald" : "amber"} size="sm">
                      {validation.isValid ? "Valid" : "Invalid"}
                    </Badge>
                  }
                />
              }
            >
              {!validation.isValid ? (
                <div className="space-y-2 p-8 text-center font-mono text-xs text-red-400">
                  <AlertOctagon className="mx-auto mb-2 h-8 w-8 text-red-400" />
                  <p className="font-semibold">Cannot render architecture preview.</p>
                  <p className="text-zinc-400">
                    Fix the validation errors above to resume live architecture scaffolding.
                  </p>
                </div>
              ) : (
                <>
                  {activeInspectorTab === "tree" && (
                    <ArchitectureTree
                      config={config}
                      dotnetDisplay={dotnetDisplay}
                      targetFrameworkMoniker={targetFrameworkMoniker}
                    />
                  )}

                  {activeInspectorTab === "manifest" && (
                    <div className="p-2">
                      <CodeBlock
                        code={manifestJson}
                        language="json"
                        filename=".fullstack-app.json"
                        showLineNumbers
                        className="border-none bg-transparent shadow-none"
                      />
                    </div>
                  )}

                  {activeInspectorTab === "cli" && (
                    <div className="space-y-4 p-4">
                      <p className="text-xs leading-relaxed text-zinc-400">
                        Run this command in your terminal to scaffold this architecture:
                      </p>
                      <CodeBlock
                        code={generatedCliCommand}
                        language="bash"
                        filename="terminal"
                      />
                      <div className="space-y-1 rounded-xl border border-white/8 bg-white/[0.03] p-3 font-mono text-xs text-zinc-400">
                        <div className="font-semibold text-zinc-300">
                          {"// Configuration Summary:"}
                        </div>
                        <div>• Scope: {config.projectType}</div>
                        {config.projectType !== "frontend" && (
                          <div>
                            • Backend: {dotnetDisplay} ({targetFrameworkMoniker}),{" "}
                            {config.backend.orm}, {config.backend.database}
                          </div>
                        )}
                        {config.projectType !== "backend" && (
                          <div>
                            • Frontend: {config.frontend.framework} (
                            {config.frontend.tooling}), {config.frontend.language},{" "}
                            {config.frontend.styling}, {config.frontend.state},{" "}
                            {config.frontend.ui}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </PreviewPanel>

            <div className="flex items-start gap-3 rounded-xl border border-indigo-500/20 bg-indigo-500/8 p-4 text-xs leading-relaxed text-indigo-200">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
              <p>
                <strong className="font-semibold text-indigo-100">Architecture-Aware Matrix:</strong>{" "}
                AppForge dynamically validates dependencies and target runtime ({dotnetDisplay}) to
                ensure that every scaffolded stack produces a 100% buildable, production-ready
                codebase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
