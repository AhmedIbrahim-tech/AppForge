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
      <div className="flex items-center gap-2 rounded-[6px] border border-success/30 bg-success/10 px-3 py-2 text-xs text-success">
        <ShieldCheck className="h-4 w-4 shrink-0" />
        <span className="font-medium font-body">{children}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-[6px] border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger">
      <AlertOctagon className="h-4 w-4 shrink-0" />
      <span className="font-medium font-body">{children}</span>
    </div>
  );
}

