import React, { useState } from "react";
import {
  Copy,
  Check,
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
    <aside className="rounded-lg border border-border bg-surface p-4 sm:p-5">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <span className="font-heading text-xs font-semibold text-text-muted">
            Command
          </span>
          <div className="flex rounded border border-border bg-surface-raised p-0.5 text-[11px]">
            <button
              type="button"
              onClick={() => setCommandMode("non-interactive")}
              className={`rounded px-2 py-0.5 font-medium transition-colors cursor-pointer ${
                commandMode === "non-interactive"
                  ? "bg-surface-secondary text-text-primary"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              Exact flags
            </button>
            <button
              type="button"
              onClick={() => setCommandMode("interactive")}
              className={`rounded px-2 py-0.5 font-medium transition-colors cursor-pointer ${
                commandMode === "interactive"
                  ? "bg-surface-secondary text-text-primary"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              Wizard
            </button>
          </div>
        </div>

        {/* Command Box with Horizontal Scroll, pre formatting */}
        <div className="mt-3 rounded-md border border-border bg-[#0B0E11] p-3 font-mono text-xs">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2 min-w-0 flex-1 overflow-x-auto scrollbar-thin py-0.5">
              <span className="select-none text-accent font-semibold">$</span>
              <pre className="text-text-primary whitespace-pre font-mono text-[12px] leading-relaxed">
                {command}
              </pre>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="flex shrink-0 items-center gap-1.5 rounded bg-surface-raised border border-border px-2.5 py-1 text-xs text-text-secondary hover:bg-surface-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-success" />
                  <span className="text-success text-[11px] font-medium font-body">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-text-muted" />
                  <span className="text-[11px] font-medium font-body">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Feature Specification Summary — Clean Definition List */}
      <div className="mt-5 border-t border-border-line pt-4">
        <h3 className="font-heading text-xs font-semibold text-text-muted mb-2.5">
          Blueprint summary
        </h3>

        <dl className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-border-line/40">
            <dt className="text-text-muted font-mono text-[11px]">Entity</dt>
            <dd className="font-semibold text-text-primary font-mono">{feature.name || "None"}</dd>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-border-line/40">
            <dt className="text-text-muted font-mono text-[11px]">Layer</dt>
            <dd className="font-medium text-text-primary capitalize">{feature.mode}</dd>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-border-line/40">
            <dt className="text-text-muted font-mono text-[11px]">Fields</dt>
            <dd className="font-mono text-text-primary">{feature.fields.length}</dd>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-border-line/40">
            <dt className="text-text-muted font-mono text-[11px]">Relations</dt>
            <dd className="font-mono text-text-primary">{relationsCount}</dd>
          </div>
          <div className="flex items-center justify-between py-1">
            <dt className="text-text-muted font-mono text-[11px]">Enums</dt>
            <dd className="font-mono text-text-primary">{enumsCount}</dd>
          </div>
        </dl>
      </div>

      {/* Direct workflow notice */}
      <div className="mt-4 rounded-md border border-border bg-surface-raised/60 p-3 text-[11px] text-text-muted font-mono">
        <div className="text-text-secondary font-semibold mb-1">Execution order:</div>
        <ol className="list-decimal pl-4 space-y-0.5 text-text-muted">
          <li>Run <code className="text-text-primary">cd nexus-app</code></li>
          <li>Execute command above</li>
          <li>C# CQRS handlers &amp; UI views generated</li>
        </ol>
      </div>

    </aside>
  );
};


