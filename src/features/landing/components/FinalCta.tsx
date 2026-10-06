import React, { useState } from "react";
import { Terminal, Copy, Check, ArrowRight } from "lucide-react";
import { toast } from "sonner";

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

export const FinalCta: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const command = "npx flatron my-app";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      toast.success("Command copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy command");
    }
  };

  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#07080d] py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.12),transparent_70%)]" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Start Building with Flatron
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
          Scaffold your clean architecture stack, build domain business features, and extend with modular capabilities. Run the CLI directly or configure visually in your browser.
        </p>

        {/* Quick Command & Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* CLI Snippet */}
          <div className="flex w-full sm:w-auto items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#0c0e18] px-4 py-2.5 font-mono text-xs text-zinc-300 shadow-inner">
            <div className="flex items-center gap-2">
              <Terminal className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-zinc-500">$</span>
              <span className="text-white font-medium">{command}</span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="ml-2 rounded p-1 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
              aria-label="Copy CLI command"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>

          {/* Builder Button */}
          <a
            href="#builder"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-xs font-semibold text-white shadow-[0_0_24px_-6px_rgba(99,102,241,0.5)] transition-all hover:opacity-95 cursor-pointer"
          >
            <span>Configure in Visual Builder</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>

          {/* GitHub Link */}
          <a
            href="https://github.com/AhmedIbrahim-tech/flatron"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <GithubIcon className="h-3.5 w-3.5 text-zinc-400" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
};
