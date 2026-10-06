import React from "react";
import { generateStackSummary } from "../../capabilities";
import type { StackConfiguration } from "../../types";

export interface StackSummaryBarProps {
  config: StackConfiguration;
}

export const StackSummaryBar: React.FC<StackSummaryBarProps> = ({ config }) => {
  const chips = generateStackSummary(config);

  const toneClasses = {
    indigo: "border-indigo-500/25 bg-indigo-500/10 text-indigo-300",
    cyan: "border-cyan-500/25 bg-cyan-500/10 text-cyan-300",
    purple: "border-purple-500/25 bg-purple-500/10 text-purple-300",
    amber: "border-amber-500/25 bg-amber-500/10 text-amber-300",
    emerald: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
  };

  const projectChips = chips.filter((c) => c.category === "project");
  const backendChips = chips.filter((c) => c.category === "backend");
  const frontendChips = chips.filter((c) => c.category === "frontend");
  const advancedChips = chips.filter((c) => c.category === "advanced");

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/8 bg-[#090b14]/90 p-3 sm:px-4 sm:py-2.5 backdrop-blur-md">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mr-0.5 select-none">
        Stack:
      </span>

      {/* Project Scope */}
      {projectChips.map((chip) => (
        <span
          key={chip.id}
          className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-0.5 text-xs font-semibold tracking-tight ${toneClasses[chip.tone]}`}
        >
          {chip.label}
        </span>
      ))}

      {/* Backend Group */}
      {backendChips.length > 0 && (
        <div className="inline-flex flex-wrap items-center gap-1.5 pl-1.5 border-l border-white/10">
          <span className="text-[10px] font-mono text-cyan-400/80 uppercase font-medium select-none">
            Backend:
          </span>
          {backendChips.map((chip) => (
            <span
              key={chip.id}
              className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium tracking-tight ${toneClasses[chip.tone]}`}
            >
              <span>{chip.label}</span>
              {chip.detail ? (
                <span className="opacity-60 text-[10px] font-normal">
                  ({chip.detail})
                </span>
              ) : null}
            </span>
          ))}
        </div>
      )}

      {/* Frontend Group */}
      {frontendChips.length > 0 && (
        <div className="inline-flex flex-wrap items-center gap-1.5 pl-1.5 border-l border-white/10">
          <span className="text-[10px] font-mono text-purple-400/80 uppercase font-medium select-none">
            Frontend:
          </span>
          {frontendChips.map((chip) => (
            <span
              key={chip.id}
              className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium tracking-tight ${toneClasses[chip.tone]}`}
            >
              <span>{chip.label}</span>
              {chip.detail ? (
                <span className="opacity-60 text-[10px] font-normal">
                  ({chip.detail})
                </span>
              ) : null}
            </span>
          ))}
        </div>
      )}

      {/* Optional Features Group */}
      {advancedChips.length > 0 && (
        <div className="inline-flex flex-wrap items-center gap-1.5 pl-1.5 border-l border-white/10">
          {advancedChips.map((chip) => (
            <span
              key={chip.id}
              className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium tracking-tight ${toneClasses[chip.tone]}`}
            >
              <span>{chip.label}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
