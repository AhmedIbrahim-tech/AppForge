import React, { useState } from "react";
import {
  Copy,
  Check,
  Terminal,
} from "lucide-react";
import type { FeatureDefinition } from "../types";
import {
  buildFeatureCliCommand,
  buildInteractiveFeatureCommand,
} from "../command-builder";
import { toast } from "sonner";

interface FeatureReviewPanelProps {
  feature: FeatureDefinition;
}

export const FeatureReviewPanel: React.FC<FeatureReviewPanelProps> = ({
  feature,
}) => {
  const [commandMode, setCommandMode] = useState<"non-interactive" | "interactive">(
    "non-interactive",
  );
  const [copied, setCopied] = useState(false);

  const command =
    commandMode === "interactive"
      ? buildInteractiveFeatureCommand(feature.name)
      : buildFeatureCliCommand(feature);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      toast.success("Command copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy command");
    }
  };

  const relationsCount = feature.fields.filter((f) => f.kind === "relationship").length;
  const enumsCount = feature.fields.filter((f) => f.kind === "enum").length;

  return (
    <aside className="rounded-2xl border border-border-subtle bg-surface p-5 shadow-card space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <span className="font-heading text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-accent" />
            <span>CLI Scaffolding</span>
          </span>
          <div className="flex rounded-lg border border-border-subtle bg-surface-secondary p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setCommandMode("non-interactive")}
              className={`rounded-md px-2 py-0.5 font-medium transition-all cursor-pointer ${
                commandMode === "non-interactive"
                  ? "bg-surface text-text-primary font-bold shadow-xs border border-border-subtle"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              Exact Flags
            </button>
            <button
              type="button"
              onClick={() => setCommandMode("interactive")}
              className={`rounded-md px-2 py-0.5 font-medium transition-all cursor-pointer ${
                commandMode === "interactive"
                  ? "bg-surface text-text-primary font-bold shadow-xs border border-border-subtle"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              Wizard
            </button>
          </div>
        </div>

        {/* Command Box with Horizontal Scroll, pre formatting */}
        <div className="mt-3 rounded-xl border border-[var(--bg-code-border)] bg-[var(--bg-code)] p-3.5 font-mono text-xs">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2 min-w-0 flex-1 overflow-x-auto scrollbar-thin py-0.5">
              <span className="select-none text-accent font-bold">$</span>
              <pre className="text-slate-200 whitespace-pre font-mono text-[12px] leading-relaxed">
                {command}
              </pre>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="flex shrink-0 items-center gap-1.5 rounded-lg bg-slate-800 border border-slate-700 px-2.5 py-1 text-xs text-slate-300 hover:bg-slate-700 hover:text-white transition-all cursor-pointer shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-success" />
                  <span className="text-success font-medium font-sans">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-slate-400" />
                  <span className="font-sans">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Feature Specification Summary — Clean Definition List */}
      <div className="border-t border-border-subtle pt-4">
        <h3 className="font-heading text-xs font-bold text-text-muted uppercase tracking-wider mb-3">
          Blueprint Summary
        </h3>

        <dl className="space-y-2 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-border-subtle">
            <dt className="text-text-muted font-mono text-[11px]">Entity Model</dt>
            <dd className="font-bold text-text-primary font-mono">{feature.name || "None"}</dd>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-border-subtle">
            <dt className="text-text-muted font-mono text-[11px]">Layer Target</dt>
            <dd className="font-semibold text-text-primary capitalize">{feature.mode}</dd>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-border-subtle">
            <dt className="text-text-muted font-mono text-[11px]">Fields Count</dt>
            <dd className="font-mono text-text-primary font-semibold">{feature.fields.length}</dd>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-border-subtle">
            <dt className="text-text-muted font-mono text-[11px]">Relationships</dt>
            <dd className="font-mono text-text-primary font-semibold">{relationsCount}</dd>
          </div>
          <div className="flex items-center justify-between py-1">
            <dt className="text-text-muted font-mono text-[11px]">Enums</dt>
            <dd className="font-mono text-text-primary font-semibold">{enumsCount}</dd>
          </div>
        </dl>
      </div>

      {/* Direct workflow notice */}
      <div className="rounded-xl border border-border-subtle bg-surface-secondary/70 p-3.5 text-xs text-text-secondary font-sans">
        <div className="text-text-primary font-bold mb-1.5 flex items-center gap-1.5 font-heading">
          <span>Execution Workflow:</span>
        </div>
        <ol className="list-decimal pl-4 space-y-1 text-text-secondary text-[11px]">
          <li>Navigate into your project directory (<code className="font-mono text-accent">cd nexus-app</code>)</li>
          <li>Execute the generated CLI command</li>
          <li>C# CQRS handlers, entities &amp; UI views generated</li>
        </ol>
      </div>
    </aside>
  );
};
