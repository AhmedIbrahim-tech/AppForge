import React, { useState } from "react";
import {
  Terminal,
  Copy,
  Check,
  AlertTriangle,
  Info,
  CheckCircle2,
  Layers,
  Database,
} from "lucide-react";
import type { ModuleDefinition } from "../types";
import { useStackBuilderStore } from "@/features/stack-builder/store/stackBuilderStore";

interface ModuleDetailsPanelProps {
  module: ModuleDefinition;
}

export const ModuleDetailsPanel: React.FC<ModuleDetailsPanelProps> = ({
  module,
}) => {
  const [copied, setCopied] = useState(false);

  // Read current stack builder configuration for helpful context hints
  const projectType = useStackBuilderStore((state) => state.config.projectType);
  const orm = useStackBuilderStore((state) => state.config.backend?.orm);

  const installCommand = `flatron create module ${module.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  // Evaluate provisional compatibility against Selected Stack
  const compatibilityIssues: string[] = [];
  if (module.requiresBackend && projectType === "frontend") {
    compatibilityIssues.push(
      `Your current Stack Builder selection is Frontend-Only. The "${module.name}" module requires an ASP.NET Core backend.`,
    );
  }
  if (module.requiresFrontend && projectType === "backend") {
    compatibilityIssues.push(
      `Your current Stack Builder selection is Backend-Only. The "${module.name}" module requires a frontend application SPA.`,
    );
  }
  if (module.requiresEfCore && orm === "Dapper" && projectType !== "frontend") {
    compatibilityIssues.push(
      `Your current Stack Builder selection uses Dapper-only ORM. The "${module.name}" module requires EF Core persistence (EF Core or Hybrid).`,
    );
  }

  return (
    <div className="flex flex-col rounded-xl border border-white/[0.08] bg-[#11131a] p-5 shadow-xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-white/[0.06] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-indigo-500/15 px-2 py-0.5 text-[11px] font-mono font-medium text-indigo-300">
              {module.id}
            </span>
            <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
              {module.category}
            </span>
          </div>
          <h2 className="mt-2 text-lg font-bold tracking-tight text-white">
            {module.name}
          </h2>
          <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
            {module.summary}
          </p>
        </div>
      </div>

      {/* CLI Installation Command */}
      <div className="mt-4">
        <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
          <span>Installation Command</span>
          <span className="text-[10px] text-zinc-500">Run inside project directory</span>
        </label>
        <div className="mt-1.5 flex items-center justify-between rounded-lg border border-white/[0.08] bg-[#090a0f] px-3 py-2 font-mono text-xs text-zinc-200">
          <div className="flex items-center gap-2 overflow-x-auto py-0.5">
            <Terminal className="h-3.5 w-3.5 shrink-0 text-indigo-400" />
            <span className="select-all text-indigo-200">{installCommand}</span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="ml-2 flex shrink-0 items-center gap-1 rounded bg-white/[0.06] px-2 py-1 text-[11px] font-medium text-zinc-300 transition-colors hover:bg-white/[0.12] hover:text-white"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Release & Working Directory Notice */}
      <div className="mt-3 flex items-start gap-2 rounded-lg border border-indigo-500/20 bg-indigo-500/[0.05] p-2.5 text-[11px] text-indigo-300/90 leading-relaxed">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-400" />
        <div>
          <span className="font-semibold text-indigo-200">Available in Flatron CLI v1.1.0:</span>{" "}
          Modules are installed directly into your local project. Ensure you first run{" "}
          <code className="rounded bg-black/40 px-1 py-0.5 text-white">flatron MyApp</code> and{" "}
          <code className="rounded bg-black/40 px-1 py-0.5 text-white">cd MyApp</code> before running module installation.
        </div>
      </div>

      {/* Compatibility Notice (Selected Stack Aware) */}
      {compatibilityIssues.length > 0 ? (
        <div className="mt-3 space-y-1.5 rounded-lg border border-amber-500/20 bg-amber-500/[0.05] p-3 text-[11px] text-amber-300">
          <div className="flex items-center gap-1.5 font-semibold text-amber-200">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-400" />
            <span>Selected Stack Compatibility Notice</span>
          </div>
          {compatibilityIssues.map((issue, idx) => (
            <p key={idx} className="pl-5 text-amber-300/90 leading-relaxed">
              • {issue}
            </p>
          ))}
          <p className="pl-5 text-[10px] text-zinc-500 italic">
            * Based on the options currently chosen in your Stack Builder.
          </p>
        </div>
      ) : (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.05] p-2.5 text-[11px] text-emerald-300">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
          <span>Compatible with current Stack Builder configuration.</span>
        </div>
      )}

      {/* Included Capabilities */}
      <div className="mt-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          What It Adds
        </h4>
        <ul className="mt-2 space-y-1.5">
          {module.includes.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Module Architecture & Dependencies */}
      <div className="mt-4 rounded-lg border border-white/[0.06] bg-[#0c0d14] p-3">
        <h4 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          Architecture Requirements
        </h4>
        <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-zinc-300">
            <Layers className="h-3.5 w-3.5 text-zinc-500" />
            <span className="text-zinc-500">Layer:</span>
            <span>
              {module.requiresBackend && module.requiresFrontend
                ? "Full Stack"
                : module.requiresBackend
                  ? "Backend (.NET)"
                  : "Frontend (SPA)"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-300">
            <Database className="h-3.5 w-3.5 text-zinc-500" />
            <span className="text-zinc-500">Persistence:</span>
            <span>{module.requiresEfCore ? "EF Core Required" : "None"}</span>
          </div>
        </div>

        {/* Dependencies */}
        {module.requires.length > 0 && (
          <div className="mt-3 border-t border-white/[0.05] pt-2.5 text-xs text-zinc-300">
            <span className="font-semibold text-amber-300">Dependencies: </span>
            <span>Requires {module.requires.join(", ")} module.</span>
            <p className="mt-0.5 text-[10px] text-zinc-500">
              The Flatron CLI automatically detects and prompts for prerequisite modules during installation.
            </p>
          </div>
        )}
      </div>

      {/* Discovery Commands */}
      <div className="mt-4 border-t border-white/[0.06] pt-3 text-[11px] text-zinc-400">
        <span className="font-semibold text-zinc-300">Useful CLI Inspection Commands:</span>
        <div className="mt-1.5 space-y-1 font-mono text-[10px] text-zinc-400">
          <div><code className="text-indigo-300">flatron create module --list</code> (view all available modules)</div>
          <div><code className="text-indigo-300">flatron create module --status</code> (view modules installed in project)</div>
        </div>
      </div>
    </div>
  );
};
