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
      icon={<Sliders className="h-3.5 w-3.5" />}
      title="Project Scope"
      summaryBadges={[modeLabel, config.projectName || "my-flatron-app"]}
      expanded={expanded}
      onToggle={onToggle}
      badge={
        <span className="rounded-[4px] bg-[#151A22] border border-[#252C36] px-1.5 py-0.5 font-mono text-[10px] text-[#737D8C] uppercase">
          {config.projectType}
        </span>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Project Name Input */}
        <div>
          <label
            htmlFor="projectName"
            className="mb-1 block text-xs font-mono font-medium text-[#737D8C]"
          >
            Project Name <span className="text-[#E05A67]">*</span>
          </label>
          <input
            id="projectName"
            type="text"
            value={config.projectName}
            onChange={(e) => onSetName(e.target.value)}
            placeholder="e.g. my-flatron-app"
            className={`w-full rounded-[6px] border bg-[#0E1218] px-3 py-1.5 font-mono text-xs text-[#F3F6FA] placeholder-[#737D8C] transition-colors focus:outline-none focus:ring-1 ${
              projectNameError
                ? "border-[#E05A67] focus:border-[#E05A67] focus:ring-[#E05A67]"
                : "border-[#252C36] focus:border-[#4F75FF] focus:ring-[#4F75FF]"
            }`}
          />
          {projectNameError ? (
            <p className="mt-1 flex items-center gap-1 text-[11px] text-[#E05A67]">
              <AlertOctagon className="h-3 w-3 shrink-0" />
              <span>{projectNameError}</span>
            </p>
          ) : null}
        </div>

        {/* Fixed .NET Target */}
        <div>
          <span className="mb-1 block text-xs font-mono font-medium text-[#737D8C]">
            Target Framework
          </span>
          <div className="flex items-center justify-between rounded-[6px] border border-[#252C36] bg-[#0E1218] px-3 py-1.5 text-xs text-[#A1AAB8]">
            <span className="font-mono text-[#F3F6FA]">.NET 10 (net10.0)</span>
            <span className="text-[#737D8C] text-[11px] font-mono">C# 14 / LTS</span>
          </div>
        </div>
      </div>

      {/* Project Mode Cards */}
      <div className="pt-2">
        <span className="mb-1.5 block text-xs font-mono font-medium text-[#737D8C]">
          Architecture Scope
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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
