import { Globe, ShieldCheck } from "lucide-react";
import type {
  FeatureMode,
  FeatureSurface,
  FeatureCrudType,
  FeatureDefinition,
} from "../types";

interface FeatureIdentitySectionProps {
  feature: FeatureDefinition;
  onChange: (updated: Partial<FeatureDefinition>) => void;
}

export const FeatureIdentitySection: React.FC<FeatureIdentitySectionProps> = ({
  feature,
  onChange,
}) => {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#11131a] p-5">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
        <div>
          <h2 className="text-sm font-semibold text-white">Feature Identity & Scope</h2>
          <p className="text-xs text-zinc-400">
            Define your business entity name, architecture target layers, and module integration flags.
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {/* Name and Plural */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-zinc-300">
              Entity Name (Singular PascalCase)
            </label>
            <input
              type="text"
              value={feature.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="e.g. Product, Category, Invoice"
              className="mt-1 w-full rounded-lg border border-white/[0.08] bg-[#0c0d14] px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-indigo-500/50 focus:outline-none"
            />
            <p className="mt-1 text-[10px] text-zinc-500">
              C# class & TypeScript interface name.
            </p>
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-300">
              Plural Name (Optional)
            </label>
            <input
              type="text"
              value={feature.plural || ""}
              onChange={(e) => onChange({ plural: e.target.value })}
              placeholder={feature.name ? `${feature.name}s` : "e.g. Products"}
              className="mt-1 w-full rounded-lg border border-white/[0.08] bg-[#0c0d14] px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-indigo-500/50 focus:outline-none"
            />
            <p className="mt-1 text-[10px] text-zinc-500">
              Used in API endpoints and database table names.
            </p>
          </div>
        </div>

        {/* Target Architecture Layer (Mode) */}
        <div>
          <label className="text-xs font-medium text-zinc-300">
            Generation Surface
          </label>
          <div className="mt-1.5 grid grid-cols-3 gap-2">
            {[
              {
                id: "fullstack",
                label: "Full Stack",
                desc: "Backend API + Frontend SPA",
                badge: "--fullstack",
              },
              {
                id: "backend",
                label: "Backend Only",
                desc: "C# Controllers/CQRS & DB",
                badge: "--backend-only",
              },
              {
                id: "frontend",
                label: "Frontend Only",
                desc: "React/Angular UI Components",
                badge: "--frontend-only",
              },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ mode: item.id as FeatureMode })}
                className={`flex flex-col rounded-lg border p-2.5 text-left transition-all ${
                  feature.mode === item.id
                    ? "border-indigo-500/60 bg-indigo-500/15 text-indigo-200 ring-1 ring-indigo-500/30"
                    : "border-white/[0.06] bg-[#0c0d14] text-zinc-400 hover:border-white/[0.12] hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">
                    {item.label}
                  </span>
                  <span className="font-mono text-[9px] text-zinc-500">
                    {item.badge}
                  </span>
                </div>
                <span className="mt-1 text-[10px] text-zinc-400">
                  {item.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Surface & Type */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Surface */}
          <div>
            <label className="text-xs font-medium text-zinc-300">
              Frontend Destination
            </label>
            <select
              value={feature.surface}
              onChange={(e) => onChange({ surface: e.target.value as FeatureSurface })}
              className="mt-1 w-full rounded-lg border border-white/[0.08] bg-[#0c0d14] px-3 py-2 text-xs text-white focus:border-indigo-500/50 focus:outline-none"
            >
              <option value="dashboard">Dashboard Shell (--surface dashboard)</option>
              <option value="public">Public Site (--surface public)</option>
              <option value="both">Both (--surface both)</option>
            </select>
          </div>

          {/* CRUD vs Readonly */}
          <div>
            <label className="text-xs font-medium text-zinc-300">
              Operations Template
            </label>
            <select
              value={feature.featureType}
              onChange={(e) => onChange({ featureType: e.target.value as FeatureCrudType })}
              className="mt-1 w-full rounded-lg border border-white/[0.08] bg-[#0c0d14] px-3 py-2 text-xs text-white focus:border-indigo-500/50 focus:outline-none"
            >
              <option value="crud">Full CRUD (Create, Read, Update, Delete)</option>
              <option value="readonly">Read-Only (List, Filter & Details)</option>
            </select>
          </div>
        </div>

        {/* Module Flags Integration */}
        <div className="border-t border-white/[0.06] pt-3">
          <label className="text-xs font-medium text-zinc-300">
            Module Hooks & Security
          </label>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <label className="flex items-start gap-2.5 rounded-lg border border-white/[0.06] bg-[#0c0d14] p-2.5 text-xs text-zinc-300 cursor-pointer hover:border-white/[0.12]">
              <input
                type="checkbox"
                checked={feature.permissions}
                onChange={(e) => onChange({ permissions: e.target.checked })}
                className="mt-0.5 rounded border-zinc-700 text-indigo-600 focus:ring-indigo-500"
              />
              <div>
                <div className="font-semibold text-white flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                  <span>Register Permissions</span>
                </div>
                <div className="text-[10px] text-zinc-400 mt-0.5">
                  Applies <code className="text-zinc-300">--permissions</code> flag. Creates read/write permission constants.
                </div>
              </div>
            </label>

            <label className="flex items-start gap-2.5 rounded-lg border border-white/[0.06] bg-[#0c0d14] p-2.5 text-xs text-zinc-300 cursor-pointer hover:border-white/[0.12]">
              <input
                type="checkbox"
                checked={feature.localize}
                onChange={(e) => onChange({ localize: e.target.checked })}
                className="mt-0.5 rounded border-zinc-700 text-indigo-600 focus:ring-indigo-500"
              />
              <div>
                <div className="font-semibold text-white flex items-center gap-1">
                  <Globe className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Multi-Language Scaffolding</span>
                </div>
                <div className="text-[10px] text-zinc-400 mt-0.5">
                  Applies <code className="text-zinc-300">--localize</code> flag. Scaffolds domain translation tables.
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
