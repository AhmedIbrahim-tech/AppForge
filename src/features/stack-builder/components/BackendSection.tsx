import React from "react";
import {
  Server,
  Workflow,
  Box,
  Database,
  ShieldCheck,
  Cpu,
  Layers,
  Radio,
  Flame,
  FileCode,
} from "lucide-react";
import {
  CollapsibleSection,
  OptionCard,
  OptionPill,
} from "./ui";
import {
  BACKEND_PRESENTATIONS,
  BACKEND_ARCHITECTURES,
  BACKEND_ORMS,
  BACKEND_DATABASES,
  BACKEND_AUTHS,
  BACKEND_MAPPINGS,
  BACKEND_LOGGINGS,
} from "../capabilities";
import type {
  BackendPresentation,
  BackendArchitecture,
  BackendOrm,
  BackendDatabase,
  BackendAuth,
  BackendMapping,
  BackendLogging,
  StackConfiguration,
  ProjectType,
} from "../types";

export interface BackendSectionProps {
  config: StackConfiguration;
  expanded: boolean;
  onToggle: () => void;
  onSetProjectType: (type: ProjectType) => void;
  onSetPresentation: (p: BackendPresentation) => void;
  onSetArchitecture: (a: BackendArchitecture) => void;
  onSetOrm: (o: BackendOrm) => void;
  onSetDatabase: (d: BackendDatabase) => void;
  onSetAuth: (a: BackendAuth) => void;
  onSetMapping: (m: BackendMapping) => void;
  onSetLogging: (l: BackendLogging) => void;
  onToggleSignalR: () => void;
  onToggleHangfire: () => void;
  onToggleSwagger: () => void;
}

