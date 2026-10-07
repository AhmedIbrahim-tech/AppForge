import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Check, HelpCircle } from "lucide-react";

export type OptionPillProps = {
  selected: boolean;
  disabled?: boolean;
  disabledReason?: string;
  label: string;
  badge?: string;
  icon?: ReactNode;
  size?: "sm" | "md";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function OptionPill({
  selected,
  disabled = false,
  disabledReason,
  label,
  badge,
  icon,
  size = "md",
  className = "",
  type = "button",
  ...props
}: OptionPillProps) {
  const sizeClass =
    size === "sm" ? "px-2 py-1 text-xs" : "px-2.5 py-1.5 text-xs";

  return (
    <div className="relative group/pill inline-flex items-center">
      <button
        type={type}
        disabled={disabled}
        aria-pressed={selected}
        title={disabled && disabledReason ? disabledReason : undefined}
        className={`relative inline-flex items-center justify-between gap-1.5 rounded-[6px] border font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent cursor-pointer ${
          disabled
            ? "cursor-not-allowed border-border-subtle/50 bg-transparent text-text-muted/50"
            : selected
              ? "border-accent bg-accent-subtle text-white font-semibold"
              : "border-border-subtle bg-surface-secondary text-text-secondary hover:border-zinc-700 hover:bg-surface-raised hover:text-white"
        } ${sizeClass} ${className}`}
        {...props}
      >
        <span className="flex items-center gap-1.5 truncate font-heading">
          {icon ? <span className="shrink-0 text-text-muted">{icon}</span> : null}
          <span className="truncate">{label}</span>
          {badge ? (
            <span className="rounded bg-surface-raised px-1 py-0.2 text-[10px] font-mono text-text-muted">
              {badge}
            </span>
          ) : null}
        </span>

        {selected && !disabled ? (
          <Check className="h-3.5 w-3.5 shrink-0 text-accent" />
        ) : null}
      </button>


      {/* Accessible Tooltip for Disabled Reason */}
      {disabled && disabledReason && (
        <div className="pointer-events-none absolute bottom-full left-1/2 z-40 mb-2 hidden -translate-x-1/2 rounded-[5px] border border-[#D89A3C]/40 bg-[#16141E] px-2.5 py-1 text-[11px] font-normal text-[#D89A3C] shadow-xl group-hover/pill:block whitespace-nowrap">
          <div className="flex items-center gap-1.5">
            <HelpCircle className="h-3 w-3 text-[#D89A3C] shrink-0" />
            <span>{disabledReason}</span>
          </div>
        </div>
      )}
    </div>
  );
}
