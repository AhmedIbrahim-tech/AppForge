import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowUpRight, Terminal, Box } from "lucide-react";

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

function NpmIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.13h13.74v13.74h-3.435v-10.3h-3.435v10.3H5.13z" />
    </svg>
  );
}

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#090a0f]/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 w-full max-w-[100rem] items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Left: Brand Logo */}
        <Link to="/" className="group flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 p-0.5 shadow-[0_0_16px_rgba(99,102,241,0.3)] transition-transform duration-200 group-hover:scale-105">
            <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-[#0c0d14]">
              <Box className="h-4 w-4 text-indigo-400 transition-colors group-hover:text-indigo-300" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-sans text-base font-bold tracking-tight text-white">
              Flatron
            </span>
          </div>
        </Link>

        {/* Center: Open Builder & Navigation Links */}
        <nav className="hidden items-center gap-5 md:flex">
          <a
            href="/#builder"
            className="flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300 shadow-[0_0_14px_rgba(99,102,241,0.25)] transition-all hover:border-indigo-400/60 hover:bg-indigo-500/20 hover:text-white cursor-pointer active:scale-95"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>Stack Builder</span>
          </a>
          <Link
            to="/features"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            Features
          </Link>
          <Link
            to="/modules"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            Modules
          </Link>
          <a
            href="/#comparison"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            Why Flatron
          </a>
        </nav>

        {/* Right / End of Row: npm & GitHub */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="https://www.npmjs.com/package/flatron"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            <NpmIcon className="h-3.5 w-3.5 text-red-400" />
            <span>npm</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-zinc-600" />
          </a>
          <a
            href="https://github.com/AhmedIbrahim-tech/flatron"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            <GithubIcon className="h-4 w-4" />
            <span>GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-zinc-600" />
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
              className="flex items-center gap-2 rounded-lg bg-indigo-500/15 px-3 py-2 text-sm font-semibold text-indigo-300"
            >
              <Terminal className="h-4 w-4" />
              <span>Stack Builder</span>
            </a>
            <Link
              to="/features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-zinc-300 hover:text-white px-3 py-1"
            >
              Business Feature Builder
            </Link>
            <Link
              to="/modules"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-zinc-300 hover:text-white px-3 py-1"
            >
              Application Modules
            </Link>
            <a
              href="/#comparison"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-zinc-300 hover:text-white px-3 py-1"
            >
              Why Flatron
            </a>
            <div className="flex items-center gap-4 pt-3 border-t border-zinc-800">
              <a
                href="https://www.npmjs.com/package/flatron"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white"
              >
                <NpmIcon className="h-4 w-4 text-red-400" />
                <span>npm</span>
              </a>
              <a
                href="https://github.com/AhmedIbrahim-tech/flatron"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white"
              >
                <GithubIcon className="h-4 w-4" />
                <span>GitHub</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
