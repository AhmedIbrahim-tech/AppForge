import React, { useState } from "react";
import { Terminal, Check, Copy, Download, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/shared/components/ui/Badge";
import { CodeBlock } from "@/shared/components/ui/CodeBlock";

export const CliInstallation: React.FC = () => {
  const [copiedInstall, setCopiedInstall] = useState(false);
  const installCmd = "npm install -g github:AhmedIbrahim-tech/generate-fullstack-app";
  const usageCmd = "generate-fullstack-app MyApp";

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText(installCmd);
      setCopiedInstall(true);
      toast.success("Install command copied to clipboard!");
      setTimeout(() => setCopiedInstall(false), 2000);
    } catch {
      toast.error("Failed to copy command");
    }
  };

  return (
    <section id="cli-install" className="relative py-20 border-t border-zinc-850 bg-[#080910]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="sky" dot size="md">
            Global Tooling
          </Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Install AppForge CLI
          </h2>
          <p className="mt-3 text-base text-zinc-400">
            Install the official CLI tool globally to scaffold full-stack applications and on-demand
            vertical feature slices directly from your terminal.
          </p>
        </div>

        {/* Installation Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
          {/* Left Column: Command & Details */}
          <div className="space-y-6 lg:col-span-7">
            <div className="rounded-2xl border border-zinc-800/90 bg-[#0e1019] p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-sky-400" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Global Installation Command
                  </span>
                </div>
                <Badge variant="sky" size="sm">npm / Node.js</Badge>
              </div>

              {/* Install Code Block with Copy Button */}
              <CodeBlock
                code={installCmd}
                language="bash"
                filename="terminal"
              />

              <p className="text-xs text-zinc-400 leading-relaxed">
                Installing globally makes the <code className="text-sky-300 font-mono">generate-fullstack-app</code> command available anywhere in your command line environment.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyInstall}
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-500/10 border border-sky-500/30 px-4 py-2 text-xs font-mono font-semibold text-sky-300 hover:bg-sky-500/20 hover:text-white transition-all cursor-pointer"
                >
                  {copiedInstall ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span>Copied Install Command</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy Install Command</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Usage Example */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-zinc-800/90 bg-[#0e1019] p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-indigo-400" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Usage Example
                  </span>
                </div>
                <Badge variant="indigo" size="sm">CLI Execution</Badge>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                Once installed, initialize new projects instantly with interactive prompts or flag options:
              </p>

              <CodeBlock
                code={usageCmd}
                language="bash"
                filename="terminal"
              />

              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-3 text-xs text-zinc-400 font-mono space-y-1">
                <div className="text-zinc-300 font-semibold flex items-center gap-1.5">
                  <ArrowRight className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Output Preview:</span>
                </div>
                <div className="text-emerald-400">✔ Interactive prompts loaded</div>
                <div className="text-zinc-400">✔ Scaffolding MyApp...</div>
                <div className="text-zinc-400">✔ Generated .fullstack-app.json manifest</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
