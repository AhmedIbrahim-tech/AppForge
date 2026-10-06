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
          "Angular CLI",
          f.styling === "Tailwind CSS" ? "Tailwind" : "Bootstrap",
          f.state !== "None" ? "NgRx" : "No Store",
          "HttpClient",
          f.ui !== "None" ? (f.ui === "Ant Design Angular" ? "NG-ZORRO" : "Material") : "No UI Kit",
        ];

  // Filter ecosystem-specific options
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
  const angularForms = FRONTEND_FORMS.filter(
    (fo) => fo.value === "Angular Reactive Forms" || fo.value === "None",
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
      icon={<Layout className="h-4 w-4" />}
      title="Frontend Stack"
      summaryBadges={summaryBadges}
      expanded={expanded}
      onToggle={onToggle}
      accent="purple"
      notIncluded={isBackendOnly}
      notIncludedMessage="Frontend is not included in this Backend Only project."
      actionText="Enable Frontend (Full Stack)"
      onIncludeAction={() => onSetProjectType("fullstack")}
      badge={
        !isBackendOnly ? (
          <span className="rounded-md border border-purple-500/25 bg-purple-500/10 px-2 py-0.5 font-mono text-[10px] text-purple-300">
            {f.framework} · {f.framework === "React" ? f.tooling : "Angular CLI"}
          </span>
        ) : null
      }
    >
      <div className="space-y-6">
        {/* 1. Primary Top-Level Decision: Frontend Framework */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 border-b border-white/5 pb-1.5">
            <Layers className="h-3.5 w-3.5 text-purple-400" />
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
              Frontend Framework
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onSetFramework("React")}
              className={`group relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                f.framework === "React"
                  ? "border-purple-400/80 bg-purple-500/15 text-white ring-1 ring-purple-400/30"
                  : "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/20 hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm sm:text-base text-white">React 19</span>
                  <span className="rounded bg-purple-500/20 px-2 py-0.5 text-[10px] font-mono text-purple-300">
                    React Ecosystem
                  </span>
                </div>
                {f.framework === "React" && (
                  <Check className="h-4 w-4 text-purple-300 shrink-0" />
                )}
              </div>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                Vite or Next.js with modern component architecture, TypeScript/JavaScript, and rich ecosystem tooling.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onSetFramework("Angular")}
              className={`group relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                f.framework === "Angular"
                  ? "border-purple-400/80 bg-purple-500/15 text-white ring-1 ring-purple-400/30"
                  : "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/20 hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm sm:text-base text-white">Angular</span>
                  <span className="rounded bg-purple-500/20 px-2 py-0.5 text-[10px] font-mono text-purple-300">
                    Angular Ecosystem
                  </span>
                </div>
                {f.framework === "Angular" && (
                  <Check className="h-4 w-4 text-purple-300 shrink-0" />
                )}
              </div>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                Enterprise standalone architecture with official Angular CLI, NgRx reactive state, and Angular Material.
              </p>
            </button>
          </div>
        </div>

        {/* 2. Ecosystem Specific Configuration */}
        {f.framework === "React" ? (
          /* ========================================================
             REACT ECOSYSTEM CONFIGURATION
             ======================================================== */
          <div className="space-y-5 border-t border-white/5 pt-5">
            {/* Row 1: Tooling & Language */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Tooling / Starter
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {reactToolings.map((tool) => (
                    <OptionPill
                      key={tool.value}
                      accent="purple"
                      selected={f.tooling === tool.value}
                      onClick={() => onSetTooling(tool.value)}
                      label={tool.label}
                    />
                  ))}
                </div>
              </div>

              <div>
                <span className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Language
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {FRONTEND_LANGUAGES.map((lang) => {
                    const disabledState = lang.getDisabledState?.(config) || {
                      disabled: false,
                    };
                    return (
                      <OptionPill
                        key={lang.value}
                        accent="purple"
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

            {/* Row 2: Styling & State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Styling
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {FRONTEND_STYLINGS.map((sty) => (
                    <OptionPill
                      key={sty.value}
                      accent="purple"
                      selected={f.styling === sty.value}
                      onClick={() => onSetStyling(sty.value)}
                      label={sty.label}
                    />
                  ))}
                </div>
              </div>

              <div>
                <span className="mb-1.5 block text-xs font-medium text-zinc-400">
                  State Management
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {reactStates.map((st) => (
                    <OptionPill
                      key={st.value}
                      accent="purple"
                      selected={f.state === st.value}
                      onClick={() => onSetState(st.value)}
                      label={st.label}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Row 3: HTTP & Forms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="mb-1.5 block text-xs font-medium text-zinc-400">
                  HTTP Client
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {reactHttpClients.map((client) => (
                    <OptionPill
                      key={client.value}
                      accent="purple"
                      selected={f.httpClient === client.value}
                      onClick={() => onSetHttpClient(client.value)}
                      label={client.label}
                    />
                  ))}
                </div>
              </div>

              <div>
                <span className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Form Handling
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {reactForms.map((form) => (
                    <OptionPill
                      key={form.value}
                      accent="purple"
                      selected={f.forms === form.value}
                      onClick={() => onSetForms(form.value)}
                      label={form.label}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Row 4: UI Components */}
            <div>
              <span className="mb-1.5 block text-xs font-medium text-zinc-400">
                UI Component System
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {reactUis.map((ui) => {
                  const disabledState = ui.getDisabledState?.(config) || {
                    disabled: false,
                  };
                  return (
                    <OptionPill
                      key={ui.value}
                      accent="purple"
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
          /* ========================================================
             ANGULAR ECOSYSTEM CONFIGURATION
             ======================================================== */
          <div className="space-y-5 border-t border-white/5 pt-5">
            {/* Row 1: Tooling & Language (Informative/Selected badges) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Tooling / Starter
                </span>
                <div className="inline-flex items-center gap-2 rounded-xl border border-purple-400/80 bg-purple-500/15 px-3 py-1.5 text-xs text-white ring-1 ring-purple-400/30">
                  <Check className="h-3.5 w-3.5 text-purple-300 shrink-0" />
                  <span className="font-semibold">Angular CLI</span>
                  <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">
                    Official
                  </span>
                </div>
              </div>

              <div>
                <span className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Language
                </span>
                <div className="inline-flex items-center gap-2 rounded-xl border border-purple-400/80 bg-purple-500/15 px-3 py-1.5 text-xs text-white ring-1 ring-purple-400/30">
                  <Check className="h-3.5 w-3.5 text-purple-300 shrink-0" />
                  <span className="font-semibold">TypeScript</span>
                  <span className="text-[10px] text-zinc-400">Required by Angular</span>
                </div>
              </div>
            </div>

            {/* Row 2: Styling & State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Styling
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {FRONTEND_STYLINGS.map((sty) => (
                    <OptionPill
                      key={sty.value}
                      accent="purple"
                      selected={f.styling === sty.value}
                      onClick={() => onSetStyling(sty.value)}
                      label={sty.label}
                    />
                  ))}
                </div>
              </div>

              <div>
                <span className="mb-1.5 block text-xs font-medium text-zinc-400">
                  State Management
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {angularStates.map((st) => (
                    <OptionPill
                      key={st.value}
                      accent="purple"
                      selected={f.state === st.value}
                      onClick={() => onSetState(st.value)}
                      label={st.label}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Row 3: HTTP & Forms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="mb-1.5 block text-xs font-medium text-zinc-400">
                  HTTP Client
                </span>
                <div className="inline-flex items-center gap-2 rounded-xl border border-purple-400/80 bg-purple-500/15 px-3 py-1.5 text-xs text-white ring-1 ring-purple-400/30">
                  <Check className="h-3.5 w-3.5 text-purple-300 shrink-0" />
                  <span className="font-semibold">Angular HttpClient</span>
                  <span className="text-[10px] text-zinc-400">Built-in RxJS</span>
                </div>
              </div>

              <div>
                <span className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Form Handling
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {angularForms.map((form) => (
                    <OptionPill
                      key={form.value}
                      accent="purple"
                      selected={f.forms === form.value}
                      onClick={() => onSetForms(form.value)}
                      label={form.label}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Row 4: UI Components */}
            <div>
              <span className="mb-1.5 block text-xs font-medium text-zinc-400">
                UI Component System
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {angularUis.map((ui) => (
                  <OptionPill
                    key={ui.value}
                    accent="purple"
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
        <div className="border-t border-white/5 pt-4">
          <button
            type="button"
            onClick={onToggleI18n}
            className={`flex w-full items-center justify-between rounded-xl border p-3 transition-colors cursor-pointer ${
              f.includeI18n
                ? "border-purple-400/60 bg-purple-500/10 text-white ring-1 ring-purple-400/20"
                : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Globe
                className={`h-4 w-4 ${f.includeI18n ? "text-purple-300" : "text-zinc-500"}`}
              />
              <div className="text-left">
                <span className="text-xs font-semibold block text-zinc-200">
                  i18n Internationalization
                </span>
                <span className="text-[11px] text-zinc-500">
                  Multi-language translation resource files and runtime switcher
                </span>
              </div>
            </div>

            <span
              className={`rounded px-2 py-0.5 font-mono text-[11px] font-medium ${
                f.includeI18n
                  ? "bg-purple-500/25 text-purple-200 font-semibold"
                  : "bg-white/5 text-zinc-500"
              }`}
            >
              {f.includeI18n ? "ENABLED" : "OFF"}
            </span>
          </button>
        </div>
      </div>
    </CollapsibleSection>
  );
};
