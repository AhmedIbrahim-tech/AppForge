import React from "react";
import { Link, useLocation } from "react-router-dom";
import { DOC_SECTIONS } from "../docs-data";
import { DocsSearch } from "./DocsSearch";
import { BookOpen, Sparkles } from "lucide-react";

export interface DocsSidebarProps {
  onItemClick?: () => void;
}

export const DocsSidebar: React.FC<DocsSidebarProps> = ({ onItemClick }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col gap-6">
      {/* Quick Search */}
      <DocsSearch />

      {/* Docs Start Here Link */}
      <div>
        <Link
          to="/docs"
          onClick={onItemClick}
          className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
            location.pathname === "/docs" || location.pathname === "/docs/"
              ? "bg-accent/10 text-accent border border-accent/25 shadow-xs"
              : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary border border-transparent"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Documentation Overview</span>
        </Link>
      </div>

      {/* Structured Sections */}
      {DOC_SECTIONS.map((section) => (
        <div key={section.title} className="space-y-1.5">
          <div className="px-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            {section.title}
          </div>
          <nav className="flex flex-col space-y-0.5">
            {section.pages.map((page) => {
              const href = `/docs/${page.slug}`;
              const isActive = location.pathname === href;
              return (
                <Link
                  key={page.slug}
                  to={href}
                  onClick={onItemClick}
                  className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-xs transition-all ${
                    isActive
                      ? "bg-accent/10 font-semibold text-accent border border-accent/25 shadow-xs"
                      : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary border border-transparent font-medium"
                  }`}
                >
                  <span>{page.title}</span>
                  {page.slug === "feature-vs-module" && (
                    <span className="flex items-center gap-0.5 rounded bg-accent/15 px-1 py-0.2 text-[9px] font-mono font-bold text-accent">
                      <Sparkles className="h-2.5 w-2.5" />
                      Key
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      ))}
    </div>
  );
};
