import React, { useState } from "react";
import { Check, Copy, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { GeneratedProjectPreview } from "./GeneratedProjectPreview";

type CliTab = "npx" | "npm" | "pnpm";

interface CliOption {
  id: CliTab;
  label: string;
  command: string;
}

const CLI_OPTIONS: CliOption[] = [
  {
    id: "npx",
    label: "npx (instant)",
    command: "npx flatron nexus-app",
  },
  {
    id: "npm",
    label: "npm global",
    command: "npm install -g flatron && flatron nexus-app",
  },
  {
    id: "pnpm",
    label: "pnpm dlx",
    command: "pnpm dlx flatron nexus-app",
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
      toast.success("Command copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy command");
    }
  };

  return (
    <section className="relative border-b border-border-subtle bg-base py-10 sm:py-16 lg:py-20 overflow-hidden">
      {/* Subtle background ambient mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent opacity-60" />

      <div className="app-container">
        {/* Two-Column Grid: Left Positioning & CTA / Right Generated Output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT: Product Positioning, Command & CTAs */}
          <div className="lg:col-span-6 space-y-6 animate-fade-in-up">
            {/* Category tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3 py-1 text-xs font-mono font-medium text-text-secondary shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span>CLI & Visual Scaffolding Toolchain</span>
              <span className="text-border-main">·</span>
              <span className="text-info font-semibold">.NET 10 &amp; SPA</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-[3.25rem] sm:leading-[1.12]">
              Scaffold production-ready <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-accent via-accent-hover to-info bg-clip-text text-transparent">
                .NET applications
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-sm sm:text-base text-text-secondary leading-relaxed font-sans">
              Generate enterprise clean architecture solutions, CQRS features, and ready-made business modules from your terminal or interactive builder.
            </p>

            {/* Interactive Terminal Command Box */}
            <div className="max-w-lg">
              <div className="rounded-xl border border-border-subtle bg-surface shadow-card overflow-hidden">
                {/* Tabs Bar */}
                <div className="flex items-center justify-between border-b border-border-subtle bg-surface-secondary px-3.5 py-2">
                  <div className="flex items-center gap-1">
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
                          className={`rounded-md px-2.5 py-1 font-mono text-xs transition-all cursor-pointer ${
                            isActive
                              ? "bg-surface text-text-primary font-semibold shadow-xs border border-border-subtle"
                              : "text-text-muted hover:text-text-primary hover:bg-surface/50"
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
                    className="flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-xs text-text-secondary hover:bg-surface hover:text-text-primary transition-all cursor-pointer"
                    title="Copy command"
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

                {/* Command View in sleek code surface */}
                <div className="flex items-center gap-3 px-4 py-3.5 font-mono text-xs sm:text-sm bg-[var(--bg-code)] text-[var(--text-code-primary)]">
                  <span className="text-accent font-bold select-none">$</span>
                  <span className="overflow-x-auto whitespace-nowrap font-mono text-slate-200">
                    {currentOption.command}
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#builder"
                className="flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-accent-hover transition-all active:scale-[0.985] font-heading cursor-pointer"
              >
                <span>Configure in Stack Builder</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#extend"
                className="flex items-center gap-2 rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-xs font-medium text-text-secondary hover:bg-surface-secondary hover:text-text-primary transition-all font-heading cursor-pointer shadow-xs"
              >
                <Sparkles className="h-3.5 w-3.5 text-info" />
                <span>Explore Workflow</span>
              </a>
            </div>

            {/* SWA-Inspired Stat Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-border-subtle">
              <div className="rounded-xl border border-border-subtle bg-surface p-3 shadow-xs">
                <div className="text-lg font-bold font-heading text-text-primary">.NET 10</div>
                <div className="text-[11px] text-text-muted font-sans mt-0.5">Clean Architecture</div>
              </div>
              <div className="rounded-xl border border-border-subtle bg-surface p-3 shadow-xs">
                <div className="text-lg font-bold font-heading text-text-primary">8 Modules</div>
                <div className="text-[11px] text-text-muted font-sans mt-0.5">Pre-wired features</div>
              </div>
              <div className="rounded-xl border border-border-subtle bg-surface p-3 shadow-xs">
                <div className="text-lg font-bold font-heading text-text-primary">React &amp; Angular</div>
                <div className="text-[11px] text-text-muted font-sans mt-0.5">Type-safe clients</div>
              </div>
              <div className="rounded-xl border border-border-subtle bg-surface p-3 shadow-xs">
                <div className="text-lg font-bold font-heading text-text-primary">Zero Lock-in</div>
                <div className="text-[11px] text-text-muted font-sans mt-0.5">Native C# &amp; TS code</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Live Generated Project Preview */}
          <div className="lg:col-span-6 w-full">
            <GeneratedProjectPreview />
          </div>
        </div>
      </div>
    </section>
  );
};
