import type { ReactNode } from "react";

export function SelectionGroup({
  label,
  hint,
  columns = 3,
  className = "",
  children,
}: {
  label: string;
  hint?: string;
  columns?: 2 | 3;
  className?: string;
  children: ReactNode;
}) {
  const grid = columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-3";

  return (
    <div className={className}>
      <div className="mb-2.5 flex items-end justify-between gap-3">
        <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-400">
          {label}
        </span>
        {hint ? <span className="font-mono text-[10px] text-zinc-500">{hint}</span> : null}
      </div>
      <div className={`grid gap-2.5 ${grid}`}>{children}</div>
    </div>
  );
}
