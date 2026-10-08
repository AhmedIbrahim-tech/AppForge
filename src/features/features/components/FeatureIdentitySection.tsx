import React from "react";
import { Globe, ShieldCheck, Workflow } from "lucide-react";
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
    <div className="rounded-2xl border border-border-subtle bg-surface p-5 sm:p-6 shadow-xs">
      <div className="flex items-center gap-3 border-b border-border-subtle pb-3.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10 text-accent border border-accent/25 shadow-xs">
          <Workflow className="h-4 w-4" />
        </span>
        <div>
          <h2 className="font-heading text-sm font-bold text-text-primary">
            Feature Setup &amp; Architecture
          </h2>
          <p className="text-xs text-text-muted">
            Set entity model name, scaffolding scope, and cross-cutting hooks.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {/* Name and Plural */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-text-secondary">
              Entity Name (PascalCase) <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value={feature.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="e.g. Product, Order"
              className="mt-1.5 w-full rounded-lg border border-border-subtle bg-surface-secondary px-3.5 py-2 font-mono text-xs text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none focus:bg-surface transition-all"
            />
            <p className="mt-1.5 text-[11px] text-text-muted">
              Used for C# domain model, repository, and TypeScript interfaces.
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-text-secondary">
              Plural Name (optional)
            </label>
            <input
              type="text"
              value={feature.plural || ""}
              onChange={(e) => onChange({ plural: e.target.value })}
              placeholder={feature.name ? `${feature.name}s` : "e.g. Products"}
              className="mt-1.5 w-full rounded-lg border border-border-subtle bg-surface-secondary px-3.5 py-2 font-mono text-xs text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none focus:bg-surface transition-all"
            />
            <p className="mt-1.5 text-[11px] text-text-muted">
              Used in API endpoints, route segments, and database tables.
            </p>
          </div>
        </div>

        {/* Target Layer */}
        <div>
          <label className="text-xs font-semibold text-text-secondary">
            Scaffolding Layer
          </label>
          <div className="mt-1.5 grid grid-cols-3 gap-2.5">
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
                desc: "Client Views",
              },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ mode: item.id as FeatureMode })}
                className={`flex flex-col rounded-xl border p-3 text-left transition-all cursor-pointer ${
                  feature.mode === item.id
                    ? "border-accent/80 bg-accent-subtle text-text-primary ring-1 ring-accent/30 shadow-xs"
                    : "border-border-subtle bg-surface-secondary text-text-secondary hover:border-border-hover hover:bg-surface-hover hover:text-text-primary"
                }`}
              >
                <span className="text-xs font-bold text-text-primary font-heading">
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-text-secondary">
              Frontend Surface
            </label>
            <select
              value={feature.surface}
              onChange={(e) => onChange({ surface: e.target.value as FeatureSurface })}
              className="mt-1.5 w-full rounded-lg border border-border-subtle bg-surface-secondary px-3.5 py-2 text-xs text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none transition-all"
            >
              <option value="dashboard">Dashboard shell (--surface dashboard)</option>
              <option value="public">Public site (--surface public)</option>
              <option value="both">Both surfaces (--surface both)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-text-secondary">
              Operations Template
            </label>
            <select
              value={feature.featureType}
              onChange={(e) => onChange({ featureType: e.target.value as FeatureCrudType })}
              className="mt-1.5 w-full rounded-lg border border-border-subtle bg-surface-secondary px-3.5 py-2 text-xs text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none transition-all"
            >
              <option value="crud">Full CRUD (Create, Read, Update, Delete)</option>
              <option value="readonly">Read-Only (List &amp; Details)</option>
            </select>
          </div>
        </div>

        {/* Module Flags Integration */}
        <div className="border-t border-border-subtle pt-4">
          <label className="text-xs font-semibold text-text-secondary">
            Cross-Cutting Module Hooks
          </label>
          <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="flex items-start gap-3 rounded-xl border border-border-subtle bg-surface-secondary p-3 text-xs text-text-secondary cursor-pointer hover:border-border-hover hover:bg-surface-hover transition-all">
              <input
                type="checkbox"
                checked={feature.permissions}
                onChange={(e) => onChange({ permissions: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-border-main text-accent focus:ring-accent/30 accent-accent"
              />
              <div>
                <div className="font-bold text-text-primary flex items-center gap-1.5 font-heading">
                  <ShieldCheck className="h-4 w-4 text-success" />
                  <span>Register Permissions</span>
                </div>
                <div className="text-[11px] text-text-muted mt-0.5">
                  Scaffolds policy constants, role checks, and endpoint authorization.
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 rounded-xl border border-border-subtle bg-surface-secondary p-3 text-xs text-text-secondary cursor-pointer hover:border-border-hover hover:bg-surface-hover transition-all">
              <input
                type="checkbox"
                checked={feature.localize}
                onChange={(e) => onChange({ localize: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-border-main text-accent focus:ring-accent/30 accent-accent"
              />
              <div>
                <div className="font-bold text-text-primary flex items-center gap-1.5 font-heading">
                  <Globe className="h-4 w-4 text-info" />
                  <span>Localization Support</span>
                </div>
                <div className="text-[11px] text-text-muted mt-0.5">
                  Scaffolds i18n translation resource keys and localized UI views.
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
