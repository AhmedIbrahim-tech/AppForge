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
      icon={<Wrench className="h-4 w-4" />}
      title="Project Tooling"
      summaryBadges={summaryBadges}
      expanded={expanded}
      onToggle={onToggle}
      accent="indigo"
    >
      <div className="space-y-4">
        {/* Package Manager */}
        <div>
          <span className="mb-1.5 block text-xs font-medium text-zinc-400">
            Package Manager
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {PACKAGE_MANAGERS.map((pm) => (
              <OptionPill
                key={pm.value}
                accent="indigo"
                selected={(config.packageManager || "npm") === pm.value}
                onClick={() => onSetPackageManager(pm.value)}
                label={pm.label}
              />
            ))}
          </div>
          <p className="mt-2 text-[11px] text-zinc-500">
            Node package manager used by Flatron for dependency installation and client scripts.
          </p>
        </div>
      </div>
    </CollapsibleSection>
  );
};
