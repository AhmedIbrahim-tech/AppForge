import React from "react";
import { Shield, Users, Key, FileText, Bell, Globe, AlignLeft, LayoutDashboard, ArrowRight } from "lucide-react";
import type { ModuleDefinition } from "../types";

const MODULE_ICONS: Record<string, React.ReactNode> = {
  auth: <Shield className="h-4 w-4 text-indigo-400" />,
  users: <Users className="h-4 w-4 text-blue-400" />,
  permissions: <Key className="h-4 w-4 text-amber-400" />,
  audit: <FileText className="h-4 w-4 text-emerald-400" />,
  notifications: <Bell className="h-4 w-4 text-purple-400" />,
  localization: <Globe className="h-4 w-4 text-cyan-400" />,
  "rich-text": <AlignLeft className="h-4 w-4 text-rose-400" />,
  dashboard: <LayoutDashboard className="h-4 w-4 text-sky-400" />,
};

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
      className={`group relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 ${
        isSelected
          ? "border-indigo-500/60 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.15)] ring-1 ring-indigo-500/40"
          : "border-white/[0.08] bg-[#11131a]/80 hover:border-white/[0.16] hover:bg-[#151822]"
      }`}
    >
      <div>
        {/* Top: Icon + Category */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04]">
            {MODULE_ICONS[module.id] || <Shield className="h-4 w-4 text-indigo-400" />}
          </div>
          <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium tracking-wide text-zinc-400 uppercase">
            {module.category}
          </span>
        </div>

        {/* Title & Description */}
        <div className="mt-3">
          <div className="flex items-center gap-1.5">
            <h3 className="font-sans text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
              {module.name}
            </h3>
            <span className="font-mono text-[10px] text-zinc-500">
              ({module.id})
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {module.description}
          </p>
        </div>
      </div>

      {/* Footer tags */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.05] pt-3">
        <div className="flex items-center gap-1.5">
          {module.requiresBackend && (
            <span className="rounded bg-indigo-500/10 px-1.5 py-0.5 text-[10px] font-medium text-indigo-400 border border-indigo-500/20">
              Backend
            </span>
          )}
          {module.requiresFrontend && (
            <span className="rounded bg-purple-500/10 px-1.5 py-0.5 text-[10px] font-medium text-purple-400 border border-purple-500/20">
              Frontend
            </span>
          )}
          {module.requires.length > 0 && (
            <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium text-amber-300 border border-amber-500/20">
              Requires {module.requires.join(", ")}
            </span>
          )}
        </div>

        <span className="text-[11px] font-medium text-zinc-500 group-hover:text-indigo-400 flex items-center gap-1 transition-colors">
          Details
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </button>
  );
};
