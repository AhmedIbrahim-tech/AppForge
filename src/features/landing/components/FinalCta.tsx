import React, { useState } from "react";
import { ArrowRight, Terminal, Check, Copy } from "lucide-react";
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

export const FinalCta: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const command = "npx generate-fullstack-app my-app";

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
    <section className="relative overflow-hidden py-24 border-t border-zinc-850 bg-[#08090e]">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[600px] rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl font-sans max-w-3xl mx-auto leading-tight">
          Stop rebuilding the foundation.{" "}
          <span className="block mt-1 bg-gradient-to-r from-indigo-400 via-purple-300 to-sky-300 bg-clip-text text-transparent">
            Start building the product.
          </span>
        </h2>

        <p className="mt-5 max-w-2xl mx-auto text-base text-zinc-400 sm:text-lg">
          Generate production-grade Clean Architecture with .NET and modern frontend
          in seconds. 100% open-source under MIT License.
        </p>

        {/* Quick Command Box */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-zinc-800 bg-[#0e1019] p-2 pr-3 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-2 pl-3">
              <Terminal className="h-4 w-4 text-indigo-400" />
              <code className="font-mono text-sm text-zinc-200">{command}</code>
            </div>
            <button
              onClick={handleCopy}
              type="button"
              className="flex items-center gap-1.5 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-mono text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Buttons */}
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
      </div>
    </section>
  );
};
