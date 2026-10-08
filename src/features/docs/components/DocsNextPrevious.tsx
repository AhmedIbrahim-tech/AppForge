import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { DocNavigationLink } from "../types";

export interface DocsNextPreviousProps {
  previous?: DocNavigationLink;
  next?: DocNavigationLink;
}

export const DocsNextPrevious: React.FC<DocsNextPreviousProps> = ({
  previous,
  next,
}) => {
  if (!previous && !next) return null;

  return (
    <div className="mt-12 flex flex-col sm:flex-row items-stretch justify-between gap-4 border-t border-border-subtle pt-6">
      {previous ? (
        <Link
          to={previous.href}
          className="group flex flex-1 items-center gap-3 rounded-xl border border-border-subtle bg-surface p-4 shadow-xs hover:border-accent/40 hover:bg-surface-secondary transition-all"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-secondary text-text-muted group-hover:bg-accent/10 group-hover:text-accent transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </div>
          <div className="text-left">
            <div className="text-[11px] font-mono text-text-muted">Previous</div>
            <div className="font-heading text-xs sm:text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
              {previous.title}
            </div>
          </div>
        </Link>
      ) : (
        <div className="hidden sm:block flex-1" />
      )}

      {next ? (
        <Link
          to={next.href}
          className="group flex flex-1 items-center justify-end gap-3 rounded-xl border border-border-subtle bg-surface p-4 shadow-xs hover:border-accent/40 hover:bg-surface-secondary transition-all text-right"
        >
          <div>
            <div className="text-[11px] font-mono text-text-muted">Next</div>
            <div className="font-heading text-xs sm:text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
              {next.title}
            </div>
          </div>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-secondary text-text-muted group-hover:bg-accent/10 group-hover:text-accent transition-colors">
            <ArrowRight className="h-4 w-4" />
          </div>
        </Link>
      ) : (
        <div className="hidden sm:block flex-1" />
      )}
    </div>
  );
};
