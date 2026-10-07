import React from "react";
import { Wrench } from "lucide-react";
import { CollapsibleSection, OptionPill } from "./ui";
import { PACKAGE_MANAGERS } from "../capabilities";
import type { StackConfiguration, PackageManager } from "../types";

export interface ProjectToolingSectionProps {
  config: StackConfiguration;
  expanded: boolean;
  onToggle: () => void;
  onSetPackageManager: (pm: PackageManager) => void;
}

export const ProjectToolingSection: React.FC<ProjectToolingSectionProps> = ({
  config,
  expanded,
  onToggle,
  onSetPackageManager,
}) => {
  const summaryBadges = [config.packageManager || "npm"];

  return (
    <CollapsibleSection
      id="project-tooling-section"
      icon={<Wrench className="h-3.5 w-3.5" />}
      title="Project Tooling"
      summaryBadges={summaryBadges}
      expanded={expanded}
      onToggle={onToggle}
    >
      <div className="space-y-3">
        <div>
          <span className="mb-1 block text-xs font-mono text-[#737D8C]">
            Node Package Manager
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {PACKAGE_MANAGERS.map((pm) => (
              <OptionPill
                key={pm.value}
                selected={(config.packageManager || "npm") === pm.value}
                onClick={() => onSetPackageManager(pm.value)}
                label={pm.label}
              />
            ))}
          </div>
          <p className="mt-1.5 text-[11px] text-[#737D8C]">
            Package manager used for client scaffolding and dependency installation.
          </p>
        </div>
      </div>
    </CollapsibleSection>
  );
};
