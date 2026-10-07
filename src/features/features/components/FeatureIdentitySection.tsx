import React from "react";
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
    <div className="rounded-lg border border-border bg-surface p-4 sm:p-5">
      <div className="border-b border-border-line pb-3">
        <h2 className="font-heading text-sm font-semibold text-text-primary">
          Feature setup
        </h2>
        <p className="mt-0.5 text-xs text-text-muted">
          Set entity name, architecture scope, and framework hooks.
        </p>
      </div>

      <div className="mt-4 space-y-4">
        {/* Name and Plural */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-text-secondary">
              Entity name (PascalCase) <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              value={feature.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="e.g. Product, Order"
              className="mt-1 w-full rounded-md border border-border bg-surface-raised px-3 py-1.5 font-mono text-xs text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
            />
            <p className="mt-1 text-[11px] text-text-muted">
              Used for C# model, repository, and TypeScript types.
            </p>
          </div>

          <div>
            <label className="text-xs font-medium text-text-secondary">
              Plural name (optional)
            </label>
            <input
              type="text"
              value={feature.plural || ""}
              onChange={(e) => onChange({ plural: e.target.value })}
              placeholder={feature.name ? `${feature.name}s` : "e.g. Products"}
              className="mt-1 w-full rounded-md border border-border bg-surface-raised px-3 py-1.5 font-mono text-xs text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
            />
            <p className="mt-1 text-[11px] text-text-muted">
              Used in API endpoints and database table naming.
            </p>
          </div>
        </div>

        {/* Target Mode */}
        <div>
          <label className="text-xs font-medium text-text-secondary">
            Target layer
          </label>
          <div className="mt-1.5 grid grid-cols-3 gap-2">
            {[
              {
                id: "fullstack",
                label: "Full Stack",
                desc: "API + UI Views",
              },
              {
                id: "backend",
                label: "Backend Only",
                desc: "CQRS & Database",
              },
              {
                id: "frontend",
                label: "Frontend Only",
                desc: "Client Components",
              },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ mode: item.id as FeatureMode })}
                className={`flex flex-col rounded-md border p-2.5 text-left transition-all cursor-pointer ${
                  feature.mode === item.id
                    ? "border-accent bg-accent/10 text-text-primary shadow-[0_0_0_1px_rgba(229,107,63,0.35)]"
                    : "border-border bg-surface-raised text-text-secondary hover:border-border-hover hover:text-text-primary"
                }`}
              >
                <span className="text-xs font-semibold text-text-primary font-heading">
                  {item.label}
                </span>
                <span className="mt-0.5 text-[10px] text-text-muted font-mono">
                  {item.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Surface & Type */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-text-secondary">
              Frontend surface
            </label>
            <select
              value={feature.surface}
              onChange={(e) => onChange({ surface: e.target.value as FeatureSurface })}
              className="mt-1 w-full rounded-md border border-border bg-surface-raised px-3 py-1.5 text-xs text-text-primary focus:border-accent focus:outline-none transition-colors"
            >
              <option value="dashboard">Dashboard shell (--surface dashboard)</option>
              <option value="public">Public site (--surface public)</option>
              <option value="both">Both surfaces (--surface both)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-text-secondary">
              Operations template
            </label>
            <select
              value={feature.featureType}
              onChange={(e) => onChange({ featureType: e.target.value as FeatureCrudType })}
              className="mt-1 w-full rounded-md border border-border bg-surface-raised px-3 py-1.5 text-xs text-text-primary focus:border-accent focus:outline-none transition-colors"
            >
              <option value="crud">Full CRUD (Create, Read, Update, Delete)</option>
              <option value="readonly">Read-Only (List & Details)</option>
            </select>
          </div>
        </div>

        {/* Module Flags Integration */}
        <div className="border-t border-border-line pt-3">
          <label className="text-xs font-medium text-text-secondary">
            Module hooks
          </label>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <label className="flex items-start gap-2.5 rounded-md border border-border bg-surface-raised p-2.5 text-xs text-text-secondary cursor-pointer hover:border-border-hover transition-colors">
              <input
                type="checkbox"
                checked={feature.permissions}
                onChange={(e) => onChange({ permissions: e.target.checked })}
                className="mt-0.5 rounded border-border text-accent focus:ring-accent accent-accent"
              />
              <div>
                <div className="font-semibold text-text-primary flex items-center gap-1.5 font-heading">
                  <ShieldCheck className="h-3.5 w-3.5 text-text-muted" />
                  <span>Register permissions</span>
                </div>
                <div className="text-[10px] text-text-muted mt-0.5">
                  Scaffolds authorization constants and policy checks.
                </div>
              </div>
            </label>

            <label className="flex items-start gap-2.5 rounded-md border border-border bg-surface-raised p-2.5 text-xs text-text-secondary cursor-pointer hover:border-border-hover transition-colors">
              <input
                type="checkbox"
                checked={feature.localize}
                onChange={(e) => onChange({ localize: e.target.checked })}
                className="mt-0.5 rounded border-border text-accent focus:ring-accent accent-accent"
              />
              <div>
                <div className="font-semibold text-text-primary flex items-center gap-1.5 font-heading">
                  <Globe className="h-3.5 w-3.5 text-text-muted" />
                  <span>Localization support</span>
                </div>
                <div className="text-[10px] text-text-muted mt-0.5">
                  Scaffolds translation resource keys and localized UI.
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};


