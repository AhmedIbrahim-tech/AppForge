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
      toast.success("Manifest copied to clipboard");
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
    <div className="p-4 space-y-3.5 bg-surface">
      {/* Top toggle bar */}
      <div className="flex items-center justify-between gap-2 border-b border-border-subtle pb-3">
        <div className="flex items-center gap-1 rounded-lg bg-surface-secondary p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setViewMode("structured")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition-all cursor-pointer ${
              viewMode === "structured"
                ? "bg-surface text-text-primary font-bold shadow-xs border border-border-subtle"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <LayoutGrid className="h-3 w-3" />
            <span>Structured</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("raw")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition-all cursor-pointer ${
              viewMode === "raw"
                ? "bg-surface text-text-primary font-bold shadow-xs border border-border-subtle"
                : "text-text-muted hover:text-text-primary"
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
            className="flex items-center gap-1 rounded-lg border border-border-subtle bg-surface-secondary px-2.5 py-1 text-xs font-mono text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-all cursor-pointer shadow-xs"
            title="Copy manifest JSON"
          >
            {copied ? (
              <Check className="h-3 w-3 text-success" />
            ) : (
              <Copy className="h-3 w-3 text-text-muted" />
            )}
            <span className="hidden sm:inline font-sans">Copy</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadManifest}
            className="flex items-center gap-1 rounded-lg border border-border-subtle bg-surface-secondary px-2.5 py-1 text-xs font-mono text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-all cursor-pointer shadow-xs"
            title="Download .fullstack-app.json"
          >
            <Download className="h-3 w-3 text-text-muted" />
            <span className="hidden sm:inline font-sans">Save</span>
          </button>
        </div>
      </div>

      {viewMode === "structured" ? (
        <div className="space-y-3 font-mono text-xs">
          {/* Project Box */}
          <div className="rounded-xl border border-border-subtle bg-surface-secondary p-3.5 space-y-2">
            <span className="text-[11px] uppercase font-mono text-accent font-bold tracking-wider">
              Project Manifest
            </span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-text-secondary">
              <span className="text-text-muted">Name:</span>
              <span className="font-semibold text-text-primary">
                {config.projectName || "nexus-app"}
              </span>
              <span className="text-text-muted">Mode:</span>
              <span className="capitalize text-text-primary">{config.projectType}</span>
              <span className="text-text-muted">Target:</span>
              <span className="text-text-primary">.NET 10 (net10.0)</span>
            </div>
          </div>

          {/* Backend Box */}
          {isBackend && (
            <div className="rounded-xl border border-border-subtle bg-surface-secondary p-3.5 space-y-2">
              <span className="text-[11px] uppercase font-mono text-accent font-bold tracking-wider">
                Backend Architecture
              </span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-text-secondary">
                <span className="text-text-muted">Presentation:</span>
                <span className="text-text-primary">{config.backend.presentation}</span>
                <span className="text-text-muted">Architecture:</span>
                <span className="text-text-primary">{config.backend.architecture}</span>
                <span className="text-text-muted">Data Access:</span>
                <span className="text-text-primary">{config.backend.orm}</span>
                <span className="text-text-muted">Database:</span>
                <span className="text-text-primary">{config.backend.database}</span>
                <span className="text-text-muted">Authentication:</span>
                <span className="text-text-primary">{config.backend.auth}</span>
                <span className="text-text-muted">Mapping:</span>
                <span className="text-text-primary">{config.backend.mapping}</span>
                <span className="text-text-muted">Logging:</span>
                <span className="text-text-primary">{config.backend.logging || "Serilog"}</span>
                <span className="text-text-muted">SignalR:</span>
                <span className="text-text-primary">{config.backend.signalR ? "Enabled" : "Disabled"}</span>
                <span className="text-text-muted">Hangfire:</span>
                <span className="text-text-primary">{config.backend.hangfire ? "Enabled" : "Disabled"}</span>
              </div>
            </div>
          )}

          {/* Frontend Box */}
          {isFrontend && (
            <div className="rounded-xl border border-border-subtle bg-surface-secondary p-3.5 space-y-2">
              <span className="text-[11px] uppercase font-mono text-accent font-bold tracking-wider">
                Frontend Architecture
              </span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-text-secondary">
                <span className="text-text-muted">Framework:</span>
                <span className="text-text-primary">{config.frontend.framework}</span>
                <span className="text-text-muted">Tooling:</span>
                <span className="text-text-primary">{config.frontend.tooling}</span>
                <span className="text-text-muted">Language:</span>
                <span className="text-text-primary">{config.frontend.language}</span>
                <span className="text-text-muted">Styling:</span>
                <span className="text-text-primary">{config.frontend.styling}</span>
                <span className="text-text-muted">State:</span>
                <span className="text-text-primary">{config.frontend.state}</span>
                <span className="text-text-muted">HTTP Client:</span>
                <span className="text-text-primary">{config.frontend.httpClient}</span>
                <span className="text-text-muted">Forms:</span>
                <span className="text-text-primary">{config.frontend.forms}</span>
                <span className="text-text-muted">UI Library / Design System:</span>
                <span className="text-text-primary">{config.frontend.ui}</span>
                <span className="text-text-muted">i18n:</span>
                <span className="text-text-primary">{config.frontend.includeI18n ? "Enabled" : "Disabled"}</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-[11px] text-text-muted font-mono">
            // Canonical .fullstack-app.json manifest:
          </div>
          <CodeBlock
            code={manifestJson}
            language="json"
            filename=".fullstack-app.json"
            showLineNumbers
            className="border border-border-subtle"
          />
        </div>
      )}
    </div>
  );
};
