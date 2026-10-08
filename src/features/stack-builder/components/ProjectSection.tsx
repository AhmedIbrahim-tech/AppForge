import React from "react";
import { Sliders, Layers, Server, Layout, AlertOctagon } from "lucide-react";
import { CollapsibleSection, OptionCard } from "./ui";
import { PROJECT_MODES } from "../capabilities";
import type { ProjectType, StackConfiguration, ValidationResult } from "../types";

export interface ProjectSectionProps {
  config: StackConfiguration;
  validation: ValidationResult;
  expanded: boolean;
  onToggle: () => void;
  onSetName: (name: string) => void;
  onSetType: (type: ProjectType) => void;
}

export const ProjectSection: React.FC<ProjectSectionProps> = ({
  config,
  validation,
  expanded,
  onToggle,
  onSetName,
  onSetType,
}) => {
  const projectNameError = validation.errors.find((err) =>
    err.toLowerCase().includes("project name"),
  );

  const modeIcons = {
    fullstack: <Layers className="h-4 w-4" />,
    backend: <Server className="h-4 w-4" />,
    frontend: <Layout className="h-4 w-4" />,
  };

  const modeLabel =
    config.projectType === "fullstack"
      ? "Full Stack"
      : config.projectType === "backend"
        ? "Backend Only"
        : "Frontend Only";

  return (
    <CollapsibleSection
      id="project-section"
      icon={<Sliders className="h-4 w-4 text-accent" />}
      title="Project Scope"
      summaryBadges={[modeLabel, config.projectName || "nexus-app"]}
      expanded={expanded}
      onToggle={onToggle}
      badge={
        <span className="rounded-md bg-surface-secondary border border-border-subtle px-2 py-0.5 font-mono text-[11px] text-text-muted uppercase font-medium">
          {config.projectType}
        </span>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Project Name Input */}
        <div>
          <label
            htmlFor="projectName"
            className="mb-1.5 block text-xs font-semibold text-text-secondary"
          >
            Project Name <span className="text-danger">*</span>
          </label>
          <input
            id="projectName"
            type="text"
            value={config.projectName}
            onChange={(e) => onSetName(e.target.value)}
            placeholder="e.g. nexus-app"
            className={`w-full rounded-lg border bg-surface-secondary px-3.5 py-2 font-mono text-xs text-text-primary placeholder:text-text-muted transition-all focus:outline-none focus:ring-2 ${
              projectNameError
                ? "border-danger focus:border-danger focus:ring-danger/30"
                : "border-border-subtle focus:border-accent focus:ring-accent/30 focus:bg-surface"
            }`}
          />
          {projectNameError ? (
            <p className="mt-1.5 flex items-center gap-1 text-[11px] text-danger">
              <AlertOctagon className="h-3 w-3 shrink-0" />
              <span>{projectNameError}</span>
            </p>
          ) : (
            <p className="mt-1.5 text-[11px] text-text-muted">
              Directory &amp; C# namespace identifier.
            </p>
          )}
        </div>

        {/* Fixed .NET Target */}
        <div>
          <span className="mb-1.5 block text-xs font-semibold text-text-secondary">
            Target Framework
          </span>
          <div className="flex items-center justify-between rounded-lg border border-border-subtle bg-surface-secondary px-3.5 py-2 text-xs text-text-secondary">
            <span className="font-mono text-text-primary font-medium">.NET 10 (net10.0)</span>
            <span className="text-info text-[11px] font-mono font-semibold bg-info/10 px-2 py-0.5 rounded border border-info/20">
              C# 14 / LTS
            </span>
          </div>
          <p className="mt-1.5 text-[11px] text-text-muted">
            Pre-configured with latest SDK runtime features.
          </p>
        </div>
      </div>

      {/* Project Mode Cards */}
      <div className="pt-2">
        <span className="mb-2 block text-xs font-semibold text-text-secondary">
          Architecture Scope
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {PROJECT_MODES.map((mode) => (
            <OptionCard
              key={mode.value}
              layout="compact"
              selected={config.projectType === mode.value}
              onClick={() => onSetType(mode.value)}
              icon={modeIcons[mode.value]}
              title={mode.label}
              description={mode.description}
            />
          ))}
        </div>
      </div>
    </CollapsibleSection>
  );
};
