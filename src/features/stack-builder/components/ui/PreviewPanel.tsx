import type { ReactNode } from "react";

export function PreviewPanel({
  header,
  children,
}: {
  header: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-border-subtle bg-surface">
      {header}
      <div className="max-h-[min(32rem,70vh)] overflow-auto">{children}</div>
    </div>
  );
}

