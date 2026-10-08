import React from "react";
import { Layout, Globe, Check, Layers } from "lucide-react";
import {
  CollapsibleSection,
  OptionPill,
} from "./ui";
import {
  FRONTEND_TOOLINGS,
  FRONTEND_LANGUAGES,
  FRONTEND_STYLINGS,
  FRONTEND_STATES,
  FRONTEND_HTTP_CLIENTS,
  FRONTEND_FORMS,
  FRONTEND_UIS,
} from "../capabilities";
import type {
  FrontendFramework,
  FrontendTooling,
  FrontendLanguage,
  FrontendStyling,
  FrontendState,
  FrontendHttpClient,
  FrontendForms,
  FrontendUi,
  StackConfiguration,
  ProjectType,
} from "../types";

export interface FrontendSectionProps {
  config: StackConfiguration;
  expanded: boolean;
  onToggle: () => void;
  onSetProjectType: (type: ProjectType) => void;
  onSetFramework: (f: FrontendFramework) => void;
  onSetTooling: (t: FrontendTooling) => void;
  onSetLanguage: (l: FrontendLanguage) => void;
  onSetStyling: (s: FrontendStyling) => void;
  onSetState: (st: FrontendState) => void;
  onSetHttpClient: (h: FrontendHttpClient) => void;
  onSetForms: (fo: FrontendForms) => void;
  onSetUi: (ui: FrontendUi) => void;
  onToggleI18n: () => void;
}

