import type { ReactNode } from "react";

export function PreviewPanel({
  header,
  children,
}: {
  header: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-card">
      {header}
      <div className="max-h-[min(34rem,75vh)] overflow-auto">{children}</div>
    </div>
  );
}
