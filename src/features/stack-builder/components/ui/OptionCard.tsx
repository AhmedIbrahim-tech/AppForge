import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Check } from "lucide-react";

export type OptionCardProps = {
  selected: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  title: string;
  description?: string;
  trailing?: ReactNode;
  layout?: "compact" | "tile";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function OptionCard({
  selected,
  disabled = false,
  icon,
  title,
  description,
  trailing,
  layout = "compact",
  className = "",
  type = "button",
  ...props
}: OptionCardProps) {
  const isTile = layout === "tile";
  const check = selected ? (
    <Check className="h-4 w-4 shrink-0 text-accent font-bold" />
  ) : null;

  return (
    <button
      type={type}
      disabled={disabled}
      aria-pressed={selected}
      className={`group w-full rounded-xl border text-left transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-45 ${
        selected
          ? "border-accent/80 bg-accent-subtle text-text-primary shadow-xs ring-1 ring-accent/30"
          : "border-border-subtle bg-surface-secondary text-text-secondary hover:border-border-hover hover:bg-surface-hover hover:text-text-primary"
      } ${
        isTile
          ? "flex min-h-[5.5rem] flex-col items-center justify-center p-3.5 text-center"
          : "flex min-h-[3rem] items-center justify-between gap-2.5 px-3.5 py-2.5"
      } ${className}`}
      {...props}
    >
      {isTile ? (
        <>
          {icon ? (
            <span className={`mb-1.5 ${selected ? "text-accent" : "text-text-muted"}`}>
              {icon}
            </span>
          ) : null}
          <span className="text-xs font-semibold tracking-tight text-text-primary font-heading">{title}</span>
          {description ? (
            <span className="mt-0.5 block text-[11px] font-normal text-text-muted leading-tight">{description}</span>
          ) : null}
        </>
      ) : (
        <>
          <span className="flex min-w-0 items-center gap-2.5">
            {icon ? (
              <span className={`shrink-0 ${selected ? "text-accent" : "text-text-muted"}`}>
                {icon}
              </span>
            ) : null}
            <span className="min-w-0">
              <span className="block truncate text-xs font-semibold tracking-tight text-text-primary font-heading">{title}</span>
              {description ? (
                <span className="mt-0.5 block text-[11px] font-normal text-text-muted leading-tight">{description}</span>
              ) : null}
            </span>
          </span>
          <span className="shrink-0">{trailing ?? check}</span>
        </>
      )}
    </button>
  );
}
