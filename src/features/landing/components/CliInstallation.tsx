import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { toast } from "sonner";

type CliTab = "npx" | "npm" | "pnpm" | "help";

interface CliOption {
  id: CliTab;
  label: string;
  command: string;
  description: string;
}

const CLI_OPTIONS: CliOption[] = [
  {
    id: "npx",
    label: "npx",
    command: "npx flatron nexus-app",
    description: "Run directly with npx without installing globally.",
  },
  {
    id: "npm",
    label: "npm global",
    command: "npm install -g flatron\nflatron nexus-app",
    description: "Install globally to have the flatron command available everywhere.",
  },
  {
    id: "pnpm",
    label: "pnpm dlx",
    command: "pnpm dlx flatron nexus-app",
    description: "Run via pnpm dlx with instant execution.",
  },
  {
    id: "help",
    label: "--help",
    command: "npx flatron --help",
    description: "View all supported CLI flags and configuration options.",
  },
];


export const CliInstallation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CliTab>("npx");
  const [copied, setCopied] = useState(false);

  const currentOption =
    CLI_OPTIONS.find((opt) => opt.id === activeTab) || CLI_OPTIONS[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentOption.command);
      setCopied(true);
      toast.success("Command copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy command");
    }
  };

  return (
    <section id="cli-install" className="relative py-16 sm:py-20 border-t border-border bg-base">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Quick Installation
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Initialize your project directly from the terminal or install Flatron globally.
          </p>
        </div>

        {/* Tabbed CLI Command Box */}
        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-[#0B0E11] shadow-lg">
          {/* Tabs bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-surface px-4 py-2.5">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {CLI_OPTIONS.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                      setCopied(false);
                    }}
                    className={`rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? "bg-accent/10 text-accent border border-accent/40 font-semibold"
                        : "text-text-muted hover:bg-surface-raised hover:text-text-primary border border-transparent"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleCopy}
              type="button"
              className="flex shrink-0 items-center gap-1.5 rounded-md bg-surface-raised border border-border px-3 py-1.5 font-mono text-xs font-medium text-text-secondary transition-all hover:bg-surface-secondary hover:text-text-primary cursor-pointer active:scale-[0.98]"
              title="Copy CLI command"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-success" />
                  <span className="text-success font-body">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-text-muted" />
                  <span className="font-body">Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Terminal Command View */}
          <div className="p-5 font-mono">
            <div className="flex items-start gap-3">
              <Terminal className="mt-1 h-4 w-4 shrink-0 text-accent" />
              <div className="flex-1 overflow-x-auto">
                <pre className="text-sm font-medium leading-relaxed text-text-primary whitespace-pre font-mono">
                  {currentOption.command}
                </pre>
              </div>
            </div>
          </div>

          {/* Description footer with quick links */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-line bg-surface/50 px-5 py-3 text-xs text-text-muted">
            <span>{currentOption.description}</span>
            <div className="flex items-center gap-3 font-medium">
              <a
                href="https://www.npmjs.com/package/flatron"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
              >
                <span>npm</span>
                <span className="text-text-muted">↗</span>
              </a>
              <span className="text-border-hover">•</span>
              <a
                href="https://github.com/AhmedIbrahim-tech/flatron"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
              >
                <span>GitHub</span>
                <span className="text-text-muted">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

