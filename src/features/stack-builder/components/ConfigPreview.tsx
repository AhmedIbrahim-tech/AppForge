import React, { useState } from "react";
import { Download, FileJson, LayoutGrid, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { CodeBlock } from "@/shared/components/ui/CodeBlock";
import { buildManifestJson } from "../capabilities";
import type { StackConfiguration } from "../types";

export interface ConfigPreviewProps {
  config: StackConfiguration;
}

export const ConfigPreview: React.FC<ConfigPreviewProps> = ({ config }) => {
  const [viewMode, setViewMode] = useState<"structured" | "raw">("structured");
  const [copied, setCopied] = useState(false);

  const manifestJson = buildManifestJson(config);

  const handleCopyManifest = async () => {
    try {
      await navigator.clipboard.writeText(manifestJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy manifest");
    }
  };

  const handleDownloadManifest = () => {
    try {
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

  const isBackend = config.projectType !== "frontend";
  const isFrontend = config.projectType !== "backend";

  return (
    <div className="p-4 space-y-4">
      {/* Top toggle bar */}
      <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-3">
        <div className="flex items-center gap-1 rounded-lg bg-white/5 p-1 text-xs">
          <button
            type="button"
            onClick={() => setViewMode("structured")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition-colors cursor-pointer ${
              viewMode === "structured"
                ? "bg-indigo-500/20 text-indigo-300 shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <LayoutGrid className="h-3 w-3" />
            <span>Structured</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("raw")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition-colors cursor-pointer ${
              viewMode === "raw"
                ? "bg-indigo-500/20 text-indigo-300 shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <FileJson className="h-3 w-3" />
            <span>Raw Manifest</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCopyManifest}
            className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-zinc-300 hover:border-white/20 hover:text-white transition-colors cursor-pointer"
            title="Copy manifest JSON"
          >
            {copied ? (
              <Check className="h-3 w-3 text-emerald-400" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            <span className="hidden sm:inline">Copy</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadManifest}
            className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-zinc-300 hover:border-white/20 hover:text-white transition-colors cursor-pointer"
            title="Download .fullstack-app.json"
          >
            <Download className="h-3 w-3" />
            <span className="hidden sm:inline">Save</span>
          </button>
        </div>
      </div>

      {viewMode === "structured" ? (
        <div className="space-y-4 font-mono text-xs">
          {/* Project Box */}
          <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3.5 space-y-2">
            <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
              Project
            </span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-zinc-300">
              <span className="text-zinc-500">Name:</span>
              <span className="font-semibold text-white">
                {config.projectName || "my-flatron-app"}
              </span>
              <span className="text-zinc-500">Mode:</span>
              <span className="capitalize">{config.projectType}</span>
              <span className="text-zinc-500">Target:</span>
              <span className="text-cyan-300">.NET 10 (net10.0)</span>
            </div>
          </div>

          {/* Backend Box */}
          {isBackend && (
            <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3.5 space-y-2">
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                Backend Configuration
              </span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-zinc-300">
                <span className="text-zinc-500">Presentation:</span>
                <span>{config.backend.presentation}</span>
                <span className="text-zinc-500">Architecture:</span>
                <span>{config.backend.architecture}</span>
                <span className="text-zinc-500">Data Access:</span>
                <span>{config.backend.orm}</span>
                <span className="text-zinc-500">Database:</span>
                <span>{config.backend.database}</span>
                <span className="text-zinc-500">Authentication:</span>
                <span>{config.backend.auth}</span>
                <span className="text-zinc-500">Mapping:</span>
                <span>{config.backend.mapping}</span>
                <span className="text-zinc-500">Logging:</span>
                <span>{config.backend.logging || "Serilog"}</span>
                <span className="text-zinc-500">SignalR:</span>
                <span>{config.backend.signalR ? "Enabled" : "Disabled"}</span>
                <span className="text-zinc-500">Hangfire:</span>
                <span>{config.backend.hangfire ? "Enabled" : "Disabled"}</span>
              </div>
            </div>
          )}

          {/* Frontend Box */}
          {isFrontend && (
            <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3.5 space-y-2">
              <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">
                Frontend Configuration
              </span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-zinc-300">
                <span className="text-zinc-500">Framework:</span>
                <span>{config.frontend.framework}</span>
                <span className="text-zinc-500">Tooling:</span>
                <span>{config.frontend.tooling}</span>
                <span className="text-zinc-500">Language:</span>
                <span>{config.frontend.language}</span>
                <span className="text-zinc-500">Styling:</span>
                <span>{config.frontend.styling}</span>
                <span className="text-zinc-500">State:</span>
                <span>{config.frontend.state}</span>
                <span className="text-zinc-500">HTTP Client:</span>
                <span>{config.frontend.httpClient}</span>
                <span className="text-zinc-500">Forms:</span>
                <span>{config.frontend.forms}</span>
                <span className="text-zinc-500">UI System:</span>
                <span>{config.frontend.ui}</span>
                <span className="text-zinc-500">i18n:</span>
                <span>{config.frontend.includeI18n ? "Enabled" : "Disabled"}</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-[11px] text-zinc-500 font-mono">
            // Canonical .fullstack-app.json manifest generated for Flatron CLI:
          </div>
          <CodeBlock
            code={manifestJson}
            language="json"
            filename=".fullstack-app.json"
            showLineNumbers
            className="border-none bg-[#090b14] shadow-none"
          />
        </div>
      )}
    </div>
  );
};
