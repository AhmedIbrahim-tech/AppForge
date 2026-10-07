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
      toast.success(".fullstack-app.json downloaded");
    } catch {
      toast.error("Failed to download manifest");
    }
  };

  const isBackend = config.projectType !== "frontend";
  const isFrontend = config.projectType !== "backend";

  return (
    <div className="p-3.5 space-y-3">
      {/* Top toggle bar */}
      <div className="flex items-center justify-between gap-2 border-b border-[#252C36] pb-2.5">
        <div className="flex items-center gap-1 rounded-[5px] bg-[#0E1218] p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setViewMode("structured")}
            className={`flex items-center gap-1.5 rounded-[4px] px-2.5 py-1 font-medium transition-colors cursor-pointer ${
              viewMode === "structured"
                ? "bg-[#1A2029] text-[#F3F6FA] border border-[#252C36]"
                : "text-[#737D8C] hover:text-[#A1AAB8]"
            }`}
          >
            <LayoutGrid className="h-3 w-3" />
            <span>Structured</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("raw")}
            className={`flex items-center gap-1.5 rounded-[4px] px-2.5 py-1 font-medium transition-colors cursor-pointer ${
              viewMode === "raw"
                ? "bg-[#1A2029] text-[#F3F6FA] border border-[#252C36]"
                : "text-[#737D8C] hover:text-[#A1AAB8]"
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
            className="flex items-center gap-1 rounded-[5px] border border-[#252C36] bg-[#0E1218] px-2.5 py-1 text-xs font-mono text-[#A1AAB8] hover:border-[#353E4D] hover:text-[#F3F6FA] transition-colors cursor-pointer"
            title="Copy manifest JSON"
          >
            {copied ? (
              <Check className="h-3 w-3 text-[#25B77A]" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            <span className="hidden sm:inline">Copy</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadManifest}
            className="flex items-center gap-1 rounded-[5px] border border-[#252C36] bg-[#0E1218] px-2.5 py-1 text-xs font-mono text-[#A1AAB8] hover:border-[#353E4D] hover:text-[#F3F6FA] transition-colors cursor-pointer"
            title="Download .fullstack-app.json"
          >
            <Download className="h-3 w-3" />
            <span className="hidden sm:inline">Save</span>
          </button>
        </div>
      </div>

      {viewMode === "structured" ? (
        <div className="space-y-3 font-mono text-xs">
          {/* Project Box */}
          <div className="rounded-[6px] border border-[#252C36] bg-[#0E1218] p-3 space-y-1.5">
            <span className="text-[10px] uppercase font-mono text-[#4F75FF] font-medium tracking-wider">
              Project
            </span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[#A1AAB8]">
              <span className="text-[#737D8C]">Name:</span>
              <span className="font-medium text-[#F3F6FA]">
                {config.projectName || "my-flatron-app"}
              </span>
              <span className="text-[#737D8C]">Mode:</span>
              <span className="capitalize">{config.projectType}</span>
              <span className="text-[#737D8C]">Target:</span>
              <span className="text-[#F3F6FA]">.NET 10 (net10.0)</span>
            </div>
          </div>

          {/* Backend Box */}
          {isBackend && (
            <div className="rounded-[6px] border border-[#252C36] bg-[#0E1218] p-3 space-y-1.5">
              <span className="text-[10px] uppercase font-mono text-[#4F75FF] font-medium tracking-wider">
                Backend Configuration
              </span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[#A1AAB8]">
                <span className="text-[#737D8C]">Presentation:</span>
                <span>{config.backend.presentation}</span>
                <span className="text-[#737D8C]">Architecture:</span>
                <span>{config.backend.architecture}</span>
                <span className="text-[#737D8C]">Data Access:</span>
                <span>{config.backend.orm}</span>
                <span className="text-[#737D8C]">Database:</span>
                <span>{config.backend.database}</span>
                <span className="text-[#737D8C]">Authentication:</span>
                <span>{config.backend.auth}</span>
                <span className="text-[#737D8C]">Mapping:</span>
                <span>{config.backend.mapping}</span>
                <span className="text-[#737D8C]">Logging:</span>
                <span>{config.backend.logging || "Serilog"}</span>
                <span className="text-[#737D8C]">SignalR:</span>
                <span>{config.backend.signalR ? "Enabled" : "Disabled"}</span>
                <span className="text-[#737D8C]">Hangfire:</span>
                <span>{config.backend.hangfire ? "Enabled" : "Disabled"}</span>
              </div>
            </div>
          )}

          {/* Frontend Box */}
          {isFrontend && (
            <div className="rounded-[6px] border border-[#252C36] bg-[#0E1218] p-3 space-y-1.5">
              <span className="text-[10px] uppercase font-mono text-[#4F75FF] font-medium tracking-wider">
                Frontend Configuration
              </span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[#A1AAB8]">
                <span className="text-[#737D8C]">Framework:</span>
                <span>{config.frontend.framework}</span>
                <span className="text-[#737D8C]">Tooling:</span>
                <span>{config.frontend.tooling}</span>
                <span className="text-[#737D8C]">Language:</span>
                <span>{config.frontend.language}</span>
                <span className="text-[#737D8C]">Styling:</span>
                <span>{config.frontend.styling}</span>
                <span className="text-[#737D8C]">State:</span>
                <span>{config.frontend.state}</span>
                <span className="text-[#737D8C]">HTTP Client:</span>
                <span>{config.frontend.httpClient}</span>
                <span className="text-[#737D8C]">Forms:</span>
                <span>{config.frontend.forms}</span>
                <span className="text-[#737D8C]">UI Library / Design System:</span>
                <span>{config.frontend.ui}</span>
                <span className="text-[#737D8C]">i18n:</span>
                <span>{config.frontend.includeI18n ? "Enabled" : "Disabled"}</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-[11px] text-[#737D8C] font-mono">
            // Canonical .fullstack-app.json manifest:
          </div>
          <CodeBlock
            code={manifestJson}
            language="json"
            filename=".fullstack-app.json"
            showLineNumbers
            className="border-none bg-[#0A0D12]"
          />
        </div>
      )}
    </div>
  );
};
