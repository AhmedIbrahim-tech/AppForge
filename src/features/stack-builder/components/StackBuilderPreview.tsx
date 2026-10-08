import React from "react";
import {
  FolderTree,
  FileCode2,
  Terminal,
  AlertOctagon,
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
      className="relative border-b border-border-subtle bg-base py-12 sm:py-16"
    >
      <div className="app-container">
        {/* Top Header */}
        <div className="max-w-2xl mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3 py-1 font-mono text-xs font-medium text-text-secondary shadow-xs mb-2">
            <span className="flex h-2 w-2 rounded-full bg-accent" />
            <span>Interactive Configurator</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl font-heading">
            Visual Stack Builder
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
            Configure your application stack with verified architectural compatibility and export a reproducible CLI command.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="mb-4">
          <PresetBar config={config} onSelectPreset={applyPreset} />
        </div>

        {/* Live Stack Summary Bar */}
        <div className="mb-6">
          <StackSummaryBar config={config} />
        </div>

        {/* 2-Column Responsive Builder Layout (60% / 40%) */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          {/* Left: Collapsible Configuration Sections */}
          <div className="space-y-4 lg:col-span-7 xl:col-span-7">
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

          {/* Right: Sticky Live Inspector Preview */}
          <div className="space-y-4 lg:sticky lg:top-20 lg:col-span-5 xl:col-span-5">
            {/* Live Validation Banner */}
            {!validation.isValid ? (
              <div className="rounded-2xl border border-danger/40 bg-danger/10 p-4 text-xs text-danger shadow-xs">
                <div className="mb-1.5 flex items-center gap-1.5 font-bold font-heading">
                  <AlertOctagon className="h-4 w-4 shrink-0" />
                  <span>Validation Warning</span>
                </div>
                <ul className="list-disc space-y-1 pl-4 font-mono text-xs">
                  {validation.errors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <StatusBadge valid>
                Stack validated and ready to scaffold.
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
                <div className="p-8 text-center font-mono text-xs text-danger bg-surface">
                  <AlertOctagon className="mx-auto mb-2 h-7 w-7 text-danger" />
                  <p className="font-bold text-xs">Cannot render architecture preview</p>
                  <p className="text-text-muted text-[11px] mt-1 font-sans">
                    Resolve compatibility constraints to view filesystem output.
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
          </div>
        </div>
      </div>
    </section>
  );
};
