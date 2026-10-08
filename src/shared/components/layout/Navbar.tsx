import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ArrowUpRight,
  Terminal,
  Layers,
  Sun,
  Moon,
  Workflow,
  Boxes,
  Sliders,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import { useTheme } from "@/shared/hooks/useTheme";

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
  const { isDark, toggleTheme } = useTheme();

  const isBuilderActive = location.pathname === "/builder";
  const isFeaturesActive = location.pathname.startsWith("/feature");
  const isModulesActive = location.pathname.startsWith("/modules");
  const isWhyActive = location.pathname === "/why-flatron";
  const isDocsActive = location.pathname.startsWith("/docs");

  const navItems = [
    {
      label: "Stack Builder",
      href: "/builder",
      active: isBuilderActive,
      icon: <Sliders className="h-3.5 w-3.5" />,
    },
    {
      label: "Feature Builder",
      href: "/features",
      active: isFeaturesActive,
      icon: <Workflow className="h-3.5 w-3.5" />,
    },
    {
      label: "Modules",
      href: "/modules",
      active: isModulesActive,
      icon: <Boxes className="h-3.5 w-3.5" />,
    },
    {
      label: "Why Flatron",
      href: "/why-flatron",
      active: isWhyActive,
      icon: <HelpCircle className="h-3.5 w-3.5" />,
    },
    {
      label: "Docs",
      href: "/docs",
      active: isDocsActive,
      icon: <BookOpen className="h-3.5 w-3.5" />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-surface/90 backdrop-blur-md transition-colors duration-150">
      <div className="app-container flex h-14 items-center justify-between">
        {/* Brand & Desktop Navigation */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link to="/" className="group flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-secondary border border-border-subtle text-accent shadow-xs group-hover:border-accent/50 group-hover:bg-accent/10 transition-all">
              <Layers className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-base font-bold tracking-tight text-text-primary">
                Flatron
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono text-text-muted -mt-0.5 leading-none">
                Platform
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const activeClass = item.active
                ? "bg-accent/10 text-accent font-semibold shadow-xs border border-accent/25"
                : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary border border-transparent";

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${activeClass}`}
                >
                  <span className={item.active ? "text-accent" : "text-text-muted"}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right side tools: Quick CLI badge, Theme Toggle, External links */}
        <div className="hidden items-center gap-2.5 md:flex">
          {/* Quick CLI Pill */}
          <div className="flex items-center gap-1.5 rounded-lg border border-border-subtle bg-surface-secondary px-2.5 py-1 font-mono text-xs text-text-secondary shadow-xs">
            <Terminal className="h-3.5 w-3.5 text-accent" />
            <span className="text-text-muted">npx</span>
            <span className="text-text-primary font-semibold">flatron</span>
          </div>

          <div className="h-4 w-px bg-border-subtle mx-1" />

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-subtle bg-surface-secondary text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-all cursor-pointer shadow-xs"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-warning" />
            ) : (
              <Moon className="h-4 w-4 text-info" />
            )}
          </button>

          {/* GitHub Repo Link */}
          <a
            href="https://github.com/AhmedIbrahim-tech/flatron"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-border-subtle bg-surface-secondary px-2.5 py-1.5 text-xs font-medium text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-all shadow-xs"
            aria-label="GitHub Repository"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">GitHub</span>
            <ArrowUpRight className="h-3 w-3 text-text-muted" />
          </a>

          {/* npm Package Link */}
          <a
            href="https://www.npmjs.com/package/flatron"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-border-subtle bg-surface-secondary px-2.5 py-1.5 text-xs font-medium text-text-secondary hover:bg-surface-hover hover:text-accent transition-all shadow-xs"
            aria-label="npm Package"
          >
            <NpmIcon className="h-3.5 w-3.5 text-accent" />
            <span className="hidden lg:inline">npm</span>
            <ArrowUpRight className="h-3 w-3 text-text-muted" />
          </a>
        </div>

        {/* Mobile menu and theme toggle */}
        <div className="flex items-center gap-1.5 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-subtle bg-surface-secondary text-text-secondary hover:text-text-primary"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-warning" />
            ) : (
              <Moon className="h-4 w-4 text-info" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-subtle bg-surface-secondary text-text-secondary hover:text-text-primary"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-border-subtle bg-surface px-4 py-3 md:hidden shadow-lg animate-fade-in">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                  item.active
                    ? "bg-accent/10 text-accent font-semibold"
                    : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
                }`}
              >
                <span className={item.active ? "text-accent" : "text-text-muted"}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            ))}

            <div className="mt-2 flex items-center justify-between border-t border-border-subtle pt-3 text-xs text-text-secondary">
              <a
                href="https://github.com/AhmedIbrahim-tech/flatron"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-text-primary"
              >
                <GithubIcon className="h-4 w-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.npmjs.com/package/flatron"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-accent"
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
