import type { ReactNode } from "react";

export function SectionCard({
  icon,
  title,
  stepLabel,
  badge,
  children,
}: {
  icon: ReactNode;
  title: string;
  stepLabel?: string;
  badge?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/8 bg-[#0e111b]/80 p-5 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.85)] backdrop-blur-md sm:p-6">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-indigo-300">
            {icon}
          </span>
          <h3 className="text-sm font-semibold tracking-wide text-zinc-100">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          {badge}
          {stepLabel ? (
            <span className="font-mono text-[11px] text-zinc-500">{stepLabel}</span>
          ) : null}
        </div>
      </header>
      <div className="space-y-5">{children}</div>
    </section>
  );
}
