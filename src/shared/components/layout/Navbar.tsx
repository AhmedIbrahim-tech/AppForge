import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight, Terminal, Layers } from "lucide-react";

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

function NpmIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.13h13.74v13.74h-3.435v-10.3h-3.435v10.3H5.13z" />
    </svg>
  );
}

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isFeaturesActive = location.pathname.startsWith("/feature");
  const isModulesActive = location.pathname.startsWith("/modules");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-line bg-base/95 backdrop-blur-md">
      <div className="app-container flex h-14 items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <Link to="/" className="group flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-surface-raised border border-border-subtle text-accent group-hover:border-accent/60 transition-colors">
              <Layers className="h-4 w-4" />
            </div>
            <span className="font-heading text-base font-semibold tracking-tight text-white">
              Flatron
            </span>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            <a
              href="/#builder"
              className="rounded-[6px] px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white hover:bg-surface-secondary transition-colors"
            >
              Stack Builder
            </a>
            <Link
              to="/features"
              className={`rounded-[6px] px-3 py-1.5 text-xs font-medium transition-colors ${
                isFeaturesActive
                  ? "bg-surface-secondary text-white font-semibold"
                  : "text-zinc-400 hover:text-white hover:bg-surface-secondary"
              }`}
            >
              Feature Builder
            </Link>
            <Link
              to="/modules"
              className={`rounded-[6px] px-3 py-1.5 text-xs font-medium transition-colors ${
                isModulesActive
                  ? "bg-surface-secondary text-white font-semibold"
                  : "text-zinc-400 hover:text-white hover:bg-surface-secondary"
              }`}
            >
              Modules
            </Link>
            <a
              href="/#comparison"
              className="rounded-[6px] px-3 py-1.5 text-xs font-medium text-zinc-500 hover:text-white hover:bg-surface-secondary transition-colors"
            >
              Why Flatron
            </a>
          </nav>
        </div>

        {/* Right actions: Quick CLI command & Repo links */}
        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-1.5 rounded-[6px] border border-border-subtle bg-surface px-2.5 py-1 font-mono text-xs text-zinc-400">
            <Terminal className="h-3 w-3 text-accent" />
            <span className="text-zinc-500">npx</span>
            <span className="text-white font-medium">flatron</span>
          </div>

          <div className="h-4 w-px bg-border-subtle" />

          <a
            href="https://github.com/AhmedIbrahim-tech/flatron"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            <span>GitHub</span>
            <ArrowUpRight className="h-3 w-3 text-zinc-500" />
          </a>

          <a
            href="https://www.npmjs.com/package/flatron"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <NpmIcon className="h-3 w-3 text-accent" />
            <span>npm</span>
            <ArrowUpRight className="h-3 w-3 text-zinc-500" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="rounded-[6px] p-1.5 text-zinc-400 hover:bg-surface-secondary hover:text-white"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-border-subtle bg-surface px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            <a
              href="/#builder"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-[6px] px-3 py-2 text-xs font-medium text-white hover:bg-surface-secondary"
            >
              Stack Builder
            </a>
            <Link
              to="/features"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-[6px] px-3 py-2 text-xs font-medium text-white hover:bg-surface-secondary"
            >
              Feature Builder
            </Link>
            <Link
              to="/modules"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-[6px] px-3 py-2 text-xs font-medium text-white hover:bg-surface-secondary"
            >
              Modules
            </Link>
            <a
              href="/#comparison"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-[6px] px-3 py-2 text-xs font-medium text-zinc-500 hover:bg-surface-secondary"
            >
              Why Flatron
            </a>

            <div className="mt-2 flex items-center gap-4 border-t border-border-subtle pt-3 text-xs text-zinc-400">
              <a
                href="https://github.com/AhmedIbrahim-tech/flatron"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white"
              >
                <GithubIcon className="h-4 w-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.npmjs.com/package/flatron"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white"
              >
                <NpmIcon className="h-3.5 w-3.5 text-accent" />
                <span>npm</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
