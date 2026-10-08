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
        <span key={key++} className="text-slate-400">
          {line.slice(lastIndex, match.index)}
        </span>,
      );
    }
    if (match[1] && match[2]) {
      nodes.push(
        <span key={key++} className="text-[#38BDF8] font-medium">
          {match[1]}
        </span>,
      );
      nodes.push(
        <span key={key++} className="text-slate-500">
          {match[2]}
        </span>,
      );
    } else if (match[1]) {
      nodes.push(
        <span key={key++} className="text-[#34D399]">
          {match[1]}
        </span>,
      );
    } else if (match[3]) {
      nodes.push(
        <span key={key++} className="text-[#FBBF24]">
          {match[3]}
        </span>,
      );
    } else if (match[4]) {
      nodes.push(
        <span key={key++} className="text-[#F07A4B] font-semibold">
          {match[4]}
        </span>,
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < line.length) {
    nodes.push(
      <span key={key} className="text-slate-400">
        {line.slice(lastIndex)}
      </span>,
    );
  }

  return nodes.length ? nodes : <span className="text-slate-400">{line}</span>;
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
        <span key={key++} className="text-slate-200">
          {line.slice(lastIndex, match.index)}
        </span>,
      );
    }
    if (match[1]) {
      nodes.push(
        <span key={key++} className="text-[#F07A4B] font-semibold">
          {match[1]}
        </span>,
      );
    } else if (match[2]) {
      nodes.push(
        <span key={key++} className="text-[#38BDF8]">
          {match[2]}
        </span>,
      );
    } else if (match[3]) {
      nodes.push(
        <span key={key++} className="text-[#34D399]">
          {match[3]}
        </span>,
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < line.length) {
    nodes.push(
      <span key={key} className="text-slate-200">
        {line.slice(lastIndex)}
      </span>,
    );
  }

  return nodes.length ? nodes : <span className="text-slate-200">{line}</span>;
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
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy code");
    }
  };

  const lines = code.trim().split("\n");

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-[var(--bg-code-border)] bg-[var(--bg-code)] shadow-md ${className}`}
    >
      <div className="flex items-center justify-between border-b border-[var(--bg-code-border)] bg-[var(--bg-code-header)] px-4 py-2.5">
        <div className="flex items-center gap-2">
          {filename ? (
            <span className="font-mono text-xs text-slate-300 font-medium">
              {filename}
            </span>
          ) : (
            <span className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
              <Terminal className="h-3.5 w-3.5 text-accent" />
              {language}
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          type="button"
          className="flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-xs text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-success" />
              <span className="text-success font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-slate-200">
        <pre className="flex flex-col gap-0.5 font-mono">
          {lines.map((line, idx) => (
            <div key={idx} className="flex min-h-[1.25rem]">
              {showLineNumbers && (
                <span className="mr-3 inline-block w-5 select-none text-right font-mono text-xs text-slate-600">
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
