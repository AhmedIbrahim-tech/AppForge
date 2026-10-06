import React from "react";
import { Sliders, Layers, Server, Layout, Cpu, AlertOctagon } from "lucide-react";
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

  const modeAccents = {
    fullstack: "indigo" as const,
    backend: "cyan" as const,
    frontend: "purple" as const,
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
      icon={<Sliders className="h-4 w-4" />}
      title="Project Scope"
      summaryBadges={[modeLabel, config.projectName || "my-flatron-app"]}
      expanded={expanded}
      onToggle={onToggle}
      accent="indigo"
      badge={
        <span className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 font-mono text-[10px] uppercase font-semibold text-indigo-300">
          {config.projectType}
        </span>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Project Name Input */}
        <div>
          <label
            htmlFor="projectName"
            className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-zinc-400"
          >
            Project Name <span className="text-red-400">*</span>
          </label>
          <input
            id="projectName"
            type="text"
            value={config.projectName}
            onChange={(e) => onSetName(e.target.value)}
            placeholder="e.g. my-flatron-app"
            className={`w-full rounded-xl border bg-[#090c14] px-3.5 py-2 font-mono text-sm text-white placeholder-zinc-500 transition-all focus:outline-none focus:ring-2 ${
              projectNameError
                ? "border-red-500/70 focus:border-red-400 focus:ring-red-500/20"
                : "border-white/10 focus:border-indigo-400/80 focus:ring-indigo-500/25"
            }`}
          />
          {projectNameError ? (
            <p className="mt-1 flex items-center gap-1 text-[11px] text-red-400">
              <AlertOctagon className="h-3 w-3 shrink-0" />
              <span>{projectNameError}</span>
            </p>
          ) : null}
        </div>

        {/* Fixed .NET Target (Informational) */}
        <div>
          <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-zinc-400">
            Target Framework
          </span>
          <div className="flex items-center justify-between rounded-xl border border-cyan-500/25 bg-cyan-500/5 px-3.5 py-2 text-xs text-cyan-200">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-cyan-400" />
              <span className="font-semibold">.NET 10</span>
              <span className="text-[11px] text-cyan-300/80">net10.0</span>
            </div>
            <span className="rounded bg-cyan-400/15 px-1.5 py-0.5 font-mono text-[10px] text-cyan-300">
              Flatron Target
            </span>
          </div>
        </div>
      </div>

      {/* Project Mode Cards */}
      <div>
        <span className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-zinc-400">
          Project Architecture Mode
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {PROJECT_MODES.map((mode) => (
            <OptionCard
              key={mode.value}
              layout="compact"
              accent={modeAccents[mode.value]}
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
