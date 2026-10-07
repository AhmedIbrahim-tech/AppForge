import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "indigo" | "emerald" | "amber" | "danger" | "zinc" | "outline";
  size?: "sm" | "md";
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className = "",
  variant = "default",
  size = "md",
  dot = false,
  ...props
}) => {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-0.5 text-xs",
  }[size];

  const variantClasses = {
    default: "bg-surface-secondary text-text-secondary border border-border-subtle",
    accent: "bg-accent-subtle text-accent-hover border border-accent-border",
    indigo: "bg-accent-subtle text-accent-hover border border-accent-border",
    emerald: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
    amber: "bg-amber-500/10 text-amber-400 border border-amber-500/30",
    danger: "bg-rose-500/10 text-rose-400 border border-rose-500/30",
    zinc: "bg-surface text-text-muted border border-border-subtle",
    outline: "bg-transparent text-text-secondary border border-border-subtle",
  }[variant];

  const dotColors = {
    default: "bg-text-muted",
    accent: "bg-accent",
    indigo: "bg-accent",
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    danger: "bg-rose-400",
    zinc: "bg-text-muted",
    outline: "bg-text-muted",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[5px] font-mono font-medium tracking-tight ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotColors}`} />}
      {children}
    </span>
  );
};

