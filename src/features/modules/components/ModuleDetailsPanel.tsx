import React, { useState } from "react";
import {
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  Terminal,
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
      className="flex flex-col rounded-2xl border border-border-subtle bg-surface p-5 sm:p-6 shadow-card animate-fade-in space-y-4"
    >
      {/* Header */}
      <div className="border-b border-border-subtle pb-4">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-xs font-bold text-accent">
            {module.id}
          </span>
          <span className="text-[10px] font-mono text-info bg-info/10 px-2 py-0.5 rounded-md border border-info/20 font-semibold uppercase">
            {module.category}
          </span>
        </div>
        <h2 className="font-heading mt-2 text-lg font-bold text-text-primary tracking-tight">
          {module.name}
        </h2>
        <p className="mt-1.5 text-xs text-text-secondary leading-relaxed font-sans">
          {module.summary}
        </p>
      </div>

      {/* CLI Installation Command */}
      <div>
        <span className="font-heading text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
          <Terminal className="h-3.5 w-3.5 text-accent" />
          <span>Install Command</span>
        </span>
        <div className="mt-2 flex items-center justify-between rounded-xl border border-[var(--bg-code-border)] bg-[var(--bg-code)] px-3.5 py-2.5 font-mono text-xs shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto min-w-0 flex-1">
            <span className="select-none text-accent font-bold">$</span>
            <span className="text-slate-200 truncate">{installCommand}</span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="ml-2 flex shrink-0 items-center gap-1 rounded-lg bg-slate-800 border border-slate-700 px-2.5 py-1 text-xs text-slate-300 hover:bg-slate-700 hover:text-white transition-all cursor-pointer shadow-xs"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-success" />
                <span className="text-success text-xs font-medium font-sans">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-xs font-medium font-sans">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Included Capabilities */}
      <div>
        <h4 className="font-heading text-xs font-bold text-text-muted uppercase tracking-wider">
          Included Capabilities
        </h4>
        <ul className="mt-2.5 space-y-2 text-xs text-text-secondary">
          {module.includes.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-accent font-bold text-sm leading-none mt-0.5">•</span>
              <span className="leading-relaxed font-sans">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Compatibility Notice */}
      <div className="border-t border-border-subtle pt-4">
        {compatibilityIssues.length > 0 ? (
          <div className="rounded-xl border border-warning/30 bg-warning/10 p-3 text-xs text-warning shadow-xs">
            <div className="flex items-center gap-1.5 font-bold text-warning font-heading">
              <AlertTriangle className="h-4 w-4 shrink-0 text-warning" />
              <span>Stack Notice</span>
            </div>
            {compatibilityIssues.map((issue, idx) => (
              <p key={idx} className="mt-1 pl-5 text-warning leading-relaxed font-sans text-[11px]">
                {issue}
              </p>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-text-muted font-mono bg-surface-secondary/70 p-2.5 rounded-xl border border-border-subtle">
            <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
            <span className="text-[11px]">Compatible with current Stack Builder config</span>
          </div>
        )}
      </div>
    </aside>
  );
};
