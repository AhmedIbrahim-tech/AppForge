import React from "react";
import {
  Sparkles,
  FolderTree,
  FileCode2,
  Terminal,
  AlertOctagon,
  Info,
} from "lucide-react";
import { useStackBuilderStore } from "@/features/stack-builder/store/stackBuilderStore";
import { Badge } from "@/shared/components/ui/Badge";
import {
  BuilderTabs,
  PreviewPanel,
  StatusBadge,
  PresetBar,
  StackSummaryBar,
} from "./ui";
import { ProjectSection } from "./ProjectSection";
import { BackendSection } from "./BackendSection";
import { FrontendSection } from "./FrontendSection";
import { ProjectToolingSection } from "./ProjectToolingSection";
import { ArchitectureTree } from "./ArchitectureTree";
import { ConfigPreview } from "./ConfigPreview";
import { CliPreview } from "./CliPreview";
import { BuilderActions } from "./BuilderActions";

export const StackBuilderPreview: React.FC = () => {
  const {
    config,
    validation,
    activeInspectorTab,
    expandedSections,
    setProjectName,
    setProjectType,
    setBackendPresentation,
    setBackendArchitecture,
    setBackendOrm,
    setBackendDatabase,
    setBackendAuth,
    setBackendMapping,
    setBackendLogging,
    toggleSignalR,
    toggleHangfire,
    toggleSwagger,
    setFrontendFramework,
    setFrontendTooling,
    setFrontendLanguage,
    setFrontendStyling,
    setFrontendState,
    setFrontendHttpClient,
    setFrontendForms,
    setFrontendUi,
    toggleFrontendI18n,
    setPackageManager,
    setActiveInspectorTab,
    toggleSectionExpanded,
    applyPreset,
  } = useStackBuilderStore();

  return (
    <section
      id="builder"
      className="relative overflow-hidden border-t border-white/[0.06] py-14 sm:py-20"
    >
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-25" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_65%)]" />

      <div className="relative mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Top Header */}
        <div className="mx-auto max-w-3xl text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-medium text-indigo-300 backdrop-blur-sm mb-3">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>Interactive Stack Builder</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Visual Stack Builder
          </h2>
          <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-zinc-400">
            Configure full-stack, backend, or frontend architectures with synchronized live validation and real Flatron CLI flags.
          </p>
        </div>

        {/* Compact Horizontal Preset Bar */}
        <div className="mb-4">
          <PresetBar config={config} onSelectPreset={applyPreset} />
        </div>

        {/* Live Stack Summary Bar */}
        <div className="mb-8">
          <StackSummaryBar config={config} />
        </div>

        {/* Main 2-Column Responsive Builder Layout */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Compact Collapsible Configuration (58% width on desktop) */}
          <div className="space-y-4 lg:col-span-7">
            {/* 1. Project Section */}
            <ProjectSection
              config={config}
              validation={validation}
              expanded={expandedSections.project}
              onToggle={() => toggleSectionExpanded("project")}
              onSetName={setProjectName}
              onSetType={setProjectType}
            />

            {/* 2. Backend Section */}
            <BackendSection
              config={config}
              expanded={expandedSections.backend}
              onToggle={() => toggleSectionExpanded("backend")}
              onSetProjectType={setProjectType}
              onSetPresentation={setBackendPresentation}
              onSetArchitecture={setBackendArchitecture}
              onSetOrm={setBackendOrm}
              onSetDatabase={setBackendDatabase}
              onSetAuth={setBackendAuth}
              onSetMapping={setBackendMapping}
              onSetLogging={setBackendLogging}
              onToggleSignalR={toggleSignalR}
              onToggleHangfire={toggleHangfire}
              onToggleSwagger={toggleSwagger}
            />

            {/* 3. Frontend Section */}
            <FrontendSection
              config={config}
              expanded={expandedSections.frontend}
              onToggle={() => toggleSectionExpanded("frontend")}
              onSetProjectType={setProjectType}
              onSetFramework={setFrontendFramework}
              onSetTooling={setFrontendTooling}
              onSetLanguage={setFrontendLanguage}
              onSetStyling={setFrontendStyling}
              onSetState={setFrontendState}
              onSetHttpClient={setFrontendHttpClient}
              onSetForms={setFrontendForms}
              onSetUi={setFrontendUi}
              onToggleI18n={toggleFrontendI18n}
            />

            {/* 4. Project Tooling Section */}
            <ProjectToolingSection
              config={config}
              expanded={expandedSections.tooling ?? false}
              onToggle={() => toggleSectionExpanded("tooling")}
              onSetPackageManager={setPackageManager}
            />

            {/* 5. Builder Sticky Action Bar */}
            <BuilderActions config={config} validation={validation} />
          </div>

          {/* Right Column: Sticky Live Inspector Preview (42% width on desktop) */}
          <div className="space-y-4 lg:sticky lg:top-20 lg:col-span-5">
            {/* Live Validation Banner */}
            {!validation.isValid ? (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-200">
                <div className="mb-1.5 flex items-center gap-2 font-semibold text-red-300">
                  <AlertOctagon className="h-4 w-4 shrink-0 text-red-400" />
                  <span>Validation Warning</span>
                </div>
                <ul className="list-disc space-y-1 pl-5 text-red-200/90 font-mono text-[11px]">
                  {validation.errors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <StatusBadge valid>
                Verified: Stack ready for Flatron scaffolding.
              </StatusBadge>
            )}

            {/* Live Preview Panel with Architecture, Config & CLI Tabs */}
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
                      id: "config" as const,
                      label: "Config",
                      icon: <FileCode2 className="h-3.5 w-3.5" />,
                    },
                    {
                      id: "cli" as const,
                      label: "CLI",
                      icon: <Terminal className="h-3.5 w-3.5" />,
                    },
                  ]}
                  active={activeInspectorTab}
                  onChange={setActiveInspectorTab}
                  trailing={
                    <Badge
                      variant={validation.isValid ? "emerald" : "amber"}
                      size="sm"
                    >
                      {validation.isValid ? "Valid" : "Invalid"}
                    </Badge>
                  }
                />
              }
            >
              {!validation.isValid ? (
                <div className="space-y-2 p-8 text-center font-mono text-xs text-red-400">
                  <AlertOctagon className="mx-auto mb-2 h-7 w-7 text-red-400" />
                  <p className="font-semibold text-sm">Cannot render preview</p>
                  <p className="text-zinc-500 text-xs">
                    Resolve the highlighted compatibility constraints to resume architecture inspection.
                  </p>
                </div>
              ) : (
                <>
                  {activeInspectorTab === "tree" && (
                    <ArchitectureTree
                      config={config}
                      dotnetDisplay=".NET 10"
                      targetFrameworkMoniker="net10.0"
                    />
                  )}

                  {activeInspectorTab === "config" && (
                    <ConfigPreview config={config} />
                  )}

                  {activeInspectorTab === "cli" && (
                    <CliPreview config={config} />
                  )}
                </>
              )}
            </PreviewPanel>

            {/* Informational Guidance */}
            <div className="flex items-start gap-2.5 rounded-xl border border-white/8 bg-white/[0.02] p-3 text-xs leading-relaxed text-zinc-400">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-400" />
              <p>
                All 5 surfaces (Controls, Presets, Summary, Architecture/Config, and CLI) derive synchronously from one canonical configuration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
