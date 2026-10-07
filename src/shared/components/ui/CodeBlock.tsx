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
        <span key={key++} className="text-accent font-medium">
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
        <span key={key++} className="text-emerald-400">
          {match[1]}
        </span>,
      );
    } else if (match[3]) {
      nodes.push(
        <span key={key++} className="text-amber-400">
          {match[3]}
        </span>,
      );
    } else if (match[4]) {
      nodes.push(
        <span key={key++} className="text-accent">
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
        <span key={key++} className="text-text-primary">
          {line.slice(lastIndex, match.index)}
        </span>,
      );
    }
    if (match[1]) {
      nodes.push(
        <span key={key++} className="text-accent font-semibold">
          {match[1]}
        </span>,
      );
    } else if (match[2]) {
      nodes.push(
        <span key={key++} className="text-zinc-300">
          {match[2]}
        </span>,
      );
    } else if (match[3]) {
      nodes.push(
        <span key={key++} className="text-emerald-400">
          {match[3]}
        </span>,
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < line.length) {
    nodes.push(
      <span key={key} className="text-text-primary">
        {line.slice(lastIndex)}
      </span>,
    );
  }

  return nodes.length ? nodes : <span className="text-text-primary">{line}</span>;
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
      className={`relative overflow-hidden rounded-[8px] border border-border-subtle bg-base ${className}`}
    >
      <div className="flex items-center justify-between border-b border-border-subtle bg-surface px-3.5 py-2">
        <div className="flex items-center gap-2">
          {filename ? (
            <span className="font-mono text-xs text-text-secondary">
              {filename}
            </span>
          ) : (
            <span className="flex items-center gap-1.5 font-mono text-xs text-text-muted">
              <Terminal className="h-3.5 w-3.5 text-accent" />
              {language}
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          type="button"
          className="flex cursor-pointer items-center gap-1.5 rounded-[5px] px-2 py-1 font-mono text-xs text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-success" />
              <span className="text-success font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-text-muted" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="overflow-x-auto p-3.5 font-mono text-xs leading-relaxed text-text-primary">
        <pre className="flex flex-col gap-0.5 font-mono">
          {lines.map((line, idx) => (
            <div key={idx} className="flex min-h-[1.25rem]">
              {showLineNumbers && (
                <span className="mr-3 inline-block w-5 select-none text-right font-mono text-xs text-text-muted">
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

