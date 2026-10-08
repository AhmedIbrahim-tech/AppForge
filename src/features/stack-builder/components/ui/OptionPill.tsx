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
    size === "sm" ? "px-2.5 py-1 text-xs min-h-[30px]" : "px-3 py-1.5 text-xs min-h-[34px]";

  return (
    <div className="relative group/pill inline-flex items-center">
      <button
        type={type}
        disabled={disabled}
        aria-pressed={selected}
        title={disabled && disabledReason ? disabledReason : undefined}
        className={`relative inline-flex items-center justify-between gap-2 rounded-lg border font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 cursor-pointer ${
          disabled
            ? "cursor-not-allowed border-border-subtle/50 bg-surface/40 text-text-muted/50"
            : selected
              ? "border-accent/80 bg-accent-subtle text-text-primary font-semibold ring-1 ring-accent/30 shadow-xs"
              : "border-border-subtle bg-surface-secondary text-text-secondary hover:border-border-hover hover:bg-surface-hover hover:text-text-primary"
        } ${sizeClass} ${className}`}
        {...props}
      >
        <span className="flex items-center gap-1.5 truncate font-heading">
          {icon ? <span className="shrink-0 text-text-muted">{icon}</span> : null}
          <span className="truncate">{label}</span>
          {badge ? (
            <span className="rounded bg-surface-raised px-1 py-0.5 text-[10px] font-mono text-text-muted">
              {badge}
            </span>
          ) : null}
        </span>

        {selected && !disabled ? (
          <Check className="h-3.5 w-3.5 shrink-0 text-accent font-bold" />
        ) : null}
      </button>

      {/* Accessible Tooltip for Disabled Reason */}
      {disabled && disabledReason && (
        <div className="pointer-events-none absolute bottom-full left-1/2 z-40 mb-2 hidden -translate-x-1/2 rounded-lg border border-warning/40 bg-surface p-2 text-[11px] font-normal text-warning shadow-lg group-hover/pill:block whitespace-nowrap">
          <div className="flex items-center gap-1.5">
            <HelpCircle className="h-3 w-3 text-warning shrink-0" />
            <span>{disabledReason}</span>
          </div>
        </div>
      )}
    </div>
  );
}
