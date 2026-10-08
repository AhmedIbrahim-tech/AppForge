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
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border-subtle bg-surface p-3 sm:px-4 shadow-xs">
      <span className="text-xs font-mono font-medium text-text-muted select-none mr-1">
        Target Stack:
      </span>

      {/* Project Scope */}
      {projectChips.map((chip) => (
        <span
          key={chip.id}
          className="inline-flex items-center gap-1 rounded-lg bg-surface-secondary border border-border-subtle px-2.5 py-1 font-mono text-xs font-semibold text-text-primary"
        >
          {chip.label}
        </span>
      ))}

      {/* Backend Group */}
      {backendChips.length > 0 && (
        <div className="inline-flex flex-wrap items-center gap-1.5 pl-2 border-l border-border-subtle">
          <span className="text-[11px] font-mono text-text-muted select-none">
            Backend:
          </span>
          {backendChips.map((chip) => (
            <span
              key={chip.id}
              className="inline-flex items-center gap-1 rounded-lg bg-surface-secondary border border-border-subtle px-2 py-0.5 font-mono text-xs text-text-secondary"
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
        <div className="inline-flex flex-wrap items-center gap-1.5 pl-2 border-l border-border-subtle">
          <span className="text-[11px] font-mono text-text-muted select-none">
            Frontend:
          </span>
          {frontendChips.map((chip) => (
            <span
              key={chip.id}
              className="inline-flex items-center gap-1 rounded-lg bg-surface-secondary border border-border-subtle px-2 py-0.5 font-mono text-xs text-text-secondary"
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
        <div className="inline-flex flex-wrap items-center gap-1.5 pl-2 border-l border-border-subtle">
          {advancedChips.map((chip) => (
            <span
              key={chip.id}
              className="inline-flex items-center gap-1 rounded-lg bg-accent-subtle border border-accent-border px-2 py-0.5 font-mono text-xs text-accent-text font-semibold"
            >
              <span>{chip.label}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
