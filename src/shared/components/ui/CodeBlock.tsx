import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { toast } from "sonner";

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "bash",
  filename,
  showLineNumbers = false,
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy code");
    }
  };

  const lines = code.trim().split("\n");

  return (
    <div
      className={`group relative rounded-xl border border-zinc-800/90 bg-[#0c0d14] overflow-hidden shadow-2xl transition-all ${className}`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-[#12141d]/80 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
          </div>
          {filename ? (
            <span className="ml-2 font-mono text-xs text-zinc-400 font-medium">
              {filename}
            </span>
          ) : (
            <span className="ml-2 flex items-center gap-1.5 font-mono text-xs text-zinc-400">
              <Terminal className="h-3.5 w-3.5 text-zinc-500" />
              {language}
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          type="button"
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-mono text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200 cursor-pointer"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-zinc-400 group-hover:text-zinc-200" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <div className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-zinc-200">
        <pre className="flex flex-col gap-0.5">
          {lines.map((line, idx) => (
            <div key={idx} className="flex">
              {showLineNumbers && (
                <span className="mr-4 inline-block w-6 select-none text-right text-xs text-zinc-600 font-mono">
                  {idx + 1}
                </span>
              )}
              <span className="flex-1 whitespace-pre">{line}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};
