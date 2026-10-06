import React, { useState } from "react";
import {
  Terminal,
  Copy,
  Check,
  Info,
} from "lucide-react";
import type { FeatureDefinition } from "../types";
import {
  buildFeatureCliCommand,
  buildInteractiveFeatureCommand,
} from "../command-builder";
import { useStackBuilderStore } from "@/features/stack-builder/store/stackBuilderStore";

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

  // Stack Builder selected context
  const stackBuilderType = useStackBuilderStore((state) => state.config.projectType);

  const command =
    commandMode === "interactive"
      ? buildInteractiveFeatureCommand(feature.name)
      : buildFeatureCliCommand(feature);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const hasRichText = feature.fields.some((f) => f.kind === "richText");
  const relationsCount = feature.fields.filter((f) => f.kind === "relationship").length;
  const enumsCount = feature.fields.filter((f) => f.kind === "enum").length;

  return (
    <div className="flex flex-col rounded-xl border border-white/[0.08] bg-[#11131a] p-5 shadow-xl">
      {/* Header */}
      <div className="border-b border-white/[0.06] pb-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            CLI Command Preview
          </span>
          <div className="flex rounded-lg border border-white/[0.08] bg-[#0c0d14] p-0.5 text-[11px]">
            <button
              type="button"
              onClick={() => setCommandMode("non-interactive")}
              className={`rounded-md px-2 py-1 font-medium transition-colors ${
                commandMode === "non-interactive"
                  ? "bg-indigo-600 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              One-Line Command
            </button>
            <button
              type="button"
              onClick={() => setCommandMode("interactive")}
              className={`rounded-md px-2 py-1 font-medium transition-colors ${
                commandMode === "interactive"
                  ? "bg-indigo-600 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Terminal Wizard
            </button>
          </div>
        </div>

        {/* Command Box */}
        <div className="mt-3 relative rounded-lg border border-white/[0.08] bg-[#090a0f] p-3 font-mono text-xs text-zinc-200">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2 overflow-x-auto py-1 pr-2 max-h-32">
              <Terminal className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-400" />
              <span className="select-all text-indigo-200 whitespace-pre-wrap break-all leading-relaxed">
                {command}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="flex shrink-0 items-center gap-1 rounded bg-white/[0.06] px-2.5 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/[0.12] hover:text-white"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        <p className="mt-2 text-[10px] text-zinc-500">
          {commandMode === "interactive"
            ? "Launches the interactive CLI Feature Wizard to configure fields directly in your terminal."
            : "Runs feature generation non-interactively using exact field definitions."}
        </p>
      </div>

      {/* Feature Specification Summary */}
      <div className="mt-4 space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Feature Blueprint Summary
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-lg border border-white/[0.06] bg-[#0c0d14] p-2.5">
            <span className="text-zinc-500 block text-[10px]">Entity</span>
            <span className="font-semibold text-white">{feature.name || "None"}</span>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-[#0c0d14] p-2.5">
            <span className="text-zinc-500 block text-[10px]">Target Surface</span>
            <span className="font-semibold text-white uppercase text-[11px]">{feature.mode}</span>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-[#0c0d14] p-2.5">
            <span className="text-zinc-500 block text-[10px]">Fields Count</span>
            <span className="font-semibold text-white">{feature.fields.length} properties</span>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-[#0c0d14] p-2.5">
            <span className="text-zinc-500 block text-[10px]">Relations / Enums</span>
            <span className="font-semibold text-white">
              {relationsCount} rel · {enumsCount} enum
            </span>
          </div>
        </div>
      </div>

      {/* Advisory Notices */}
      <div className="mt-4 space-y-2">
        {hasRichText && (
          <div className="flex items-start gap-2 rounded-lg border border-rose-500/20 bg-rose-500/[0.05] p-2.5 text-xs text-rose-300">
            <Info className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
            <div>
              <span className="font-semibold">Module Dependency:</span> Rich text fields require
              the <code className="text-white">rich-text</code> module. Install it via{" "}
              <code className="text-rose-200">flatron create module rich-text</code>.
            </div>
          </div>
        )}

        <div className="flex items-start gap-2 rounded-lg border border-indigo-500/20 bg-indigo-500/[0.05] p-2.5 text-xs text-indigo-300/90 leading-relaxed">
          <Info className="h-4 w-4 shrink-0 text-indigo-400 mt-0.5" />
          <div>
            <span className="font-semibold text-indigo-200">Available in Flatron CLI v1.1.0:</span>{" "}
            Run inside your Flatron project root (<code className="text-white">cd MyApp</code>). The CLI generates C# Clean Architecture entities, repositories, endpoints, and frontend components.
          </div>
        </div>

        {stackBuilderType && (
          <div className="text-[11px] text-zinc-500 pl-1">
            * Selected Stack in Builder: <span className="text-zinc-300 capitalize">{stackBuilderType}</span>
          </div>
        )}
      </div>
    </div>
  );
};
