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
      <div className="flex items-center gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-200">
        <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
        <span className="font-medium tracking-tight">{children}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-2.5 text-xs text-red-200">
      <AlertOctagon className="h-4 w-4 shrink-0 text-red-400" />
      <span className="font-medium tracking-tight">{children}</span>
    </div>
  );
}
