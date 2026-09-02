import type { ReactNode } from "react";

export function PreviewPanel({
  header,
  children,
}: {
  header: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#0c0f18]/90 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.9)] backdrop-blur-md">
      {header}
      <div className="max-h-[min(32rem,70vh)] overflow-auto">{children}</div>
    </div>
  );
}
