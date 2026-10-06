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
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy CLI command");
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span className="flex items-center gap-1.5 font-mono text-[11px]">
          <Terminal className="h-3.5 w-3.5 text-indigo-400" />
          Terminal Execution:
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white cursor-pointer active:scale-95"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-zinc-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <CodeBlock
        code={command}
        language="bash"
        filename="terminal"
        className="border-none bg-[#090b14] shadow-none"
      />

      <div className="flex items-start gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs leading-relaxed text-zinc-400 font-sans">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-400" />
        <p>
          Run this command with <code className="text-zinc-200">npx</code> to scaffold the solution non-interactively using Flatron&apos;s verified architectural generator.
        </p>
      </div>
    </div>
  );
};
