import React, { useState } from "react";
import { Copy, Check, Download, Terminal, ArrowRight } from "lucide-react";
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
      toast.success("CLI command copied to clipboard");
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
      toast.success(".fullstack-app.json downloaded");
    } catch {
      toast.error("Failed to download manifest");
    }
  };

  return (
    <div className="rounded-2xl border border-border-subtle bg-surface p-4 sm:p-5 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-text-muted">
            <Terminal className="h-4 w-4 text-accent" />
            <span>Generate Configured Stack</span>
          </div>
          <div className="mt-1 text-sm font-bold text-text-primary font-heading">
            <span>{config.projectName || "nexus-app"}</span>
            <span className="text-border-main mx-2">·</span>
            <span className="capitalize text-text-secondary text-xs font-normal">{config.projectType}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopyCommand}
            disabled={!validation.isValid}
            className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-150 cursor-pointer ${
              validation.isValid
                ? "bg-accent text-white hover:bg-accent-hover shadow-sm active:scale-[0.985]"
                : "bg-surface-secondary text-text-muted cursor-not-allowed border border-border-subtle"
            }`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-white" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy CLI Command</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownloadManifest}
            disabled={!validation.isValid}
            title="Download .fullstack-app.json manifest"
            className="flex items-center justify-center gap-1.5 rounded-xl border border-border-subtle bg-surface-secondary px-3.5 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-all duration-150 cursor-pointer shadow-xs disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download className="h-4 w-4" />
            <span>Manifest</span>
          </button>
        </div>
      </div>
    </div>
  );
};
