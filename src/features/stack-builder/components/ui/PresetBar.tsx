import React from "react";
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
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="text-xs font-mono font-medium text-text-muted">
          Architecture Presets
        </span>
        <span className="text-xs font-mono text-text-muted">
          {activePreset ? (
            <span className="text-white font-medium">
              Preset: {activePreset.name}
            </span>
          ) : (
            <span className="text-text-muted">Custom Stack</span>
          )}
        </span>
      </div>

      {/* Horizontal Preset Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {presetsList.map((preset) => {
          const isSelected = isPresetActive(preset, config);
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset.id)}
              aria-pressed={isSelected}
              title={preset.description}
              className={`flex shrink-0 items-center gap-2 rounded-[6px] border px-3 py-1.5 text-left transition-colors duration-150 cursor-pointer ${
                isSelected
                  ? "border-accent bg-accent-subtle text-white font-medium"
                  : "border-border-subtle bg-surface text-text-secondary hover:border-zinc-700 hover:bg-surface-secondary hover:text-white"
              }`}
            >
              <div className="flex flex-col">
                <span className="text-xs font-medium text-white font-heading">
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

