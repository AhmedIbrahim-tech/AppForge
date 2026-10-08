import React from "react";
import type { ModuleDefinition } from "../types";
import { Check } from "lucide-react";

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
      className={`group flex flex-col justify-between rounded-2xl p-5 text-left transition-all cursor-pointer border ${
        isSelected
          ? "border-accent/80 bg-accent-subtle shadow-xs ring-1 ring-accent/30"
          : "border-border-subtle bg-surface hover:bg-surface-secondary hover:border-border-hover shadow-xs"
      }`}
    >
      <div>
        {/* Top: Name + Category & ID */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-sm font-bold text-text-primary tracking-tight">
                {module.name}
              </span>
              {isSelected && (
                <Check className="h-4 w-4 text-accent font-bold" />
              )}
            </div>
            <span className="font-mono text-[10px] text-text-muted">
              {module.id}
            </span>
          </div>
          <span className="text-[11px] font-mono text-info bg-info/10 px-2 py-0.5 rounded-md border border-info/20 font-medium">
            {module.category}
          </span>
        </div>

        {/* Short Purpose Description */}
        <p className="mt-2.5 text-xs text-text-secondary line-clamp-2 leading-relaxed font-sans">
          {module.description}
        </p>
      </div>

      {/* Essential requirement tags */}
      <div className="mt-4 flex items-center gap-1.5 border-t border-border-subtle pt-3 text-[10px] font-mono text-text-muted">
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