export const FrontendSection: React.FC<FrontendSectionProps> = ({
  config,
  expanded,
  onToggle,
  onSetProjectType,
  onSetFramework,
  onSetTooling,
  onSetLanguage,
  onSetStyling,
  onSetState,
  onSetHttpClient,
  onSetForms,
  onSetUi,
  onToggleI18n,
}) => {
  const isBackendOnly = config.projectType === "backend";
  const f = config.frontend;

  const summaryBadges = isBackendOnly
    ? []
    : f.framework === "React"
      ? [
          "React",
          f.tooling,
          f.styling === "Tailwind CSS" ? "Tailwind" : "Bootstrap",
          f.state !== "None" ? (f.state === "Redux Toolkit" ? "Redux" : f.state) : "No Store",
          f.httpClient,
          f.ui !== "None" ? f.ui : "No UI Kit",
        ]
      : [
          "Angular",
          f.styling === "Tailwind CSS" ? "Tailwind" : "Bootstrap",
          f.state !== "None" ? "NgRx" : "No Store",
          f.ui !== "None" ? (f.ui === "Ant Design Angular" ? "NG-ZORRO" : "Material") : "No UI Kit",
        ];

  // Filter ecosystem-specific options for React
  const reactToolings = FRONTEND_TOOLINGS.filter((t) => t.value !== "Angular CLI");
  const reactStates = FRONTEND_STATES.filter((s) => s.value !== "NgRx");
  const reactHttpClients = FRONTEND_HTTP_CLIENTS.filter((h) => h.value !== "Angular Http");
  const reactForms = FRONTEND_FORMS.filter((fo) => fo.value !== "Angular Reactive Forms");
  const reactUis = FRONTEND_UIS.filter(
    (u) => u.value !== "Angular Material" && u.value !== "Ant Design Angular",
  );

  const angularStates = FRONTEND_STATES.filter(
    (s) => s.value === "NgRx" || s.value === "None",
  );
  const angularUis = FRONTEND_UIS.filter(
    (u) =>
      u.value === "Angular Material" ||
      u.value === "Ant Design Angular" ||
      u.value === "None",
  );

  return (
    <CollapsibleSection
      id="frontend-section"
      icon={<Layout className="h-4 w-4 text-accent" />}
      title="Frontend Stack"
      summaryBadges={summaryBadges}
      expanded={expanded}
      onToggle={onToggle}
      notIncluded={isBackendOnly}
      notIncludedMessage="Frontend is omitted in Backend Only projects."
      actionText="Enable Frontend (Full Stack)"
      onIncludeAction={() => onSetProjectType("fullstack")}
      badge={
        !isBackendOnly ? (
          <span className="rounded-md bg-surface-secondary border border-border-subtle px-2 py-0.5 font-mono text-[11px] text-text-muted font-medium">
            {f.framework} · {f.framework === "React" ? f.tooling : "Angular CLI"}
          </span>
        ) : null
      }
    >
      <div className="space-y-5">
        {/* 1. Primary Decision: Framework */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-border-subtle pb-2">
            <Layers className="h-4 w-4 text-accent" />
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-text-secondary">
              Frontend Framework
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onSetFramework("React")}
              className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all cursor-pointer ${
                f.framework === "React"
                  ? "border-accent/80 bg-accent-subtle text-text-primary ring-1 ring-accent/30 shadow-xs"
                  : "border-border-subtle bg-surface-secondary text-text-secondary hover:border-border-hover hover:bg-surface-hover hover:text-text-primary"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-text-primary font-heading">React 19</span>
                {f.framework === "React" && (
                  <Check className="h-4 w-4 text-accent font-bold shrink-0" />
                )}
              </div>
              <p className="mt-1.5 text-xs text-text-secondary leading-relaxed">
                Modern Vite or Next.js with reactive components and typed contracts.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onSetFramework("Angular")}
              className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all cursor-pointer ${
                f.framework === "Angular"
                  ? "border-accent/80 bg-accent-subtle text-text-primary ring-1 ring-accent/30 shadow-xs"
                  : "border-border-subtle bg-surface-secondary text-text-secondary hover:border-border-hover hover:bg-surface-hover hover:text-text-primary"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-text-primary font-heading">Angular</span>
                {f.framework === "Angular" && (
                  <Check className="h-4 w-4 text-accent font-bold shrink-0" />
                )}
              </div>
              <p className="mt-1.5 text-xs text-text-secondary leading-relaxed">
                Enterprise standalone architecture with Angular CLI and NgRx.
              </p>
            </button>
          </div>
        </div>

        {/* 2. Ecosystem Specific Options */}
        {f.framework === "React" ? (
          <div className="space-y-4 border-t border-border-subtle pt-4">
            {/* Tooling & Language */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="mb-1.5 block text-xs font-semibold text-text-secondary">
                  Tooling / Starter
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {reactToolings.map((tool) => (
                    <OptionPill
                      key={tool.value}
                      selected={f.tooling === tool.value}
                      onClick={() => onSetTooling(tool.value)}
                      label={tool.label}
                    />
                  ))}
                </div>
              </div>

              <div>
                <span className="mb-1.5 block text-xs font-semibold text-text-secondary">
                  Language
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {FRONTEND_LANGUAGES.map((lang) => {
                    const disabledState = lang.getDisabledState?.(config) || {
                      disabled: false,
                    };
                    return (
                      <OptionPill
                        key={lang.value}
                        selected={f.language === lang.value}
                        disabled={disabledState.disabled}
                        disabledReason={disabledState.reason}
                        onClick={() => onSetLanguage(lang.value)}
                        label={lang.label}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Styling & State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="mb-1.5 block text-xs font-semibold text-text-secondary">
                  Styling Framework
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {FRONTEND_STYLINGS.map((sty) => (
                    <OptionPill
                      key={sty.value}
                      selected={f.styling === sty.value}
                      onClick={() => onSetStyling(sty.value)}
                      label={sty.label}
                    />
                  ))}
                </div>
              </div>

              <div>
                <span className="mb-1.5 block text-xs font-semibold text-text-secondary">
                  State Management
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {reactStates.map((st) => (
                    <OptionPill
                      key={st.value}
                      selected={f.state === st.value}
                      onClick={() => onSetState(st.value)}
                      label={st.label}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* HTTP & Forms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="mb-1.5 block text-xs font-semibold text-text-secondary">
                  HTTP Client
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {reactHttpClients.map((client) => (
                    <OptionPill
                      key={client.value}
                      selected={f.httpClient === client.value}
                      onClick={() => onSetHttpClient(client.value)}
                      label={client.label}
                    />
                  ))}
                </div>
              </div>

              <div>
                <span className="mb-1.5 block text-xs font-semibold text-text-secondary">
                  Form Handling
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {reactForms.map((form) => (
                    <OptionPill
                      key={form.value}
                      selected={f.forms === form.value}
                      onClick={() => onSetForms(form.value)}
                      label={form.label}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* UI Library / Design System */}
            <div>
              <span className="mb-1.5 block text-xs font-semibold text-text-secondary">
                UI Library / Design System
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {reactUis.map((ui) => {
                  const disabledState = ui.getDisabledState?.(config) || {
                    disabled: false,
                  };
                  return (
                    <OptionPill
                      key={ui.value}
                      selected={f.ui === ui.value}
                      disabled={disabledState.disabled}
                      disabledReason={disabledState.reason}
                      onClick={() => onSetUi(ui.value)}
                      label={ui.label}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Angular Ecosystem with Requirement #14: Read-Only Config Rows for Fixed Settings */
          <div className="space-y-4 border-t border-border-subtle pt-4">
            {/* Fixed Settings Hierarchy Rows */}
            <div className="rounded-xl border border-border-subtle bg-surface-secondary/60 p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
                <span className="text-xs font-mono font-semibold text-text-muted uppercase">
                  Framework Presets
                </span>
                <span className="text-[11px] font-mono text-info bg-info/10 px-2 py-0.5 rounded-md border border-info/20 font-medium">
                  Framework-defined
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface border border-border-subtle">
                  <span className="text-text-muted">Tooling</span>
                  <span className="font-mono font-semibold text-text-primary">Angular CLI</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface border border-border-subtle">
                  <span className="text-text-muted">Language</span>
                  <span className="font-mono font-semibold text-text-primary">TypeScript</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface border border-border-subtle">
                  <span className="text-text-muted">HTTP Client</span>
                  <span className="font-mono font-semibold text-text-primary">Angular HttpClient</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface border border-border-subtle">
                  <span className="text-text-muted">Forms</span>
                  <span className="font-mono font-semibold text-text-primary">Reactive Forms</span>
                </div>
              </div>
            </div>

            {/* Selectable Options in Angular */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="mb-1.5 block text-xs font-semibold text-text-secondary">
                  Styling Framework
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {FRONTEND_STYLINGS.map((sty) => (
                    <OptionPill
                      key={sty.value}
                      selected={f.styling === sty.value}
                      onClick={() => onSetStyling(sty.value)}
                      label={sty.label}
                    />
                  ))}
                </div>
              </div>

              <div>
                <span className="mb-1.5 block text-xs font-semibold text-text-secondary">
                  State Management
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {angularStates.map((st) => (
                    <OptionPill
                      key={st.value}
                      selected={f.state === st.value}
                      onClick={() => onSetState(st.value)}
                      label={st.label}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* UI Library / Design System */}
            <div>
              <span className="mb-1.5 block text-xs font-semibold text-text-secondary">
                UI Library / Design System
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {angularUis.map((ui) => (
                  <OptionPill
                    key={ui.value}
                    selected={f.ui === ui.value}
                    onClick={() => onSetUi(ui.value)}
                    label={ui.label}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. Localization Toggle */}
        <div className="border-t border-border-subtle pt-4">
          <button
            type="button"
            onClick={onToggleI18n}
            className={`flex w-full items-center justify-between rounded-xl border p-3.5 transition-all cursor-pointer ${
              f.includeI18n
                ? "border-accent/80 bg-accent-subtle text-text-primary ring-1 ring-accent/30 shadow-xs"
                : "border-border-subtle bg-surface-secondary text-text-secondary hover:border-border-hover hover:bg-surface-hover hover:text-text-primary"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Globe className="h-4 w-4 text-accent" />
              <div>
                <span className="text-xs font-bold font-heading">i18n Localization Architecture</span>
                <p className="text-[11px] text-text-muted mt-0.5">Pre-configures multi-language routing, translation catalogs, and RTL support.</p>
              </div>
            </div>
            <span
              className={`rounded-md px-2.5 py-1 font-mono text-[10px] font-bold ${
                f.includeI18n
                  ? "bg-accent text-white"
                  : "bg-surface text-text-muted border border-border-subtle"
              }`}
            >
              {f.includeI18n ? "ON" : "OFF"}
            </span>
          </button>
        </div>
      </div>
    </CollapsibleSection>
  );
};
