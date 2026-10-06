import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Check, HelpCircle } from "lucide-react";

export type OptionPillProps = {
  selected: boolean;
  disabled?: boolean;
  disabledReason?: string;
  label: string;
  badge?: string;
  icon?: ReactNode;
  accent?: "indigo" | "cyan" | "purple";
  size?: "sm" | "md";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function OptionPill({
  selected,
  disabled = false,
  disabledReason,
  label,
  badge,
  icon,
  accent = "indigo",
  size = "md",
  className = "",
  type = "button",
  ...props
}: OptionPillProps) {
  const accentClasses = {
    indigo: {
      selected:
        "border-indigo-400/80 bg-indigo-500/15 text-white ring-1 ring-indigo-400/30",
      check: "text-indigo-300",
    },
    cyan: {
      selected:
        "border-cyan-400/80 bg-cyan-500/15 text-white ring-1 ring-cyan-400/30",
      check: "text-cyan-300",
    },
    purple: {
      selected:
        "border-purple-400/80 bg-purple-500/15 text-white ring-1 ring-purple-400/30",
      check: "text-purple-300",
    },
  }[accent];

  const idleClass =
    "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white";

  const sizeClass =
    size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-xs";

  return (
    <div className="relative group/pill inline-flex items-center">
      <button
        type={type}
        disabled={disabled}
        aria-pressed={selected}
        title={disabled && disabledReason ? disabledReason : undefined}
        className={`relative inline-flex items-center justify-between gap-2 rounded-xl border font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
          disabled
            ? "cursor-not-allowed border-white/5 bg-white/[0.015] text-zinc-500 hover:border-white/5"
            : selected
              ? accentClasses.selected
              : idleClass
        } ${sizeClass} ${className}`}
        {...props}
      >
        <span className="flex items-center gap-1.5 truncate">
          {icon ? <span className="shrink-0">{icon}</span> : null}
          <span className="truncate">{label}</span>
          {badge ? (
            <span className="rounded bg-white/10 px-1 py-0.2 text-[10px] font-mono text-zinc-400">
              {badge}
            </span>
          ) : null}
        </span>

        {selected && !disabled ? (
          <Check className={`h-3.5 w-3.5 shrink-0 ${accentClasses.check}`} />
        ) : null}
      </button>

      {/* Accessible Tooltip for Disabled Reason */}
      {disabled && disabledReason && (
        <div className="pointer-events-none absolute bottom-full left-1/2 z-40 mb-2 hidden -translate-x-1/2 rounded-lg border border-amber-500/30 bg-[#16141e] px-2.5 py-1 text-[11px] font-normal text-amber-200 shadow-2xl group-hover/pill:block whitespace-nowrap">
          <div className="flex items-center gap-1.5">
            <HelpCircle className="h-3 w-3 text-amber-400 shrink-0" />
            <span>{disabledReason}</span>
          </div>
        </div>
      )}
    </div>
  );
}
