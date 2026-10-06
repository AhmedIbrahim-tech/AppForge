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
  accent?: "indigo" | "cyan" | "purple";
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
  accent = "indigo",
  badge,
  children,
}) => {
  const accentBorder = {
    indigo: "border-indigo-500/20",
    cyan: "border-cyan-500/20",
    purple: "border-purple-500/20",
  }[accent];

  const accentIconBg = {
    indigo: "text-indigo-400 border-indigo-500/20 bg-indigo-500/10",
    cyan: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10",
    purple: "text-purple-400 border-purple-500/20 bg-purple-500/10",
  }[accent];

  if (notIncluded) {
    return (
      <section className="rounded-2xl border border-white/5 bg-[#090b13]/60 p-4 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-xl border opacity-50 ${accentIconBg}`}
            >
              {icon}
            </span>
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-zinc-400">
                {title}
              </h3>
              <p className="text-xs text-zinc-600">
                {notIncludedMessage || "Not included in this project mode."}
              </p>
            </div>
          </div>

          {onIncludeAction ? (
            <button
              type="button"
              onClick={onIncludeAction}
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-white/20 hover:bg-white/10 hover:text-white transition-all cursor-pointer self-start sm:self-auto"
            >
              {actionText}
            </button>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section
      className={`rounded-2xl border border-white/8 bg-[#0c0e18]/90 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all ${
        expanded ? `ring-1 ring-white/10 ${accentBorder}` : ""
      }`}
    >
      {/* Clickable Header for Progressive Disclosure */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-3 p-4 sm:p-5 text-left transition-colors hover:bg-white/[0.02] cursor-pointer rounded-2xl"
      >
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border ${accentIconBg}`}
          >
            {icon}
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-semibold tracking-wide text-white">
                {title}
              </h3>
              {badge}
            </div>

            {/* Selection Summary Badges in Header */}
            {summaryBadges.length > 0 && (
              <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-400">
                {summaryBadges.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <span className="inline-block truncate max-w-[200px] text-zinc-300 font-medium">
                      {item}
                    </span>
                    {idx < summaryBadges.length - 1 && (
                      <span className="text-zinc-600 select-none">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline text-xs font-mono text-zinc-500">
            {expanded ? "Collapse" : "Configure"}
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400">
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </span>
        </div>
      </button>

      {/* Expanded Controls Content */}
      {expanded && (
        <div className="border-t border-white/[0.06] p-4 sm:p-6 space-y-5">
          {children}
        </div>
      )}
    </section>
  );
};
