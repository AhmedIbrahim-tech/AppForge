import React, { useState } from "react";
import {
  Check,
  Copy,
  ArrowRight,
  Layers,
  Server,
  Layout,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/Button";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const cliCommand = "npx generate-fullstack-app my-app";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cliCommand);
      setCopied(true);
      toast.success("Command copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy command");
    }
  };

  return (
    <section className="relative overflow-hidden pt-14 pb-20 md:pt-24 md:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-70" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[46rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-600/20 via-purple-600/12 to-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-full -translate-x-1/2 bg-gradient-to-t from-[#090a0f] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-3.5 py-1.5 text-xs font-medium text-indigo-300 shadow-[0_0_24px_-8px_rgba(99,102,241,0.8)] backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>Configurable Clean Architecture Generator</span>
          <span className="h-1 w-1 rounded-full bg-indigo-400" />
          <span className="font-mono font-semibold text-indigo-400">v1.0</span>
        </div>

        <h1 className="mx-auto mt-7 max-w-5xl font-sans text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
          Build production-ready apps.{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-sky-300 bg-clip-text text-transparent">
            Your stack. Your architecture.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg font-normal leading-relaxed text-zinc-300 sm:mt-7 sm:text-xl">
          AppForge empowers developers to generate robust, enterprise-grade{" "}
          <strong className="text-white font-medium">Full Stack</strong>,{" "}
          <strong className="text-white font-medium">Backend-only</strong>, or{" "}
          <strong className="text-white font-medium">Frontend-only</strong>{" "}
          applications with clean layered architecture — without repeatedly rebuilding
          the foundation from scratch.
        </p>

        {/* CLI Command Bar */}
        <div className="mt-9 flex justify-center">
          <div className="relative flex w-full max-w-xl items-center justify-between rounded-2xl border border-white/10 bg-[#0d0f17]/95 p-2 shadow-[0_0_40px_-12px_rgba(99,102,241,0.45)] backdrop-blur-xl transition-all hover:border-white/16">
            <div className="flex items-center gap-3 pl-3 overflow-x-auto">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-indigo-950 text-indigo-400 border border-indigo-800/60 font-mono text-xs font-semibold">
                $
              </span>
              <code className="font-mono text-sm sm:text-base font-medium text-zinc-100 whitespace-nowrap">
                {cliCommand}
              </code>
            </div>

            <button
              onClick={handleCopy}
              type="button"
              className="ml-2 flex shrink-0 items-center gap-2 rounded-xl bg-zinc-800/90 px-4 py-2 text-xs font-mono font-medium text-zinc-200 transition-all hover:bg-zinc-700 hover:text-white cursor-pointer active:scale-95"
              title="Copy CLI command"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-zinc-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Primary and Secondary CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="/#builder">
            <Button
              size="lg"
              variant="gradient"
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
            >
              Start Building
            </Button>
          </a>

          <a
            href="https://github.com/AhmedIbrahim-tech/generate-fullstack-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              variant="outline"
              icon={<GithubIcon className="h-4 w-4" />}
            >
              View on GitHub
            </Button>
          </a>
        </div>

        {/* Three Modes Visual Micro-Pillars */}
        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3.5 rounded-2xl border border-white/8 bg-[#0f111a]/80 p-4 text-left backdrop-blur-sm transition-all duration-200 hover:border-indigo-400/30 hover:bg-[#121526]/90">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Full Stack Apps</h2>
              <p className="mt-0.5 text-xs text-zinc-400">
                ASP.NET Core backend + React/Vite frontend wired together.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl border border-white/8 bg-[#0f111a]/80 p-4 text-left backdrop-blur-sm transition-all duration-200 hover:border-cyan-400/30 hover:bg-[#121526]/90">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Backend-Only</h2>
              <p className="mt-0.5 text-xs text-zinc-400">
                Clean Architecture with CQRS, MediatR, and EF Core/Dapper.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl border border-white/8 bg-[#0f111a]/80 p-4 text-left backdrop-blur-sm transition-all duration-200 hover:border-purple-400/30 hover:bg-[#121526]/90">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400">
              <Layout className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Frontend-Only</h2>
              <p className="mt-0.5 text-xs text-zinc-400">
                Modular React/Angular with Tailwind, Zustand/Redux & UI library.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
