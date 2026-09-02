import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layers, Menu, X, ArrowUpRight, Terminal } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/8 bg-[#090a0f]/75 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 p-0.5 shadow-[0_0_20px_rgba(99,102,241,0.35)] transition-transform duration-200 group-hover:scale-105">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#0c0d14]">
              <Layers className="h-4.5 w-4.5 text-indigo-400 transition-colors group-hover:text-indigo-300" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-sans text-lg font-bold tracking-tight text-white">
              AppForge
            </span>
            <span className="hidden rounded-full border border-zinc-700/60 bg-zinc-800/60 px-2 py-0.5 font-mono text-[10px] font-medium text-zinc-400 sm:inline-block">
              generate-fullstack-app
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="/#builder"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            Builder
          </a>
          <a
            href="/#why-appforge"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            Why AppForge
          </a>
          <a
            href="/#how-it-works"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            How It Works
          </a>
          <a
            href="/#cli-install"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            CLI Install
          </a>
          <a
            href="/#feature-generator"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            Feature Generator
          </a>
          <a
            href="/#comparison"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            Comparison
          </a>
        </nav>

        {/* Action buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://github.com/AhmedIbrahim-tech/generate-fullstack-app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-3.5 py-2 text-xs font-semibold text-zinc-300 transition-all hover:border-zinc-700 hover:bg-zinc-850 hover:text-white"
          >
            <GithubIcon className="h-4 w-4" />
            <span>GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" />
          </a>

          <a href="/#builder">
            <Button
              size="sm"
              variant="gradient"
              icon={<Terminal className="h-3.5 w-3.5" />}
            >
              Start Building
            </Button>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-zinc-800/80 bg-[#0c0d14] px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-4">
            <a
              href="/#builder"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-zinc-300 hover:text-white"
            >
              Builder
            </a>
            <a
              href="/#why-appforge"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-zinc-300 hover:text-white"
            >
              Why AppForge
            </a>
            <a
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-zinc-300 hover:text-white"
            >
              How It Works
            </a>
            <a
              href="/#feature-generator"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-zinc-300 hover:text-white"
            >
              Feature Generator
            </a>
            <a
              href="/#comparison"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-zinc-300 hover:text-white"
            >
              Comparison
            </a>
            <div className="mt-3 flex flex-col gap-3 pt-3 border-t border-zinc-800">
              <a
                href="https://github.com/AhmedIbrahim-tech/generate-fullstack-app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-xs font-semibold text-zinc-200"
              >
                <GithubIcon className="h-4 w-4" />
                <span>View on GitHub</span>
              </a>
              <a href="/#builder" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" variant="gradient" className="w-full">
                  Start Building
                </Button>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
