import React from "react";
import { Layers, ArrowUpRight, Terminal, Heart } from "lucide-react";

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

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.62 1.62 0 1 0-.02-3.24 1.62 1.62 0 0 0 .02 3.24m1.4 9.74v-8.37H5.06v8.37h2.8z" />
    </svg>
  );
}

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-850 bg-[#07080c] py-14 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-12">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-md">
                <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-[#0c0d14]">
                  <Layers className="h-4 w-4 text-indigo-400" />
                </div>
              </div>
              <span className="font-sans text-lg font-bold text-white tracking-tight">
                AppForge
              </span>
              <span className="rounded bg-zinc-800/80 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                v1.0.0
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
              The web platform and developer home for the{" "}
              <code className="rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-xs text-indigo-300">
                generate-fullstack-app
              </code>{" "}
              ecosystem. Configurable architecture, manifest-driven generation,
              and fullstack feature scaffolding without runtime lock-in.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://github.com/AhmedIbrahim-tech/generate-fullstack-app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80 text-zinc-400 transition-colors hover:border-zinc-700 hover:text-white"
                aria-label="GitHub Repository"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/ahmedeprahim/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80 text-zinc-400 transition-colors hover:border-zinc-700 hover:text-[#0a66c2]"
                aria-label="Author LinkedIn"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 font-mono">
              Ecosystem
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="/#builder"
                  className="transition-colors hover:text-zinc-200"
                >
                  Stack Builder
                </a>
              </li>
              <li>
                <a
                  href="/#why-appforge"
                  className="transition-colors hover:text-zinc-200"
                >
                  Why AppForge
                </a>
              </li>
              <li>
                <a
                  href="/#how-it-works"
                  className="transition-colors hover:text-zinc-200"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="/#feature-generator"
                  className="transition-colors hover:text-zinc-200"
                >
                  Feature Generator
                </a>
              </li>
              <li>
                <a
                  href="/#comparison"
                  className="transition-colors hover:text-zinc-200"
                >
                  Manual vs AppForge
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Author */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 font-mono">
              Resources & Author
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="https://github.com/AhmedIbrahim-tech/generate-fullstack-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-zinc-200"
                >
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/ahmedeprahim/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-zinc-200"
                >
                  <span>Ahmed Ibrahim (LinkedIn)</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/AhmedIbrahim-tech/generate-fullstack-app#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200"
                >
                  <span>CLI Documentation</span>
                  <span className="rounded bg-zinc-800 px-1.5 py-0.2 text-[10px] font-mono text-zinc-400">
                    CLI v1.0
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/AhmedIbrahim-tech/generate-fullstack-app/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-zinc-200"
                >
                  <span>MIT License</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-900 pt-8 sm:flex-row text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5 text-indigo-400" />
            <span>
              © {new Date().getFullYear()} AppForge. Open-source under MIT
              License.
            </span>
          </div>
          <div className="flex items-center gap-1 text-zinc-400">
            <span>Crafted for developers with</span>
            <Heart className="h-3.5 w-3.5 fill-red-500/80 text-red-500/80 mx-1" />
            <span>by Ahmed Ibrahim</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
