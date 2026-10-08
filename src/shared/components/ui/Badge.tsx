import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "info" | "emerald" | "amber" | "danger" | "zinc" | "outline";
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
    sm: "px-2 py-0.5 text-[11px] rounded-md",
    md: "px-2.5 py-0.5 text-xs rounded-md",
  }[size];

  const variantClasses = {
    default: "bg-surface-secondary text-text-secondary border border-border-subtle",
    accent: "bg-accent-subtle text-accent-text border border-accent-border font-medium",
    info: "bg-info/10 text-info border border-info/30 font-medium",
    emerald: "bg-success/10 text-success border border-success/30 font-medium",
    amber: "bg-warning/10 text-warning border border-warning/30 font-medium",
    danger: "bg-danger/10 text-danger border border-danger/30 font-medium",
    zinc: "bg-surface text-text-muted border border-border-subtle",
    outline: "bg-transparent text-text-secondary border border-border-subtle",
  }[variant];

  const dotColors = {
    default: "bg-text-muted",
    accent: "bg-accent",
    info: "bg-info",
    emerald: "bg-success",
    amber: "bg-warning",
    danger: "bg-danger",
    zinc: "bg-text-muted",
    outline: "bg-text-muted",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-medium tracking-tight ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotColors}`} />}
      {children}
    </span>
  );
};
