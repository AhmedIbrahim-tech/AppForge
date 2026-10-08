import type { ReactNode } from "react";
import { ShieldCheck, AlertOctagon } from "lucide-react";

export function StatusBadge({
  valid,
  children,
}: {
  valid: boolean;
  children: ReactNode;
}) {
  if (valid) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-success/30 bg-success/10 px-3.5 py-2.5 text-xs text-success shadow-xs">
        <ShieldCheck className="h-4 w-4 shrink-0" />
        <span className="font-semibold font-sans">{children}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-xl border border-danger/30 bg-danger/10 px-3.5 py-2.5 text-xs text-danger shadow-xs">
      <AlertOctagon className="h-4 w-4 shrink-0" />
      <span className="font-semibold font-sans">{children}</span>
    </div>
  );
}