export const BackendSection: React.FC<BackendSectionProps> = ({
  config,
  expanded,
  onToggle,
  onSetProjectType,
  onSetPresentation,
  onSetArchitecture,
  onSetOrm,
  onSetDatabase,
  onSetAuth,
  onSetMapping,
  onSetLogging,
  onToggleSignalR,
  onToggleHangfire,
  onToggleSwagger,
}) => {
  const isFrontendOnly = config.projectType === "frontend";
  const b = config.backend;

  const summaryBadges = isFrontendOnly
    ? []
    : [
        ...(config.projectType === "backend" ? [b.presentation] : []),
        b.architecture === "CQRS + MediatR" ? "CQRS" : "Services",
        b.orm,
        b.database,
        b.auth,
        b.signalR ? "SignalR" : null,
        b.hangfire ? "Hangfire" : null,
      ].filter((item): item is string => Boolean(item));

  const isApiPresentation =
    config.projectType === "fullstack" ||
    b.presentation === "Controllers" ||
    b.presentation === "Minimal API";

  return (
    <CollapsibleSection
      id="backend-section"
      icon={<Server className="h-3.5 w-3.5" />}
      title="Backend Architecture"
      summaryBadges={summaryBadges}
      expanded={expanded}
      onToggle={onToggle}
      notIncluded={isFrontendOnly}
      notIncludedMessage="Backend is omitted in Frontend Only projects."
      actionText="Enable Backend (Full Stack)"
      onIncludeAction={() => onSetProjectType("fullstack")}
      badge={
        !isFrontendOnly ? (
          <span className="inline-flex items-center gap-1 rounded-[4px] bg-[#151A22] border border-[#252C36] px-1.5 py-0.5 font-mono text-[10px] text-[#737D8C]">
            <Cpu className="h-3 w-3" /> .NET 10
          </span>
        ) : null
      }
    >
      <div className="space-y-4">
        {/* 1. Architecture Group */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 border-b border-[#252C36] pb-1">
            <Layers className="h-3.5 w-3.5 text-[#737D8C]" />
            <h4 className="text-[11px] font-mono font-medium uppercase tracking-wider text-[#737D8C]">
              Architecture & Pattern
            </h4>
          </div>

          {/* Presentation Layer (Shown when project is Backend Only) */}
          {config.projectType === "backend" ? (
            <div>
              <span className="mb-1 block text-xs font-mono text-[#737D8C]">
                Presentation Layer
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {BACKEND_PRESENTATIONS.map((pres) => {
                  const disabledState = pres.getDisabledState?.(config) || {
                    disabled: false,
                  };
                  return (
                    <OptionPill
                      key={pres.value}
                      selected={b.presentation === pres.value}
                      disabled={disabledState.disabled}
                      disabledReason={disabledState.reason}
                      onClick={() => onSetPresentation(pres.value)}
                      label={pres.label}
                    />
                  );
                })}
              </div>
            </div>
          ) : null}

          {/* Application Architecture (Cards) */}
          <div>
            <span className="mb-1 block text-xs font-mono text-[#737D8C]">
              Application Pattern
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {BACKEND_ARCHITECTURES.map((arch) => (
                <OptionCard
                  key={arch.value}
                  selected={b.architecture === arch.value}
                  onClick={() => onSetArchitecture(arch.value)}
                  icon={
                    arch.value === "CQRS + MediatR" ? (
                      <Workflow className="h-4 w-4" />
                    ) : (
                      <Box className="h-4 w-4" />
                    )
                  }
                  title={arch.label}
                  description={arch.description}
                />
              ))}
            </div>
          </div>

          {/* Object Mapping */}
          <div>
            <span className="mb-1 block text-xs font-mono text-[#737D8C]">
              Object Mapping
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {BACKEND_MAPPINGS.map((map) => (
                <OptionPill
                  key={map.value}
                  selected={b.mapping === map.value}
                  onClick={() => onSetMapping(map.value)}
                  label={map.label}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 2. Data Group */}
        <div className="space-y-2.5 border-t border-[#252C36] pt-3.5">
          <div className="flex items-center gap-2 border-b border-[#252C36] pb-1">
            <Database className="h-3.5 w-3.5 text-[#737D8C]" />
            <h4 className="text-[11px] font-mono font-medium uppercase tracking-wider text-[#737D8C]">
              Data & Persistence
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="mb-1 block text-xs font-mono text-[#737D8C]">
                Data Access & ORM
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {BACKEND_ORMS.map((orm) => (
                  <OptionPill
                    key={orm.value}
                    selected={b.orm === orm.value}
                    onClick={() => onSetOrm(orm.value)}
                    label={orm.label}
                  />
                ))}
              </div>
            </div>

            <div>
              <span className="mb-1 block text-xs font-mono text-[#737D8C]">
                Database Engine
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {BACKEND_DATABASES.map((db) => (
                  <OptionPill
                    key={db.value}
                    selected={b.database === db.value}
                    onClick={() => onSetDatabase(db.value)}
                    label={db.label}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Security Group */}
        <div className="space-y-2.5 border-t border-[#252C36] pt-3.5">
          <div className="flex items-center gap-2 border-b border-[#252C36] pb-1">
            <ShieldCheck className="h-3.5 w-3.5 text-[#737D8C]" />
            <h4 className="text-[11px] font-mono font-medium uppercase tracking-wider text-[#737D8C]">
              Security
            </h4>
          </div>

          <div>
            <span className="mb-1 block text-xs font-mono text-[#737D8C]">
              Authentication Strategy
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {BACKEND_AUTHS.map((auth) => {
                const disabledState = auth.getDisabledState?.(config) || {
                  disabled: false,
                };
                return (
                  <OptionPill
                    key={auth.value}
                    selected={b.auth === auth.value}
                    disabled={disabledState.disabled}
                    disabledReason={disabledState.reason}
                    onClick={() => onSetAuth(auth.value)}
                    label={auth.label}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. Logging & Extensions */}
        <div className="space-y-2.5 border-t border-[#252C36] pt-3.5">
          <div className="flex items-center gap-2 border-b border-[#252C36] pb-1">
            <Cpu className="h-3.5 w-3.5 text-[#737D8C]" />
            <h4 className="text-[11px] font-mono font-medium uppercase tracking-wider text-[#737D8C]">
              Extensions & Tooling
            </h4>
          </div>

          {/* Logging Provider */}
          <div>
            <span className="mb-1 block text-xs font-mono text-[#737D8C]">
              Logging Provider
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {BACKEND_LOGGINGS.map((log) => (
                <OptionPill
                  key={log.value}
                  selected={(b.logging || "Serilog") === log.value}
                  onClick={() => onSetLogging(log.value)}
                  label={log.label}
                />
              ))}
            </div>
          </div>

          {/* Extensions */}
          <div>
            <span className="mb-1 block text-xs font-mono text-[#737D8C]">
              Runtime Features
            </span>
            <div
              className={`grid grid-cols-1 ${
                isApiPresentation ? "sm:grid-cols-3" : "sm:grid-cols-2"
              } gap-2`}
            >
              {/* SignalR */}
              <button
                type="button"
                onClick={onToggleSignalR}
                className={`flex items-center justify-between rounded-[6px] border p-2.5 text-xs transition-colors cursor-pointer ${
                  b.signalR
                    ? "border-[#4F75FF] bg-[rgba(79,117,255,0.12)] text-[#F3F6FA]"
                    : "border-[#252C36] bg-[#0E1218] text-[#A1AAB8] hover:border-[#353E4D] hover:text-[#F3F6FA]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Radio className="h-3.5 w-3.5 text-[#737D8C]" />
                  <span className="font-medium text-xs">SignalR WebSockets</span>
                </div>
                <span
                  className={`rounded-[4px] px-1.5 py-0.5 font-mono text-[10px] ${
                    b.signalR
                      ? "bg-[#4F75FF]/20 text-[#6487FF] font-medium"
                      : "bg-[#151A22] text-[#737D8C]"
                  }`}
                >
                  {b.signalR ? "ON" : "OFF"}
                </span>
              </button>

              {/* Hangfire */}
              <button
                type="button"
                onClick={onToggleHangfire}
                className={`flex items-center justify-between rounded-[6px] border p-2.5 text-xs transition-colors cursor-pointer ${
                  b.hangfire
                    ? "border-[#4F75FF] bg-[rgba(79,117,255,0.12)] text-[#F3F6FA]"
                    : "border-[#252C36] bg-[#0E1218] text-[#A1AAB8] hover:border-[#353E4D] hover:text-[#F3F6FA]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Flame className="h-3.5 w-3.5 text-[#737D8C]" />
                  <span className="font-medium text-xs">Hangfire Jobs</span>
                </div>
                <span
                  className={`rounded-[4px] px-1.5 py-0.5 font-mono text-[10px] ${
                    b.hangfire
                      ? "bg-[#4F75FF]/20 text-[#6487FF] font-medium"
                      : "bg-[#151A22] text-[#737D8C]"
                  }`}
                >
                  {b.hangfire ? "ON" : "OFF"}
                </span>
              </button>

              {/* Swagger */}
              {isApiPresentation ? (
                <button
                  type="button"
                  onClick={onToggleSwagger}
                  className={`flex items-center justify-between rounded-[6px] border p-2.5 text-xs transition-colors cursor-pointer ${
                    b.includeSwagger
                      ? "border-[#4F75FF] bg-[rgba(79,117,255,0.12)] text-[#F3F6FA]"
                      : "border-[#252C36] bg-[#0E1218] text-[#A1AAB8] hover:border-[#353E4D] hover:text-[#F3F6FA]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileCode className="h-3.5 w-3.5 text-[#737D8C]" />
                    <span className="font-medium text-xs">OpenAPI / Swagger</span>
                  </div>
                  <span
                    className={`rounded-[4px] px-1.5 py-0.5 font-mono text-[10px] ${
                      b.includeSwagger
                        ? "bg-[#4F75FF]/20 text-[#6487FF] font-medium"
                        : "bg-[#151A22] text-[#737D8C]"
                    }`}
                  >
                    {b.includeSwagger ? "ON" : "OFF"}
                  </span>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
};
