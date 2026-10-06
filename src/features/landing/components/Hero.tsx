import React, { useState } from "react";
import { Check, Copy, Layers, Server, Layout } from "lucide-react";
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

export const Hero: React.FC = () => {
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
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center overflow-hidden py-12 sm:py-16 md:py-20">
      {/* Background glow and subtle grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-60" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[50rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-600/20 via-purple-600/10 to-transparent blur-3xl" />

      <div className="relative mx-auto my-auto w-full max-w-[100rem] px-4 text-center sm:px-6 lg:px-10 xl:px-14">
        {/* Release Pill Badge */}
        <a
          href="https://www.npmjs.com/package/flatron"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-medium text-zinc-300 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/[0.08]"
        >
          <span className="rounded-full bg-indigo-500/20 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-indigo-300">
            New
          </span>
          <span>Introducing Flatron CLI</span>
          <span className="text-zinc-500 transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </a>

        {/* Two-Line Strong Heading */}
        <h1 className="mx-auto mt-6 max-w-4xl font-sans text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Build your application
          <span className="block mt-1">stack in seconds</span>
        </h1>

        {/* Supporting description */}
        <p className="mx-auto mt-5 max-w-2xl font-mono text-xs sm:text-sm leading-relaxed text-zinc-400">
          The complete developer ecosystem: scaffold applications with Clean Architecture,
          generate business domain features, and extend with modular capabilities.
        </p>

        {/* Interactive Tabbed CLI Installation Box */}
        <div id="cli-install" className="mx-auto mt-10 max-w-2xl text-left">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0e18]/95 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all hover:border-white/20">
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
              <div className="space-y-2">
                {currentOption.command.split("\n").map((line, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 overflow-x-auto">
                    <span className="text-sm font-semibold text-indigo-400 select-none shrink-0">
                      &gt;_
                    </span>
                    <span className="text-sm font-semibold text-zinc-100 whitespace-nowrap">
                      {line}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description footer */}
            <div className="border-t border-white/[0.06] bg-[#090b12] px-5 py-3 text-xs text-zinc-500">
              <span>{currentOption.description}</span>
            </div>
          </div>
        </div>

        {/* Minimal Stack Pillars */}
        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#0e111a]/60 p-3.5 text-left backdrop-blur-sm">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-zinc-200">Full Stack</div>
              <div className="text-[11px] text-zinc-500">.NET + React / Angular</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#0e111a]/60 p-3.5 text-left backdrop-blur-sm">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
              <Server className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-zinc-200">Backend Only</div>
              <div className="text-[11px] text-zinc-500">Clean Architecture & CQRS</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#0e111a]/60 p-3.5 text-left backdrop-blur-sm">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
              <Layout className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-zinc-200">Frontend Only</div>
              <div className="text-[11px] text-zinc-500">Vite / Next.js + UI kits</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
