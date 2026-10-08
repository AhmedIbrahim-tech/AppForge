import React, { type ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface CollapsibleSectionProps {
  id: string;
  icon: ReactNode;
  title: string;
  summaryBadges?: string[];
  expanded: boolean;
  onToggle: () => void;
  notIncluded?: boolean;
  notIncludedMessage?: string;
  onIncludeAction?: () => void;
  actionText?: string;
  badge?: ReactNode;
  children: ReactNode;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  icon,
  title,
  summaryBadges = [],
  expanded,
  onToggle,
  notIncluded = false,
  notIncludedMessage,
  onIncludeAction,
  actionText = "Switch to Full Stack",
  badge,
  children,
}) => {
  if (notIncluded) {
    return (
      <section className="rounded-2xl border border-border-subtle bg-surface/50 p-4 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-surface-secondary text-text-muted border border-border-subtle">
              {icon}
            </span>
            <div>
              <h3 className="text-xs font-semibold text-text-muted font-heading">
                {title}
              </h3>
              <p className="text-[11px] text-text-muted/80">
                {notIncludedMessage || "Not included in this project mode."}
              </p>
            </div>
          </div>

          {onIncludeAction ? (
            <button
              type="button"
              onClick={onIncludeAction}
              className="inline-flex items-center justify-center rounded-lg border border-border-subtle bg-surface-secondary px-3 py-1.5 text-xs font-semibold text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-all cursor-pointer self-start sm:self-auto font-heading shadow-xs"
            >
              {actionText}
            </button>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-border-subtle bg-surface shadow-xs transition-all duration-150">
      {/* Clickable Header for Progressive Disclosure */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-3 p-4 sm:p-5 text-left transition-colors hover:bg-surface-hover/50 cursor-pointer rounded-2xl"
      >
        <div className="flex min-w-0 items-center gap-3.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-surface-secondary text-accent border border-border-subtle shadow-xs">
            {icon}
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-text-primary font-heading">
                {title}
              </h3>
              {badge}
            </div>

            {/* Selection Summary Badges in Header */}
            {summaryBadges.length > 0 && (
              <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-text-secondary">
                {summaryBadges.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <span className="inline-block truncate max-w-[240px] text-text-secondary font-mono text-[11px]">
                      {item}
                    </span>
                    {idx < summaryBadges.length - 1 && (
                      <span className="text-text-muted select-none">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline text-xs font-mono text-text-muted">
            {expanded ? "Collapse" : "Configure"}
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-border-subtle bg-surface-secondary text-text-secondary">
            {expanded ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </span>
        </div>
      </button>

      {/* Expanded Controls Content */}
      {expanded && (
        <div className="border-t border-border-subtle p-4 sm:p-5 space-y-4 animate-fade-in">
          {children}
        </div>
      )}
    </section>
  );
};
