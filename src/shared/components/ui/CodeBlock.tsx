import React, { useState, type ReactNode } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { toast } from "sonner";

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

function highlightJsonLine(line: string): ReactNode {
  const nodes: ReactNode[] = [];
  const re =
    /("(?:\\.|[^"\\])*")(\s*:)?|(-?\d+\.?\d*)|\b(true|false|null)\b/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = re.exec(line)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(
        <span key={key++} className="text-zinc-500">
          {line.slice(lastIndex, match.index)}
        </span>,
      );
    }
    if (match[1] && match[2]) {
      nodes.push(
        <span key={key++} className="text-indigo-300">
          {match[1]}
        </span>,
      );
      nodes.push(
        <span key={key++} className="text-zinc-500">
          {match[2]}
        </span>,
      );
    } else if (match[1]) {
      nodes.push(
        <span key={key++} className="text-sky-300">
          {match[1]}
        </span>,
      );
    } else if (match[3]) {
      nodes.push(
        <span key={key++} className="text-amber-300">
          {match[3]}
        </span>,
      );
    } else if (match[4]) {
      nodes.push(
        <span key={key++} className="text-purple-300">
          {match[4]}
        </span>,
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < line.length) {
    nodes.push(
      <span key={key} className="text-zinc-500">
        {line.slice(lastIndex)}
      </span>,
    );
  }

  return nodes.length ? nodes : <span className="text-zinc-500">{line}</span>;
}

function highlightBashLine(line: string): ReactNode {
  const nodes: ReactNode[] = [];
  const re = /(npx|npm|pnpm|bun|flatron|dlx)|(--[a-zA-Z0-9-]+)|("[^"]*"|'[^']*')/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = re.exec(line)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(
        <span key={key++} className="text-zinc-200">
          {line.slice(lastIndex, match.index)}
        </span>,
      );
    }
    if (match[1]) {
      nodes.push(
        <span key={key++} className="text-indigo-300">
          {match[1]}
        </span>,
      );
    } else if (match[2]) {
      nodes.push(
        <span key={key++} className="text-sky-300">
          {match[2]}
        </span>,
      );
    } else if (match[3]) {
      nodes.push(
        <span key={key++} className="text-emerald-300">
          {match[3]}
        </span>,
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < line.length) {
    nodes.push(
      <span key={key} className="text-zinc-200">
        {line.slice(lastIndex)}
      </span>,
    );
  }

  return nodes.length ? nodes : <span className="text-zinc-200">{line}</span>;
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
      className={`group relative overflow-hidden rounded-xl border border-white/8 bg-[#0a0c14] shadow-[0_16px_40px_-24px_rgba(0,0,0,0.9)] transition-all ${className}`}
    >
      <div className="flex items-center justify-between border-b border-white/8 bg-[#12151f]/90 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
          </div>
          {filename ? (
            <span className="ml-2 font-mono text-xs font-medium text-zinc-400">
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
          className="flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-xs text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-200"
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

      <div className="overflow-x-auto p-4 font-mono text-sm leading-6 text-zinc-200">
        <pre className="flex flex-col gap-0.5">
          {lines.map((line, idx) => (
            <div key={idx} className="flex min-h-[1.5rem]">
              {showLineNumbers && (
                <span className="mr-4 inline-block w-6 select-none text-right font-mono text-xs text-zinc-600">
                  {idx + 1}
                </span>
              )}
              <span className="flex-1 whitespace-pre">
                {language === "json"
                  ? highlightJsonLine(line)
                  : language === "bash"
                    ? highlightBashLine(line)
                    : line}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};
