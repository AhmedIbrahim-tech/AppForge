import type { ButtonHTMLAttributes, ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";

export type BuilderAccent = "indigo" | "cyan" | "purple";

const accentSelected: Record<BuilderAccent, string> = {
  indigo:
    "border-indigo-400/80 bg-indigo-500/10 text-white shadow-[0_0_24px_-8px_rgba(99,102,241,0.55)] ring-1 ring-indigo-400/35",
  cyan:
    "border-cyan-400/80 bg-cyan-500/10 text-white shadow-[0_0_24px_-8px_rgba(34,211,238,0.45)] ring-1 ring-cyan-400/35",
  purple:
    "border-purple-400/80 bg-purple-500/10 text-white shadow-[0_0_24px_-8px_rgba(168,85,247,0.5)] ring-1 ring-purple-400/35",
};

const accentCheck: Record<BuilderAccent, string> = {
  indigo: "text-indigo-300",
  cyan: "text-cyan-300",
  purple: "text-purple-300",
};

const accentIdle =
  "border-white/8 bg-white/[0.03] text-zinc-400 hover:border-white/16 hover:bg-white/[0.05] hover:text-zinc-200";

export type OptionCardProps = {
  selected: boolean;
  disabled?: boolean;
  accent?: BuilderAccent;
  icon?: ReactNode;
  title: string;
  description?: string;
  trailing?: ReactNode;
  layout?: "compact" | "tile";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function OptionCard({
  selected,
  disabled = false,
  accent = "indigo",
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
    <CheckCircle2 className={`h-4 w-4 shrink-0 ${accentCheck[accent]}`} />
  ) : null;

  return (
    <button
      type={type}
      disabled={disabled}
      aria-pressed={selected}
      className={`group w-full rounded-2xl border transition-all duration-200 ease-out cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/8 disabled:hover:bg-white/[0.03] ${
        selected ? accentSelected[accent] : accentIdle
      } ${
        isTile
          ? "flex min-h-[7.25rem] flex-col items-center justify-center px-3 py-4 text-center"
          : "flex min-h-[2.85rem] items-center justify-between gap-2 px-3.5 py-2.5 text-left"
      } ${className}`}
      {...props}
    >
      {isTile ? (
        <>
          {icon ? (
            <span className={`mb-2 ${selected ? "opacity-100" : "opacity-70 group-hover:opacity-90"}`}>
              {icon}
            </span>
          ) : null}
          <span className="text-sm font-semibold tracking-tight">{title}</span>
          {description ? (
            <span className="mt-1 block text-[11px] font-normal text-zinc-400">{description}</span>
          ) : null}
        </>
      ) : (
        <>
          <span className="flex min-w-0 items-center gap-2">
            {icon ? <span className="shrink-0">{icon}</span> : null}
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-semibold tracking-tight">{title}</span>
              {description ? (
                <span className="mt-0.5 block text-[11px] font-normal text-zinc-400">{description}</span>
              ) : null}
            </span>
          </span>
          <span className="shrink-0">{trailing ?? check}</span>
        </>
      )}
    </button>
  );
}
