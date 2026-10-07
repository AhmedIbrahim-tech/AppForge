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
    <Check className="h-3.5 w-3.5 shrink-0 text-accent" />
  ) : null;

  return (
    <button
      type={type}
      disabled={disabled}
      aria-pressed={selected}
      className={`group w-full rounded-[6px] border text-left transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-40 ${
        selected
          ? "border-accent bg-accent-subtle text-white"
          : "border-border-subtle bg-surface-secondary text-text-secondary hover:border-zinc-700 hover:bg-surface-raised hover:text-white"
      } ${
        isTile
          ? "flex min-h-[5rem] flex-col items-center justify-center p-3 text-center"
          : "flex min-h-[2.75rem] items-center justify-between gap-2 px-3 py-2"
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
          <span className="text-xs font-medium tracking-tight text-white font-heading">{title}</span>
          {description ? (
            <span className="mt-0.5 block text-[11px] font-normal text-text-muted">{description}</span>
          ) : null}
        </>
      ) : (
        <>
          <span className="flex min-w-0 items-center gap-2">
            {icon ? (
              <span className={`shrink-0 ${selected ? "text-accent" : "text-text-muted"}`}>
                {icon}
              </span>
            ) : null}
            <span className="min-w-0">
              <span className="block truncate text-xs font-medium tracking-tight text-white font-heading">{title}</span>
              {description ? (
                <span className="mt-0.5 block text-[11px] font-normal text-text-muted">{description}</span>
              ) : null}
            </span>
          </span>
          <span className="shrink-0">{trailing ?? check}</span>
        </>
      )}
    </button>
  );
}

