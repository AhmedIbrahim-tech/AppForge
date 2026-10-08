import React, { useState } from "react";
import { Copy, Check, Terminal, Info } from "lucide-react";
import { toast } from "sonner";
import { CodeBlock } from "@/shared/components/ui/CodeBlock";
import { buildCliCommand } from "../capabilities";
import type { StackConfiguration } from "../types";

export interface CliPreviewProps {
  config: StackConfiguration;
}

export const CliPreview: React.FC<CliPreviewProps> = ({ config }) => {
  const [copied, setCopied] = useState(false);
  const command = buildCliCommand(config);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      toast.success("CLI command copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy CLI command");
    }
  };

  return (
    <div className="space-y-3.5 p-4 bg-surface">
      <div className="flex items-center justify-between text-xs text-text-secondary">
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-text-muted">
          <Terminal className="h-3.5 w-3.5 text-accent" />
          Terminal Execution:
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg border border-border-subtle bg-surface-secondary px-2.5 py-1 text-xs font-mono text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-all cursor-pointer shadow-xs"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-success" />
              <span className="text-success font-medium font-sans">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-text-muted" />
              <span className="font-sans">Copy</span>
            </>
          )}
        </button>
      </div>

      <CodeBlock
        code={command}
        language="bash"
        filename="terminal"
        className="border border-border-subtle"
      />

      <div className="flex items-start gap-2.5 rounded-xl border border-border-subtle bg-surface-secondary p-3 text-xs text-text-secondary font-sans">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-info" />
        <p className="text-xs text-text-secondary leading-relaxed">
          Run this command in your terminal to scaffold the solution non-interactively using Flatron&apos;s verified architectural generator.
        </p>
      </div>
    </div>
  );
};
