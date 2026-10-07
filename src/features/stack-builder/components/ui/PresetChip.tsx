import type { ButtonHTMLAttributes } from "react";

export function PresetChip({
  selected,
  children,
  className = "",
  type = "button",
  ...props
}: {
  selected?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={`rounded-[6px] border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer font-heading ${
        selected
          ? "border-accent bg-accent-subtle text-white font-semibold"
          : "border-border-subtle bg-surface-secondary text-text-secondary hover:border-zinc-700 hover:bg-surface-raised hover:text-white"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

