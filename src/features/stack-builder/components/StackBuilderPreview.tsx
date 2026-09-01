import React from "react";
import {
  Layers,
  Server,
  Layout,
  FileCode2,
  Terminal,
  FolderTree,
  Sliders,
  CheckCircle2,
  Flame,
  Radio,
  Info,
  AlertOctagon,
  ShieldCheck,
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
import { Badge } from "@/shared/components/ui/Badge";
import { CodeBlock } from "@/shared/components/ui/CodeBlock";

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

  // Compute live manifest JSON using canonical config
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

  // Compute live CLI command with dynamic .NET version and flags
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
  const generatedCliCommand = `npx create-fullstack-app ${config.projectName || "my-app"} ${cliFlags.join(" ")}`;

  return (
    <section id="builder" className="relative py-20 border-t border-zinc-850 bg-[#0a0b12]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="indigo" dot size="md">
            Interactive Stack Builder Studio
          </Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Configure Your Target Architecture
          </h2>
          <p className="mt-3 text-base text-zinc-400">
            Experiment with stack configurations. Dependency rules strictly enforce framework compatibility
            between .NET runtimes, frontend frameworks, state libraries, and UI systems.
          </p>

          {/* Preset buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-mono text-zinc-500 mr-1">Presets:</span>
            {Object.values(STACK_PRESETS).map((preset) => (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                className="rounded-lg border border-zinc-800 bg-zinc-900/90 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-zinc-700 hover:text-white transition-all cursor-pointer"
                title={preset.description}
              >
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Builder Studio Container */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Interactive Controls */}
          <div className="space-y-6 lg:col-span-7">
            {/* Step 1: Project Name & Scope */}
            <div className="rounded-2xl border border-zinc-800/90 bg-[#0e1019] p-5 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-indigo-400" />
                  <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wide font-mono">
                    1. Project Settings & Scope
                  </h3>
                </div>
                <span className="text-xs text-zinc-500 font-mono">Step 1 of 3</span>
              </div>

              <div className="space-y-4">
                {/* Project Name Field */}
                <div>
                  <label htmlFor="projectName" className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                    Project Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="projectName"
                    type="text"
                    value={config.projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g. MyEcommerceApp"
                    className={`w-full rounded-xl border bg-zinc-900/90 px-4 py-2.5 font-mono text-sm text-white placeholder-zinc-500 transition-all focus:outline-none focus:ring-2 ${
                      projectNameError
                        ? "border-red-500/80 focus:border-red-500 focus:ring-red-500/30"
                        : "border-zinc-800 focus:border-indigo-500 focus:ring-indigo-500/30"
                    }`}
                  />
                  {projectNameError && (
                    <p className="mt-1.5 text-xs text-red-400 font-mono flex items-center gap-1">
                      <AlertOctagon className="h-3.5 w-3.5 text-red-400 shrink-0" />
                      <span>{projectNameError}</span>
                    </p>
                  )}
                </div>

                {/* Project Mode Selector */}
                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                    Project Mode:
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setProjectType("fullstack")}
                      className={`flex flex-col items-center justify-center rounded-xl border p-4 text-center transition-all cursor-pointer ${
                        config.projectType === "fullstack"
                          ? "border-indigo-500/80 bg-indigo-950/40 text-white shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                          : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                      }`}
                    >
                      <Layers className={`h-6 w-6 mb-2 ${config.projectType === "fullstack" ? "text-indigo-400" : "text-zinc-500"}`} />
                      <span className="text-sm font-bold">Full Stack</span>
                      <span className="text-[11px] text-zinc-400 mt-1">Backend + Frontend</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setProjectType("backend")}
                      className={`flex flex-col items-center justify-center rounded-xl border p-4 text-center transition-all cursor-pointer ${
                        config.projectType === "backend"
                          ? "border-cyan-500/80 bg-cyan-950/40 text-white shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                          : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                      }`}
                    >
                      <Server className={`h-6 w-6 mb-2 ${config.projectType === "backend" ? "text-cyan-400" : "text-zinc-500"}`} />
                      <span className="text-sm font-bold">Backend Only</span>
                      <span className="text-[11px] text-zinc-400 mt-1">ASP.NET Core API</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setProjectType("frontend")}
                      className={`flex flex-col items-center justify-center rounded-xl border p-4 text-center transition-all cursor-pointer ${
                        config.projectType === "frontend"
                          ? "border-purple-500/80 bg-purple-950/40 text-white shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                          : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                      }`}
                    >
                      <Layout className={`h-6 w-6 mb-2 ${config.projectType === "frontend" ? "text-purple-400" : "text-zinc-500"}`} />
                      <span className="text-sm font-bold">Frontend Only</span>
                      <span className="text-[11px] text-zinc-400 mt-1">React / Angular SPA</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Backend Configuration (if fullstack or backend) */}
            {config.projectType !== "frontend" && (
              <div className="rounded-2xl border border-zinc-800/90 bg-[#0e1019] p-5 shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-cyan-400" />
                    <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wide font-mono">
                      {config.projectType === "fullstack"
                        ? "2. Backend Architecture"
                        : "2. Backend Architecture"}
                    </h3>
                  </div>
                  <Badge variant="sky" size="sm">Clean Architecture + CQRS</Badge>
                </div>

                <div className="space-y-4">
                  {/* .NET Version Selection */}
                  <div>
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                      .NET Runtime Version:
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {SUPPORTED_DOTNET_VERSIONS.map((ver) => {
                        const info = DOTNET_VERSIONS[ver];
                        const isSelected = config.backend.dotnetVersion === ver;
                        return (
                          <button
                            key={ver}
                            type="button"
                            onClick={() => setBackendDotnetVersion(ver)}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? "border-cyan-500 bg-cyan-950/40 text-white shadow-sm"
                                : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                            }`}
                          >
                            <div className="flex flex-col text-left">
                              <span className="truncate">{info.label}</span>
                            </div>
                            {isSelected && (
                              <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 ml-1" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ORM Selection */}
                  <div>
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                      Data Access & ORM:
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {(["EF Core", "Dapper"] as const).map((orm) => (
                        <button
                          key={orm}
                          type="button"
                          onClick={() => setBackendOrm(orm)}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                            config.backend.orm === orm
                              ? "border-cyan-500 bg-cyan-950/40 text-white shadow-sm"
                              : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                          }`}
                        >
                          <span>{orm}</span>
                          {config.backend.orm === orm && (
                            <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Database Selection */}
                  <div>
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                      Target Database:
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {(["PostgreSQL", "SQL Server", "SQLite"] as const).map((db) => (
                        <button
                          key={db}
                          type="button"
                          onClick={() => setBackendDatabase(db)}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                            config.backend.database === db
                              ? "border-cyan-500 bg-cyan-950/40 text-white shadow-sm"
                              : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                          }`}
                        >
                          <span className="truncate">{db}</span>
                          {config.backend.database === db && (
                            <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Architecture & Services Toggles */}
                  <div>
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                      Enterprise Modules:
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={toggleSignalR}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                          config.backend.signalR
                            ? "border-cyan-500/70 bg-cyan-950/30 text-white"
                            : "border-zinc-800/80 bg-zinc-900/30 text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Radio className="h-3.5 w-3.5 text-cyan-400" />
                          <span>SignalR Real-Time</span>
                        </div>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${config.backend.signalR ? "bg-cyan-500/20 text-cyan-300" : "bg-zinc-800 text-zinc-500"}`}>
                          {config.backend.signalR ? "ON" : "OFF"}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={toggleHangfire}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                          config.backend.hangfire
                            ? "border-cyan-500/70 bg-cyan-950/30 text-white"
                            : "border-zinc-800/80 bg-zinc-900/30 text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Flame className="h-3.5 w-3.5 text-orange-400" />
                          <span>Hangfire Background Jobs</span>
                        </div>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${config.backend.hangfire ? "bg-orange-500/20 text-orange-300" : "bg-zinc-800 text-zinc-500"}`}>
                          {config.backend.hangfire ? "ON" : "OFF"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Frontend Configuration (if fullstack or frontend) */}
            {config.projectType !== "backend" && (
              <div className="rounded-2xl border border-zinc-800/90 bg-[#0e1019] p-5 shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Layout className="h-4 w-4 text-purple-400" />
                    <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wide font-mono">
                      {config.projectType === "fullstack" ? "3. Frontend Stack" : "2. Frontend Stack"}
                    </h3>
                  </div>
                  <Badge variant={config.frontend.framework === "React" ? "indigo" : "sky"} size="sm">
                    {config.frontend.framework} Ecosystem
                  </Badge>
                </div>

                <div className="space-y-4">
                  {/* Framework Selection */}
                  <div>
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                      Framework:
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {(["React", "Angular"] as const).map((fw) => (
                        <button
                          key={fw}
                          type="button"
                          onClick={() => setFrontendFramework(fw)}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                            config.frontend.framework === fw
                              ? fw === "React"
                                ? "border-purple-500 bg-purple-950/40 text-white"
                                : "border-red-500 bg-red-950/40 text-white"
                              : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{fw}</span>
                          </div>
                          {config.frontend.framework === fw && (
                            <CheckCircle2 className="h-4 w-4 text-purple-400" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tooling Selection (Filtered by Capability Matrix) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                        Supported Tooling:
                      </label>
                      <span className="text-[11px] font-mono text-zinc-500">
                        ({config.frontend.framework} only)
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {currentCapabilityMatrix.tooling.map((tool) => (
                        <button
                          key={tool}
                          type="button"
                          onClick={() => setFrontendTooling(tool)}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                            config.frontend.tooling === tool
                              ? "border-purple-500 bg-purple-950/40 text-white"
                              : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                          }`}
                        >
                          <span className="truncate">{tool}</span>
                          {config.frontend.tooling === tool && (
                            <CheckCircle2 className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* State Management Selection (Filtered by Capability Matrix) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                        State Management:
                      </label>
                      <span className="text-[11px] font-mono text-zinc-500">
                        ({config.frontend.framework} only)
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {currentCapabilityMatrix.state.map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setFrontendState(st)}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                            config.frontend.state === st
                              ? "border-purple-500 bg-purple-950/40 text-white"
                              : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                          }`}
                        >
                          <span className="truncate">{st}</span>
                          {config.frontend.state === st && (
                            <CheckCircle2 className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* UI Component System (Filtered by Capability Matrix) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                        UI Component System:
                      </label>
                      <span className="text-[11px] font-mono text-zinc-500">
                        ({config.frontend.framework} only)
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {currentCapabilityMatrix.ui.map((ui) => (
                        <button
                          key={ui}
                          type="button"
                          onClick={() => setFrontendUi(ui)}
                          className={`flex items-center justify-between px-2.5 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                            config.frontend.ui === ui
                              ? "border-purple-500 bg-purple-950/40 text-white"
                              : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                          }`}
                        >
                          <span className="truncate">{ui}</span>
                          {config.frontend.ui === ui && (
                            <CheckCircle2 className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Language & Styling */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                        Language:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {(["TypeScript", "JavaScript"] as const).map((lang) => (
                          <button
                            key={lang}
                            type="button"
                            onClick={() => setFrontendLanguage(lang)}
                            className={`flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                              config.frontend.language === lang
                                ? "border-purple-500 bg-purple-950/40 text-white"
                                : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                            }`}
                          >
                            <span>{lang}</span>
                            {config.frontend.language === lang && (
                              <CheckCircle2 className="h-3.5 w-3.5 text-purple-400" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                        Styling:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {currentCapabilityMatrix.styling.map((sty) => (
                          <button
                            key={sty}
                            type="button"
                            onClick={() => setFrontendStyling(sty)}
                            className={`flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                              config.frontend.styling === sty
                                ? "border-purple-500 bg-purple-950/40 text-white"
                                : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                            }`}
                          >
                            <span className="truncate">{sty}</span>
                            {config.frontend.styling === sty && (
                              <CheckCircle2 className="h-3.5 w-3.5 text-purple-400" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Inspector & Architecture Tree */}
          <div className="lg:col-span-5 space-y-4">
            {/* Validation Banner if Invalid */}
            {!validation.isValid ? (
              <div className="rounded-2xl border border-red-500/40 bg-red-950/40 p-4 text-xs text-red-200 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-2 font-bold text-red-400 font-mono mb-2">
                  <AlertOctagon className="h-4 w-4 shrink-0 text-red-400" />
                  <span>Architecture Preview Blocked</span>
                </div>
                <ul className="space-y-1 pl-6 list-disc text-red-300">
                  {validation.errors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/20 px-4 py-2.5 text-xs text-emerald-300">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="font-mono">
                  Stack Verified: Compatible with {dotnetDisplay}.
                </span>
              </div>
            )}

            <div className="rounded-2xl border border-zinc-800/90 bg-[#0e1019] overflow-hidden shadow-2xl">
              {/* Tab Selector */}
              <div className="flex items-center justify-between border-b border-zinc-800 bg-[#12141f] px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveInspectorTab("tree")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-xs font-medium transition-all cursor-pointer ${
                      activeInspectorTab === "tree"
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <FolderTree className="h-3.5 w-3.5" />
                    <span>Architecture</span>
                  </button>
                  <button
                    onClick={() => setActiveInspectorTab("manifest")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-xs font-medium transition-all cursor-pointer ${
                      activeInspectorTab === "manifest"
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <FileCode2 className="h-3.5 w-3.5" />
                    <span>.fullstack-app.json</span>
                  </button>
                  <button
                    onClick={() => setActiveInspectorTab("cli")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-xs font-medium transition-all cursor-pointer ${
                      activeInspectorTab === "cli"
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <Terminal className="h-3.5 w-3.5" />
                    <span>CLI Run</span>
                  </button>
                </div>
                <Badge variant={validation.isValid ? "emerald" : "amber"} size="sm">
                  {validation.isValid ? "Valid" : "Invalid"}
                </Badge>
              </div>

              {/* Show error placeholder in tabs if invalid */}
              {!validation.isValid ? (
                <div className="p-8 text-center font-mono text-xs text-red-400 space-y-2">
                  <AlertOctagon className="h-8 w-8 mx-auto text-red-400 mb-2" />
                  <p className="font-bold">Cannot render architecture preview.</p>
                  <p className="text-zinc-400">
                    Fix the validation errors above to resume live architecture scaffolding.
                  </p>
                </div>
              ) : (
                <>
                  {/* Tab 1: Architecture Blueprint Tree */}
                  {activeInspectorTab === "tree" && (
                    <div className="p-4 font-mono text-xs leading-relaxed text-zinc-300 overflow-x-auto max-h-[480px]">
                      <div className="text-zinc-500 mb-2">
                        // Generated clean architecture layout for {config.projectName}:
                      </div>
                      <div className="space-y-1">
                        <div className="text-indigo-400 font-bold">
                          📁 {config.projectName}/
                        </div>
                        <div className="pl-4 text-zinc-400">
                          ├── 📄 .fullstack-app.json{" "}
                          <span className="text-zinc-600">// manifest source</span>
                        </div>

                        {/* Backend tree */}
                        {config.projectType !== "frontend" && (
                          <>
                            <div className="pl-4 text-cyan-400 font-semibold">
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

                        {/* Frontend tree */}
                        {config.projectType !== "backend" && (
                          <>
                            <div className="pl-4 text-purple-400 font-semibold">
                              {config.projectType === "fullstack"
                                ? "└── 📁 src/frontend/"
                                : "├── 📁 src/"}{" "}
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
                    </div>
                  )}

                  {/* Tab 2: Live Manifest JSON */}
                  {activeInspectorTab === "manifest" && (
                    <div className="p-2">
                      <CodeBlock
                        code={manifestJson}
                        language="json"
                        filename=".fullstack-app.json"
                        showLineNumbers
                        className="border-none shadow-none bg-transparent"
                      />
                    </div>
                  )}

                  {/* Tab 3: CLI Command */}
                  {activeInspectorTab === "cli" && (
                    <div className="p-4 space-y-4">
                      <p className="text-xs text-zinc-400">
                        Run this command in your terminal to scaffold this architecture:
                      </p>
                      <CodeBlock
                        code={generatedCliCommand}
                        language="bash"
                        filename="terminal"
                      />
                      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 text-xs text-zinc-400 space-y-1 font-mono">
                        <div className="text-zinc-300 font-semibold">// Configuration Summary:</div>
                        <div>• Scope: {config.projectType}</div>
                        {config.projectType !== "frontend" && (
                          <div>
                            • Backend: {dotnetDisplay} ({targetFrameworkMoniker}), {config.backend.orm}, {config.backend.database}
                          </div>
                        )}
                        {config.projectType !== "backend" && (
                          <div>
                            • Frontend: {config.frontend.framework} ({config.frontend.tooling}), {config.frontend.language}, {config.frontend.styling}, {config.frontend.state}, {config.frontend.ui}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Note alert */}
            <div className="flex items-start gap-3 rounded-xl border border-indigo-500/20 bg-indigo-950/20 p-4 text-xs text-indigo-300">
              <Info className="h-4 w-4 shrink-0 text-indigo-400 mt-0.5" />
              <p>
                <strong>Architecture-Aware Matrix:</strong> AppForge dynamically validates
                dependencies and target runtime ({dotnetDisplay}) to ensure that every scaffolded stack produces a 100% buildable,
                production-ready codebase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
