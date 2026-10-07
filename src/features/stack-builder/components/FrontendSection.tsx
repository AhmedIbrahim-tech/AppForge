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
  const angularUis = FRONTEND_UIS.filter(
    (u) =>
      u.value === "Angular Material" ||
      u.value === "Ant Design Angular" ||
      u.value === "None",
  );

  return (
    <CollapsibleSection
      id="frontend-section"
      icon={<Layout className="h-3.5 w-3.5" />}
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
          <span className="rounded-[4px] bg-[#151A22] border border-[#252C36] px-1.5 py-0.5 font-mono text-[10px] text-[#737D8C]">
            {f.framework} · {f.framework === "React" ? f.tooling : "Angular CLI"}
          </span>
        ) : null
      }
    >
      <div className="space-y-4">
        {/* 1. Primary Decision: Framework */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 border-b border-[#252C36] pb-1">
            <Layers className="h-3.5 w-3.5 text-[#737D8C]" />
            <h4 className="text-[11px] font-mono font-medium uppercase tracking-wider text-[#737D8C]">
              Frontend Framework
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onSetFramework("React")}
              className={`flex flex-col justify-between rounded-[7px] border p-3 text-left transition-colors cursor-pointer ${
                f.framework === "React"
                  ? "border-[#4F75FF] bg-[rgba(79,117,255,0.12)] text-[#F3F6FA]"
                  : "border-[#252C36] bg-[#0E1218] text-[#A1AAB8] hover:border-[#353E4D] hover:text-[#F3F6FA]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-[#F3F6FA]">React 19</span>
                {f.framework === "React" && (
                  <Check className="h-3.5 w-3.5 text-[#4F75FF] shrink-0" />
                )}
              </div>
              <p className="mt-1 text-[11px] text-[#737D8C] leading-relaxed">
                Vite or Next.js with modern component architecture and TypeScript.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onSetFramework("Angular")}
              className={`flex flex-col justify-between rounded-[7px] border p-3 text-left transition-colors cursor-pointer ${
                f.framework === "Angular"
                  ? "border-[#4F75FF] bg-[rgba(79,117,255,0.12)] text-[#F3F6FA]"
                  : "border-[#252C36] bg-[#0E1218] text-[#A1AAB8] hover:border-[#353E4D] hover:text-[#F3F6FA]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-[#F3F6FA]">Angular</span>
                {f.framework === "Angular" && (
                  <Check className="h-3.5 w-3.5 text-[#4F75FF] shrink-0" />
                )}
              </div>
              <p className="mt-1 text-[11px] text-[#737D8C] leading-relaxed">
                Enterprise standalone architecture with Angular CLI and NgRx.
              </p>
            </button>
          </div>
        </div>

        {/* 2. Ecosystem Specific Options */}
        {f.framework === "React" ? (
          <div className="space-y-3.5 border-t border-[#252C36] pt-3.5">
            {/* Tooling & Language */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="mb-1 block text-xs font-mono text-[#737D8C]">
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
                <span className="mb-1 block text-xs font-mono text-[#737D8C]">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="mb-1 block text-xs font-mono text-[#737D8C]">
                  Styling
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
                <span className="mb-1 block text-xs font-mono text-[#737D8C]">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="mb-1 block text-xs font-mono text-[#737D8C]">
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
                <span className="mb-1 block text-xs font-mono text-[#737D8C]">
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

            {/* UI Kit */}
            <div>
              <span className="mb-1 block text-xs font-mono text-[#737D8C]">
                UI Components
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
          <div className="space-y-3.5 border-t border-[#252C36] pt-3.5">
            {/* Angular Defaults */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="mb-1 block text-xs font-mono text-[#737D8C]">Tooling</span>
                <div className="inline-flex items-center gap-2 rounded-[6px] border border-[#252C36] bg-[#0E1218] px-3 py-1.5 text-xs text-[#F3F6FA]">
                  <span className="font-semibold">Angular CLI</span>
                </div>
              </div>

              <div>
                <span className="mb-1 block text-xs font-mono text-[#737D8C]">Language</span>
                <div className="inline-flex items-center gap-2 rounded-[6px] border border-[#252C36] bg-[#0E1218] px-3 py-1.5 text-xs text-[#F3F6FA]">
                  <span className="font-semibold">TypeScript</span>
                </div>
              </div>
            </div>

            {/* Styling & State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="mb-1 block text-xs font-mono text-[#737D8C]">Styling</span>
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
                <span className="mb-1 block text-xs font-mono text-[#737D8C]">State</span>
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

            {/* UI Components */}
            <div>
              <span className="mb-1 block text-xs font-mono text-[#737D8C]">UI System</span>
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

        {/* 3. Localization */}
        <div className="border-t border-[#252C36] pt-3">
          <button
            type="button"
            onClick={onToggleI18n}
            className={`flex w-full items-center justify-between rounded-[6px] border p-2.5 transition-colors cursor-pointer ${
              f.includeI18n
                ? "border-[#4F75FF] bg-[rgba(79,117,255,0.12)] text-[#F3F6FA]"
                : "border-[#252C36] bg-[#0E1218] text-[#A1AAB8] hover:border-[#353E4D] hover:text-[#F3F6FA]"
            }`}
          >
            <div className="flex items-center gap-2">
              <Globe className="h-3.5 w-3.5 text-[#737D8C]" />
              <span className="text-xs font-medium">i18n Internationalization Setup</span>
            </div>
            <span
              className={`rounded-[4px] px-1.5 py-0.5 font-mono text-[10px] ${
                f.includeI18n
                  ? "bg-[#4F75FF]/20 text-[#6487FF] font-medium"
                  : "bg-[#151A22] text-[#737D8C]"
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
