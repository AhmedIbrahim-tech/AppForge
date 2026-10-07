import React, { useState } from "react";
import {
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import type { ModuleDefinition } from "../types";
import { useStackBuilderStore } from "@/features/stack-builder/store/stackBuilderStore";
import { toast } from "sonner";

interface ModuleDetailsPanelProps {
  module: ModuleDefinition;
}

export const ModuleDetailsPanel: React.FC<ModuleDetailsPanelProps> = ({
  module,
}) => {
  const [copied, setCopied] = useState(false);

  // Stack Builder selected context
  const projectType = useStackBuilderStore((state) => state.config.projectType);
  const orm = useStackBuilderStore((state) => state.config.backend?.orm);

  const installCommand = `flatron create module ${module.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      toast.success("Command copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy command");
    }
  };

  // Compatibility evaluation
  const compatibilityIssues: string[] = [];
  if (module.requiresBackend && projectType === "frontend") {
    compatibilityIssues.push(
      `Requires .NET backend (current stack is Frontend-Only).`,
    );
  }
  if (module.requiresFrontend && projectType === "backend") {
    compatibilityIssues.push(
      `Requires frontend SPA (current stack is Backend-Only).`,
    );
  }
  if (module.requiresEfCore && orm === "Dapper" && projectType !== "frontend") {
    compatibilityIssues.push(
      `Requires EF Core persistence (current stack is Dapper-only).`,
    );
  }

  return (
    <aside
      key={module.id}
      className="flex flex-col rounded-lg border border-border bg-surface p-4 sm:p-5 animate-fade-in"
    >
      {/* Header */}
      <div className="border-b border-border-line pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-semibold text-accent">
            {module.id}
          </span>
          <span className="text-[10px] font-mono text-text-muted uppercase">
            {module.category}
          </span>
        </div>
        <h2 className="font-heading mt-1.5 text-lg font-bold text-text-primary tracking-tight">
          {module.name}
        </h2>
        <p className="mt-1 text-xs text-text-secondary leading-relaxed">
          {module.summary}
        </p>
      </div>

      {/* CLI Installation Command */}
      <div className="mt-4">
        <span className="font-heading text-xs font-semibold text-text-muted">
          Install command
        </span>
        <div className="mt-1.5 flex items-center justify-between rounded-md border border-border bg-[#0B0E11] px-3 py-2 font-mono text-xs">
          <div className="flex items-center gap-2 overflow-x-auto min-w-0 flex-1">
            <span className="select-none text-accent font-semibold">$</span>
            <span className="text-text-primary truncate">{installCommand}</span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="ml-2 flex shrink-0 items-center gap-1 rounded bg-surface-raised border border-border px-2 py-1 text-xs text-text-secondary hover:bg-surface-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-success" />
                <span className="text-success text-[11px] font-medium font-body">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 text-text-muted" />
                <span className="text-[11px] font-medium font-body">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Included Capabilities */}
      <div className="mt-5">
        <h4 className="font-heading text-xs font-semibold text-text-muted">
          Included capabilities
        </h4>
        <ul className="mt-2 space-y-1.5 text-xs text-text-secondary">
          {module.includes.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-accent font-mono text-[10px] mt-0.5">•</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Compatibility Notice */}
      <div className="mt-5 border-t border-border-line pt-3.5">
        {compatibilityIssues.length > 0 ? (
          <div className="rounded-md border border-warning/30 bg-warning/10 p-2.5 text-[11px] text-warning">
            <div className="flex items-center gap-1.5 font-semibold text-warning font-heading">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-warning" />
              <span>Stack notice</span>
            </div>
            {compatibilityIssues.map((issue, idx) => (
              <p key={idx} className="mt-1 pl-5 text-warning leading-relaxed font-body">
                {issue}
              </p>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-[11px] text-text-muted font-mono">
            <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
            <span>Compatible with current Stack Builder config</span>
          </div>
        )}
      </div>
    </aside>
  );
};


