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
    <div className="space-y-3 p-3.5">
      <div className="flex items-center justify-between text-xs text-[#A1AAB8]">
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#737D8C]">
          <Terminal className="h-3.5 w-3.5 text-[#4F75FF]" />
          Terminal Execution:
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-[5px] border border-[#252C36] bg-[#0E1218] px-2.5 py-1 text-xs font-mono text-[#A1AAB8] hover:border-[#353E4D] hover:text-[#F3F6FA] transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-[#25B77A]" />
              <span className="text-[#25B77A]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-[#737D8C]" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <CodeBlock
        code={command}
        language="bash"
        filename="terminal"
        className="border border-[#252C36] bg-[#0A0D12]"
      />

      <div className="flex items-start gap-2 rounded-[6px] border border-[#252C36] bg-[#0E1218] p-2.5 text-xs text-[#A1AAB8] font-sans">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#4F75FF]" />
        <p className="text-[11px] text-[#A1AAB8] leading-relaxed">
          Run this command to scaffold the solution non-interactively using Flatron&apos;s verified architectural generator.
        </p>
      </div>
    </div>
  );
};
