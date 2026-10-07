import React from "react";
import type { ModuleDefinition } from "../types";

interface ModuleCardProps {
  module: ModuleDefinition;
  isSelected: boolean;
  onSelect: (module: ModuleDefinition) => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(module)}
      className={`group flex flex-col justify-between rounded-lg p-3.5 text-left transition-all cursor-pointer border ${
        isSelected
          ? "border-accent/60 border-l-[3px] border-l-accent bg-accent/[0.07] shadow-sm"
          : "border-border bg-surface hover:bg-surface-raised hover:border-border-hover"
      }`}
    >
      <div>
        {/* Top: Name + Category & ID */}
        <div className="flex items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-sm font-semibold text-text-primary tracking-tight">
              {module.name}
            </span>
            <span className="font-mono text-[10px] text-text-muted">
              {module.id}
            </span>
          </div>
          <span className="text-[11px] font-mono text-text-muted">
            {module.category}
          </span>
        </div>

        {/* Short Purpose Description */}
        <p className="mt-1.5 text-xs text-text-secondary line-clamp-2 leading-relaxed">
          {module.description}
        </p>
      </div>

      {/* Essential requirement tags */}
      <div className="mt-3 flex items-center gap-1.5 border-t border-border-line pt-2 text-[10px] font-mono text-text-muted">
        {module.requiresBackend && <span>.NET Backend</span>}
        {module.requiresBackend && module.requiresFrontend && <span>·</span>}
        {module.requiresFrontend && <span>SPA Client</span>}
        {module.requires.length > 0 && (
          <>
            <span>·</span>
            <span className="text-text-secondary">Needs {module.requires.join(", ")}</span>
          </>
        )}
      </div>
    </button>
  );
};


