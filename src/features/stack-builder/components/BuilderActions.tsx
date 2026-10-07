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
      toast.success("Command copied to clipboard");
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
    <div className="rounded-[8px] border border-[#252C36] bg-[#10141B] p-3.5 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-[#737D8C]">
            <Terminal className="h-3.5 w-3.5 text-[#4F75FF]" />
            <span>Generate Stack</span>
          </div>
          <div className="mt-0.5 text-xs text-[#F3F6FA]">
            <span className="font-mono font-medium">{config.projectName || "my-flatron-app"}</span>
            <span className="text-[#737D8C] mx-1.5">·</span>
            <span className="capitalize text-[#A1AAB8]">{config.projectType}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyCommand}
            disabled={!validation.isValid}
            className={`flex items-center justify-center gap-1.5 rounded-[6px] px-3.5 py-1.5 text-xs font-semibold transition-colors duration-150 cursor-pointer ${
              validation.isValid
                ? "bg-[#4F75FF] text-white hover:bg-[#6487FF] shadow-sm active:scale-[0.99]"
                : "bg-[#1A2029] text-[#737D8C] cursor-not-allowed border border-[#252C36]"
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#25B77A]" />
                <span className="text-[#25B77A]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy CLI Command</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownloadManifest}
            disabled={!validation.isValid}
            title="Download .fullstack-app.json manifest"
            className="flex items-center justify-center gap-1.5 rounded-[6px] border border-[#252C36] bg-[#151A22] px-3 py-1.5 text-xs font-medium text-[#A1AAB8] hover:bg-[#1A2029] hover:text-[#F3F6FA] hover:border-[#353E4D] transition-colors duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Manifest</span>
          </button>
        </div>
      </div>
    </div>
  );
};
