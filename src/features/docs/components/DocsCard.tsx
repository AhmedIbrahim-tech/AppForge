import React, { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export interface DocsCardProps {
  title: string;
  description: string;
  href: string;
  icon?: ReactNode;
  badge?: string;
}

export const DocsCard: React.FC<DocsCardProps> = ({
  title,
  description,
  href,
  icon,
  badge,
}) => {
  return (
    <Link
      to={href}
      className="group flex flex-col justify-between rounded-xl border border-border-subtle bg-surface p-5 shadow-xs hover:border-accent/40 hover:bg-surface-secondary/70 transition-all"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          {icon ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-secondary text-accent border border-border-subtle group-hover:bg-accent/10 transition-colors">
              {icon}
            </div>
          ) : (
            <span />
          )}
          {badge && (
            <span className="rounded-md bg-surface-secondary px-2 py-0.5 font-mono text-[10px] text-text-muted border border-border-subtle">
              {badge}
            </span>
          )}
        </div>
        <h3 className="font-heading text-sm font-bold text-text-primary group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="mt-1.5 text-xs text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-accent font-heading">
        <span>Read page</span>
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
};
