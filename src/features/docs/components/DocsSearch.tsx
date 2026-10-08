import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, FileText, ArrowRight } from "lucide-react";
import { DOC_SEARCH_INDEX } from "../docs-data";
import type { DocSearchEntry } from "../types";

export const DocsSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Global hotkey Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const cleanQuery = query.toLowerCase().trim();
  const results: DocSearchEntry[] = cleanQuery
    ? DOC_SEARCH_INDEX.filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(cleanQuery);
        const descMatch = item.description.toLowerCase().includes(cleanQuery);
        const keywordMatch = item.keywords.some((k) =>
          k.toLowerCase().includes(cleanQuery),
        );
        const headingMatch = item.headings.some((h) =>
          h.toLowerCase().includes(cleanQuery),
        );
        return titleMatch || descMatch || keywordMatch || headingMatch;
      })
    : DOC_SEARCH_INDEX.slice(0, 4);

  const handleSelect = (href: string) => {
    setIsOpen(false);
    navigate(href);
  };

  return (
    <>
      {/* Search trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-border-subtle bg-surface px-3 py-2 text-xs text-text-muted hover:border-accent/40 hover:text-text-primary transition-all shadow-xs cursor-pointer"
        aria-label="Search documentation"
      >
        <div className="flex items-center gap-2">
          <Search className="h-3.5 w-3.5 text-text-muted" />
          <span>Search docs...</span>
        </div>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border-subtle bg-surface-secondary px-1.5 py-0.5 font-mono text-[10px] text-text-muted">
          <span>⌘</span>K
        </kbd>
      </button>

      {/* Search modal overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden animate-fade-in-up">
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 border-b border-border-subtle px-4 py-3">
              <Search className="h-4 w-4 text-accent shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documentation, concepts, commands..."
                className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-hidden font-sans"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="rounded p-1 text-text-muted hover:text-text-primary"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Search Results List */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-border-subtle/50">
              {results.length > 0 ? (
                results.map((result) => (
                  <button
                    key={result.slug}
                    type="button"
                    onClick={() => handleSelect(result.href)}
                    className="group flex w-full items-start gap-3 rounded-xl p-3 text-left hover:bg-surface-secondary transition-colors cursor-pointer"
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface-secondary text-accent group-hover:bg-accent/10 border border-border-subtle">
                      <FileText className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-xs font-bold text-text-primary group-hover:text-accent">
                          {result.title}
                        </span>
                        <span className="font-mono text-[10px] text-text-muted">
                          {result.section}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-[11px] text-text-secondary">
                        {result.description}
                      </p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-text-muted group-hover:text-accent opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                  </button>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-text-muted">
                  No documentation found for "{query}".
                </div>
              )}
            </div>

            {/* Search Footer */}
            <div className="flex items-center justify-between border-t border-border-subtle bg-surface-secondary px-4 py-2 text-[11px] text-text-muted">
              <span>Quick navigation</span>
              <kbd className="rounded border border-border-subtle bg-surface px-1.5 py-0.5 font-mono text-[10px]">
                ESC to close
              </kbd>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
