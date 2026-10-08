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
        b.presentation,
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
      icon={<Server className="h-4 w-4 text-accent" />}
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
          <span className="inline-flex items-center gap-1 rounded-md bg-surface-secondary border border-border-subtle px-2 py-0.5 font-mono text-[11px] text-text-muted font-medium">
            <Cpu className="h-3 w-3 text-info" /> .NET 10
          </span>
        ) : null
      }
    >
      <div className="space-y-5">
        {/* 1. Architecture Group */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-border-subtle pb-2">
            <Layers className="h-4 w-4 text-accent" />
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-text-secondary">
              Architecture &amp; Pattern
            </h4>
          </div>

          {/* Presentation Layer (Shown for both Backend Only and Full Stack) */}
          {config.projectType !== "frontend" ? (
            <div>
              <span className="mb-1.5 block text-xs font-semibold text-text-secondary">
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
            <span className="mb-1.5 block text-xs font-semibold text-text-secondary">
              Application Pattern
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
            <span className="mb-1.5 block text-xs font-semibold text-text-secondary">
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
        <div className="space-y-3 border-t border-border-subtle pt-4">
          <div className="flex items-center gap-2 border-b border-border-subtle pb-2">
            <Database className="h-4 w-4 text-info" />
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-text-secondary">
              Data &amp; Persistence
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="mb-1.5 block text-xs font-semibold text-text-secondary">
                Data Access &amp; ORM
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
              <span className="mb-1.5 block text-xs font-semibold text-text-secondary">
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
        <div className="space-y-3 border-t border-border-subtle pt-4">
          <div className="flex items-center gap-2 border-b border-border-subtle pb-2">
            <ShieldCheck className="h-4 w-4 text-success" />
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-text-secondary">
              Security &amp; Auth
            </h4>
          </div>

          <div>
            <span className="mb-1.5 block text-xs font-semibold text-text-secondary">
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
        <div className="space-y-3 border-t border-border-subtle pt-4">
          <div className="flex items-center gap-2 border-b border-border-subtle pb-2">
            <Cpu className="h-4 w-4 text-warning" />
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-text-secondary">
              Extensions &amp; Tooling
            </h4>
          </div>

          {/* Logging Provider */}
          <div>
            <span className="mb-1.5 block text-xs font-semibold text-text-secondary">
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
            <span className="mb-1.5 block text-xs font-semibold text-text-secondary">
              Runtime Features
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
                className={`flex items-center justify-between rounded-xl border p-3 text-xs transition-all cursor-pointer ${
                  b.signalR
                    ? "border-accent/80 bg-accent-subtle text-text-primary ring-1 ring-accent/30 shadow-xs"
                    : "border-border-subtle bg-surface-secondary text-text-secondary hover:border-border-hover hover:bg-surface-hover hover:text-text-primary"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Radio className="h-3.5 w-3.5 text-accent" />
                  <span className="font-semibold text-xs font-heading">SignalR</span>
                </div>
                <span
                  className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold ${
                    b.signalR
                      ? "bg-accent text-white"
                      : "bg-surface text-text-muted border border-border-subtle"
                  }`}
                >
                  {b.signalR ? "ON" : "OFF"}
                </span>
              </button>

              {/* Hangfire */}
              <button
                type="button"
                onClick={onToggleHangfire}
                className={`flex items-center justify-between rounded-xl border p-3 text-xs transition-all cursor-pointer ${
                  b.hangfire
                    ? "border-accent/80 bg-accent-subtle text-text-primary ring-1 ring-accent/30 shadow-xs"
                    : "border-border-subtle bg-surface-secondary text-text-secondary hover:border-border-hover hover:bg-surface-hover hover:text-text-primary"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Flame className="h-3.5 w-3.5 text-accent" />
                  <span className="font-semibold text-xs font-heading">Hangfire</span>
                </div>
                <span
                  className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold ${
                    b.hangfire
                      ? "bg-accent text-white"
                      : "bg-surface text-text-muted border border-border-subtle"
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
                  className={`flex items-center justify-between rounded-xl border p-3 text-xs transition-all cursor-pointer ${
                    b.includeSwagger
                      ? "border-accent/80 bg-accent-subtle text-text-primary ring-1 ring-accent/30 shadow-xs"
                      : "border-border-subtle bg-surface-secondary text-text-secondary hover:border-border-hover hover:bg-surface-hover hover:text-text-primary"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileCode className="h-3.5 w-3.5 text-accent" />
                    <span className="font-semibold text-xs font-heading">Swagger</span>
                  </div>
                  <span
                    className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold ${
                      b.includeSwagger
                        ? "bg-accent text-white"
                        : "bg-surface text-text-muted border border-border-subtle"
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
