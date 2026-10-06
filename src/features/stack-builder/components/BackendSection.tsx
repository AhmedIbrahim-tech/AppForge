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
      icon={<Server className="h-4 w-4" />}
      title="Backend Architecture"
      summaryBadges={summaryBadges}
      expanded={expanded}
      onToggle={onToggle}
      accent="cyan"
      notIncluded={isFrontendOnly}
      notIncludedMessage="Backend is not included in this Frontend Only project."
      actionText="Enable Backend (Full Stack)"
      onIncludeAction={() => onSetProjectType("fullstack")}
      badge={
        !isFrontendOnly ? (
          <span className="inline-flex items-center gap-1 rounded-md border border-cyan-500/25 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
            <Cpu className="h-3 w-3" /> .NET 10
          </span>
        ) : null
      }
    >
      <div className="space-y-6">
        {/* 1. Architecture Group */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-2 border-b border-white/5 pb-1.5">
            <Layers className="h-3.5 w-3.5 text-cyan-400" />
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
              Architecture & Pattern
            </h4>
          </div>

          {/* Presentation Layer (Shown when project is Backend Only) */}
          {config.projectType === "backend" ? (
            <div>
              <span className="mb-1.5 block text-xs font-medium text-zinc-400">
                Presentation Layer
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {BACKEND_PRESENTATIONS.map((pres) => {
                  const disabledState = pres.getDisabledState?.(config) || {
                    disabled: false,
                  };
                  return (
                    <OptionPill
                      key={pres.value}
                      accent="cyan"
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
            <span className="mb-1.5 block text-xs font-medium text-zinc-400">
              Application Pattern
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BACKEND_ARCHITECTURES.map((arch) => (
                <OptionCard
                  key={arch.value}
                  accent="cyan"
                  selected={b.architecture === arch.value}
                  onClick={() => onSetArchitecture(arch.value)}
                  icon={
                    arch.value === "CQRS + MediatR" ? (
                      <Workflow className="h-4 w-4 text-cyan-400" />
                    ) : (
                      <Box className="h-4 w-4 text-cyan-400" />
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
            <span className="mb-1.5 block text-xs font-medium text-zinc-400">
              Object Mapping
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {BACKEND_MAPPINGS.map((map) => (
                <OptionPill
                  key={map.value}
                  accent="cyan"
                  selected={b.mapping === map.value}
                  onClick={() => onSetMapping(map.value)}
                  label={map.label}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 2. Data Group */}
        <div className="space-y-3.5 border-t border-white/5 pt-5">
          <div className="flex items-center gap-2 border-b border-white/5 pb-1.5">
            <Database className="h-3.5 w-3.5 text-cyan-400" />
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
              Data & Persistence
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="mb-1.5 block text-xs font-medium text-zinc-400">
                Data Access & ORM
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {BACKEND_ORMS.map((orm) => (
                  <OptionPill
                    key={orm.value}
                    accent="cyan"
                    selected={b.orm === orm.value}
                    onClick={() => onSetOrm(orm.value)}
                    label={orm.label}
                  />
                ))}
              </div>
            </div>

            <div>
              <span className="mb-1.5 block text-xs font-medium text-zinc-400">
                Database Engine
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {BACKEND_DATABASES.map((db) => (
                  <OptionPill
                    key={db.value}
                    accent="cyan"
                    selected={b.database === db.value}
                    onClick={() => onSetDatabase(db.value)}
                    icon={<Database className="h-3 w-3 text-cyan-400" />}
                    label={db.label}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Security Group */}
        <div className="space-y-3.5 border-t border-white/5 pt-5">
          <div className="flex items-center gap-2 border-b border-white/5 pb-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
              Security
            </h4>
          </div>

          <div>
            <span className="mb-1.5 block text-xs font-medium text-zinc-400">
              Authentication Strategy
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {BACKEND_AUTHS.map((auth) => {
                const disabledState = auth.getDisabledState?.(config) || {
                  disabled: false,
                };
                return (
                  <OptionPill
                    key={auth.value}
                    accent="cyan"
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

        {/* 4. Backend Capabilities */}
        <div className="space-y-3.5 border-t border-white/5 pt-5">
          <div className="flex items-center gap-2 border-b border-white/5 pb-1.5">
            <Cpu className="h-3.5 w-3.5 text-cyan-400" />
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
              Backend Capabilities
            </h4>
          </div>

          {/* Logging Provider */}
          <div>
            <span className="mb-1.5 block text-xs font-medium text-zinc-400">
              Logging Provider
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {BACKEND_LOGGINGS.map((log) => (
                <OptionPill
                  key={log.value}
                  accent="cyan"
                  selected={(b.logging || "Serilog") === log.value}
                  onClick={() => onSetLogging(log.value)}
                  label={log.label}
                />
              ))}
            </div>
          </div>

          {/* Extensions & API Tooling */}
          <div>
            <span className="mb-1.5 block text-xs font-medium text-zinc-400">
              Extensions & API Tooling
            </span>
            <div
              className={`grid grid-cols-1 ${
                isApiPresentation ? "sm:grid-cols-3" : "sm:grid-cols-2"
              } gap-2.5`}
            >
              {/* SignalR */}
              <button
                type="button"
                onClick={onToggleSignalR}
                className={`flex items-center justify-between rounded-xl border p-2.5 text-xs transition-colors cursor-pointer ${
                  b.signalR
                    ? "border-cyan-500/60 bg-cyan-500/10 text-white ring-1 ring-cyan-500/20"
                    : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Radio className={`h-3.5 w-3.5 ${b.signalR ? "text-cyan-400" : "text-zinc-500"}`} />
                  <span className="font-medium">SignalR WebSockets</span>
                </div>
                <span
                  className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                    b.signalR
                      ? "bg-cyan-500/20 text-cyan-300 font-semibold"
                      : "bg-white/5 text-zinc-500"
                  }`}
                >
                  {b.signalR ? "ON" : "OFF"}
                </span>
              </button>

              {/* Hangfire */}
              <button
                type="button"
                onClick={onToggleHangfire}
                className={`flex items-center justify-between rounded-xl border p-2.5 text-xs transition-colors cursor-pointer ${
                  b.hangfire
                    ? "border-amber-500/60 bg-amber-500/10 text-white ring-1 ring-amber-500/20"
                    : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Flame className={`h-3.5 w-3.5 ${b.hangfire ? "text-amber-400" : "text-zinc-500"}`} />
                  <span className="font-medium">Hangfire Jobs</span>
                </div>
                <span
                  className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                    b.hangfire
                      ? "bg-amber-500/20 text-amber-300 font-semibold"
                      : "bg-white/5 text-zinc-500"
                  }`}
                >
                  {b.hangfire ? "ON" : "OFF"}
                </span>
              </button>

              {/* Swagger / OpenAPI (only for Web APIs) */}
              {isApiPresentation ? (
                <button
                  type="button"
                  onClick={onToggleSwagger}
                  className={`flex items-center justify-between rounded-xl border p-2.5 text-xs transition-colors cursor-pointer ${
                    b.includeSwagger
                      ? "border-cyan-500/60 bg-cyan-500/10 text-white ring-1 ring-cyan-500/20"
                      : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileCode className={`h-3.5 w-3.5 ${b.includeSwagger ? "text-cyan-400" : "text-zinc-500"}`} />
                    <span className="font-medium">Swagger / OpenAPI</span>
                  </div>
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                      b.includeSwagger
                        ? "bg-cyan-500/20 text-cyan-300 font-semibold"
                        : "bg-white/5 text-zinc-500"
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
