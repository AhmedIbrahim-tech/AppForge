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
      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
        selected
          ? "border-indigo-400/70 bg-indigo-500/15 text-white shadow-[0_0_18px_-6px_rgba(99,102,241,0.8)]"
          : "border-white/10 bg-white/[0.04] text-zinc-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
