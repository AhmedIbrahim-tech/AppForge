import React from "react";
import { generateStackSummary } from "../../capabilities";
import type { StackConfiguration } from "../../types";

export interface StackSummaryBarProps {
  config: StackConfiguration;
}

export const StackSummaryBar: React.FC<StackSummaryBarProps> = ({ config }) => {
  const chips = generateStackSummary(config);

  const projectChips = chips.filter((c) => c.category === "project");
  const backendChips = chips.filter((c) => c.category === "backend");
  const frontendChips = chips.filter((c) => c.category === "frontend");
  const advancedChips = chips.filter((c) => c.category === "advanced");


  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-[6px] border border-border-subtle bg-surface p-2 sm:px-3 sm:py-2">
      <span className="text-[11px] font-mono text-text-muted mr-1 select-none">
        Target Stack:
      </span>

      {/* Project Scope */}
      {projectChips.map((chip) => (
        <span
          key={chip.id}
          className="inline-flex items-center gap-1 rounded-[4px] bg-surface-raised border border-border-subtle px-2 py-0.5 font-mono text-xs font-medium text-white"
        >
          {chip.label}
        </span>
      ))}

      {/* Backend Group */}
      {backendChips.length > 0 && (
        <div className="inline-flex flex-wrap items-center gap-1.5 pl-1.5 border-l border-border-line">
          <span className="text-[10px] font-mono text-text-muted select-none">
            Backend:
          </span>
          {backendChips.map((chip) => (
            <span
              key={chip.id}
              className="inline-flex items-center gap-1 rounded-[4px] bg-surface-secondary border border-border-subtle px-1.5 py-0.5 font-mono text-xs text-text-secondary"
            >
              <span>{chip.label}</span>
              {chip.detail ? (
                <span className="text-text-muted text-[10px]">({chip.detail})</span>
              ) : null}
            </span>
          ))}
        </div>
      )}

      {/* Frontend Group */}
      {frontendChips.length > 0 && (
        <div className="inline-flex flex-wrap items-center gap-1.5 pl-1.5 border-l border-border-line">
          <span className="text-[10px] font-mono text-text-muted select-none">
            Frontend:
          </span>
          {frontendChips.map((chip) => (
            <span
              key={chip.id}
              className="inline-flex items-center gap-1 rounded-[4px] bg-surface-secondary border border-border-subtle px-1.5 py-0.5 font-mono text-xs text-text-secondary"
            >
              <span>{chip.label}</span>
              {chip.detail ? (
                <span className="text-text-muted text-[10px]">({chip.detail})</span>
              ) : null}
            </span>
          ))}
        </div>
      )}

      {/* Optional Features Group */}
      {advancedChips.length > 0 && (
        <div className="inline-flex flex-wrap items-center gap-1.5 pl-1.5 border-l border-border-line">
          {advancedChips.map((chip) => (
            <span
              key={chip.id}
              className="inline-flex items-center gap-1 rounded-[4px] bg-accent-subtle border border-accent-border px-1.5 py-0.5 font-mono text-xs text-accent-hover font-medium"
            >
              <span>{chip.label}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

