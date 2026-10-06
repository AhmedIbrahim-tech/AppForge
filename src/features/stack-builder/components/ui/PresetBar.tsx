import React from "react";
import { Sparkles, Layers } from "lucide-react";
import { STACK_PRESETS } from "../../presets";
import { isPresetActive } from "../../capabilities";
import type { StackConfiguration } from "../../types";

export interface PresetBarProps {
  config: StackConfiguration;
  onSelectPreset: (presetId: string) => void;
}

export const PresetBar: React.FC<PresetBarProps> = ({
  config,
  onSelectPreset,
}) => {
  const presetsList = Object.values(STACK_PRESETS);
  const activePreset = presetsList.find((p) => isPresetActive(p, config));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-400">
            <Sparkles className="h-3 w-3" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Presets
          </span>
        </div>
        <div className="text-xs font-mono text-zinc-500">
          {activePreset ? (
            <span className="text-indigo-300 font-medium">
              Preset: {activePreset.name}
            </span>
          ) : (
            <span className="text-zinc-500 italic">Custom Stack</span>
          )}
        </div>
      </div>

      {/* Horizontal Preset Strip with horizontal scroll */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar scroll-smooth">
        {presetsList.map((preset) => {
          const isSelected = isPresetActive(preset, config);
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset.id)}
              aria-pressed={isSelected}
              title={preset.description}
              className={`group flex shrink-0 items-center gap-2.5 rounded-xl border px-3.5 py-2 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-indigo-400/80 bg-indigo-500/15 text-white shadow-[0_0_20px_-6px_rgba(99,102,241,0.6)] ring-1 ring-indigo-400/40"
                  : "border-white/10 bg-[#0e111b]/80 text-zinc-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold tracking-tight text-white group-hover:text-indigo-200">
                  {preset.name}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  {preset.secondary}
                </span>
              </div>

              {preset.badge ? (
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
                    isSelected
                      ? "bg-indigo-400/25 text-indigo-200"
                      : "bg-white/5 text-zinc-500"
                  }`}
                >
                  {preset.badge}
                </span>
              ) : null}
            </button>
          );
        })}

        {/* Custom stack indicator if no preset matches */}
        {!activePreset && (
          <div className="flex shrink-0 items-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-3 py-2 text-xs font-mono text-zinc-400">
            <Layers className="h-3.5 w-3.5 text-zinc-500" />
            <span>Customized</span>
          </div>
        )}
      </div>
    </div>
  );
};
