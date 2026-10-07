import React, { useState } from "react";
import { Check, Copy, ArrowRight } from "lucide-react";
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
    <section className="relative border-b border-border-line bg-base py-12 sm:py-20 lg:py-24">
      <div className="app-container">
        {/* Two-Column Grid: Left Input & CTA / Right Generated Output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT: Product Positioning, Command & CTAs */}
          <div className="lg:col-span-6 space-y-6 animate-fade-in-up">
            {/* Classification Tag */}
            <div className="inline-flex items-center gap-2 font-mono text-xs font-medium text-text-secondary">
              <span className="flex h-2 w-2 rounded-full bg-accent" />
              <span>CLI-first scaffolding toolchain</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] sm:leading-[1.12]">
              Scaffold production-ready <br className="hidden sm:inline" />
              .NET applications
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-base text-text-secondary sm:text-lg leading-relaxed font-sans">
              Generate clean architecture solutions, business features, and application modules from your terminal or visual builder.
            </p>

            {/* Interactive Terminal Command Box */}
            <div className="max-w-lg">
              <div className="rounded-lg border border-border bg-surface shadow-md overflow-hidden">
                {/* Tabs Bar */}
                <div className="flex items-center justify-between border-b border-border bg-surface-secondary px-3 py-2">
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
                          className={`rounded-[5px] px-2.5 py-1 font-mono text-xs transition-colors cursor-pointer ${
                            isActive
                              ? "bg-surface-raised text-white font-medium border border-border"
                              : "text-text-muted hover:text-text-secondary"
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
                    className="flex items-center gap-1.5 rounded-[5px] px-2 py-1 font-mono text-xs text-text-secondary hover:bg-surface-raised hover:text-white transition-colors cursor-pointer"
                    title="Copy command"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-success" />
                        <span className="text-success font-medium font-body">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-text-muted" />
                        <span className="font-body">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Command View */}
                <div className="flex items-center gap-3 px-4 py-3 font-mono text-xs sm:text-sm bg-[#0B0E11]/80">
                  <span className="text-accent font-semibold select-none">$</span>
                  <span className="text-text-primary overflow-x-auto whitespace-nowrap font-mono">
                    {currentOption.command}
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#builder"
                className="flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-accent-hover transition-all active:scale-[0.985] font-heading cursor-pointer"
              >
                <span>Configure in Stack Builder</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="#extend"
                className="flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-xs font-medium text-text-secondary hover:bg-surface-secondary hover:text-white transition-colors font-heading cursor-pointer"
              >
                <span>Explore Workflow</span>
              </a>
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
