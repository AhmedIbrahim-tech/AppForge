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
    <section className="rounded-2xl border border-border-subtle bg-surface p-4 sm:p-5 shadow-xs">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-3">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-border-subtle bg-surface-secondary text-accent shadow-xs">
            {icon}
          </span>
          <h3 className="text-sm font-bold text-text-primary font-heading tracking-tight">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          {badge}
          {stepLabel ? (
            <span className="font-mono text-[11px] text-text-muted">{stepLabel}</span>
          ) : null}
        </div>
      </header>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
