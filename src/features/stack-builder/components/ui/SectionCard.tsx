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
    <section className="rounded-[8px] border border-border bg-surface p-4 sm:p-5">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-[5px] border border-border bg-surface-secondary text-accent">
            {icon}
          </span>
          <h3 className="text-sm font-semibold text-text-primary font-heading tracking-tight">{title}</h3>
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

