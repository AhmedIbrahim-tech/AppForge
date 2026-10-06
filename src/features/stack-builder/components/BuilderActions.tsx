import React, { useState } from "react";
import { Copy, Check, Download, Terminal } from "lucide-react";
import { toast } from "sonner";
import { buildCliCommand, buildManifestJson } from "../capabilities";
import type { StackConfiguration, ValidationResult } from "../types";

export interface BuilderActionsProps {
  config: StackConfiguration;
  validation: ValidationResult;
}

export const BuilderActions: React.FC<BuilderActionsProps> = ({
  config,
  validation,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCommand = async () => {
    try {
      const command = buildCliCommand(config);
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy command");
    }
  };

  const handleDownloadManifest = () => {
    try {
      const manifestJson = buildManifestJson(config);
      const blob = new Blob([manifestJson], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = ".fullstack-app.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success(".fullstack-app.json downloaded!");
    } catch {
      toast.error("Failed to download manifest");
    }
  };

  return (
    <div className="rounded-2xl border border-white/8 bg-[#0c0e18] p-4 sm:p-5 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <Terminal className="h-3.5 w-3.5 text-indigo-400" />
            <span>Ready to Scaffold with Flatron</span>
          </div>
          <div className="mt-0.5 text-sm font-semibold text-white">
            {config.projectName || "my-flatron-app"}{" "}
            <span className="font-normal text-zinc-400">·</span>{" "}
            <span className="capitalize font-normal text-zinc-300">
              {config.projectType}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopyCommand}
            disabled={!validation.isValid}
            className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-white transition-all cursor-pointer active:scale-98 ${
              validation.isValid
                ? "bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 shadow-[0_0_24px_-4px_rgba(99,102,241,0.6)] hover:opacity-95"
                : "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5"
            }`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-300" />
                <span>Copied Command!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy CLI Command</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownloadManifest}
            disabled={!validation.isValid}
            title="Download .fullstack-app.json manifest"
            className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-mono font-medium text-zinc-300 transition-all hover:bg-white/10 hover:text-white cursor-pointer active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Manifest</span>
          </button>
        </div>
      </div>
    </div>
  );
};
