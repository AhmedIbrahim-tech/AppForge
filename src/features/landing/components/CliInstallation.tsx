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
    command: "npx flatron MyApp",
    description: "Run directly with npx without installing globally.",
  },
  {
    id: "npm",
    label: "npm global",
    command: "npm install -g flatron\nflatron MyApp",
    description: "Install globally to have the flatron command available everywhere.",
  },
  {
    id: "pnpm",
    label: "pnpm dlx",
    command: "pnpm dlx flatron MyApp",
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
    <section id="cli-install" className="relative py-16 sm:py-20 border-t border-white/[0.06] bg-[#08090e]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Quick Installation
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Initialize your project directly from the terminal or install Flatron globally.
          </p>
        </div>

        {/* Tabbed CLI Command Box */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0c0e17] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]">
          {/* Tabs bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/8 bg-[#101320] px-4 py-2.5">
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
                    className={`rounded-lg px-3 py-1.5 font-mono text-xs font-medium transition-all duration-150 cursor-pointer ${
                      isActive
                        ? "bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-400/40"
                        : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
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
              className="flex shrink-0 items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 font-mono text-xs font-medium text-zinc-300 transition-all hover:bg-white/10 hover:text-white cursor-pointer active:scale-95"
              title="Copy CLI command"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Terminal Command View */}
          <div className="p-5 font-mono">
            <div className="flex items-start gap-3">
              <Terminal className="mt-1 h-4 w-4 shrink-0 text-indigo-400" />
              <div className="flex-1 overflow-x-auto">
                <pre className="text-sm font-medium leading-relaxed text-zinc-100 whitespace-pre">
                  {currentOption.command}
                </pre>
              </div>
            </div>
          </div>

          {/* Description footer with quick links */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] bg-[#090b12] px-5 py-3 text-xs text-zinc-500">
            <span>{currentOption.description}</span>
            <div className="flex items-center gap-3 font-medium">
              <a
                href="https://www.npmjs.com/package/flatron"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <span>npm</span>
                <span className="text-zinc-600">↗</span>
              </a>
              <span className="text-zinc-700">•</span>
              <a
                href="https://github.com/AhmedIbrahim-tech/flatron"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <span>GitHub</span>
                <span className="text-zinc-600">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
