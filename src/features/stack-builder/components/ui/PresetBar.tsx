import React from "react";
import { STACK_PRESETS } from "../../presets";
import { isPresetActive } from "../../capabilities";
import type { StackConfiguration } from "../../types";
import { Sparkles } from "lucide-react";

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
      <div className="flex items-center justify-between gap-3 mb-2 px-1">
        <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-text-muted">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span>Architecture Presets</span>
        </div>
        <span className="text-xs font-mono">
          {activePreset ? (
            <span className="text-accent font-semibold">
              Active: {activePreset.name}
            </span>
          ) : (
            <span className="text-text-muted">Custom Configuration</span>
          )}
        </span>
      </div>

      {/* Horizontal Preset Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5">
        {presetsList.map((preset) => {
          const isSelected = isPresetActive(preset, config);
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset.id)}
              aria-pressed={isSelected}
              title={preset.description}
              className={`flex shrink-0 items-center gap-2.5 rounded-xl border px-3.5 py-2 text-left transition-all duration-150 cursor-pointer ${
                isSelected
                  ? "border-accent/80 bg-accent-subtle text-text-primary font-semibold shadow-xs ring-1 ring-accent/30"
                  : "border-border-subtle bg-surface text-text-secondary hover:border-border-hover hover:bg-surface-secondary hover:text-text-primary"
              }`}
            >
              <div className="flex flex-col">
                <span className="text-xs font-bold text-text-primary font-heading">
                  {preset.name}
                </span>
                <span className="text-[10px] text-text-muted font-mono">
                  {preset.secondary}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
