import React, { type ReactNode } from "react";
import { Info, Lightbulb, AlertTriangle } from "lucide-react";

export interface DocsCalloutProps {
  type?: "note" | "tip" | "warning";
  title?: string;
  children: ReactNode;
  className?: string;
}

export const DocsCallout: React.FC<DocsCalloutProps> = ({
  type = "note",
  title,
  children,
  className = "",
}) => {
  const configs = {
    note: {
      icon: <Info className="h-4 w-4 text-info shrink-0 mt-0.5" />,
      border: "border-info/30",
      bg: "bg-info/5",
      titleColor: "text-info font-semibold",
      defaultTitle: "Note",
    },
    tip: {
      icon: <Lightbulb className="h-4 w-4 text-success shrink-0 mt-0.5" />,
      border: "border-success/30",
      bg: "bg-success/5",
      titleColor: "text-success font-semibold",
      defaultTitle: "Tip",
    },
    warning: {
      icon: <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />,
      border: "border-warning/30",
      bg: "bg-warning/5",
      titleColor: "text-warning font-semibold",
      defaultTitle: "Important",
    },
  };

  const config = configs[type];

  return (
    <div
      className={`my-5 rounded-xl border p-4 text-xs sm:text-sm leading-relaxed ${config.border} ${config.bg} ${className}`}
    >
      <div className="flex items-start gap-3">
        {config.icon}
        <div className="flex-1">
          <div className={`font-heading text-xs uppercase tracking-wider mb-1 ${config.titleColor}`}>
            {title || config.defaultTitle}
          </div>
          <div className="text-text-secondary">{children}</div>
        </div>
      </div>
    </div>
  );
};
