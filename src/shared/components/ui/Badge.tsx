import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "indigo" | "emerald" | "amber" | "sky" | "zinc" | "outline";
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
    md: "px-2.5 py-1 text-xs",
  }[size];

  const variantClasses = {
    default: "bg-zinc-800/80 text-zinc-300 border border-zinc-700/60",
    indigo: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/25",
    emerald: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25",
    amber: "bg-amber-500/10 text-amber-400 border border-amber-500/25",
    sky: "bg-sky-500/10 text-sky-400 border border-sky-500/25",
    zinc: "bg-zinc-900 text-zinc-400 border border-zinc-800",
    outline: "bg-transparent text-zinc-400 border border-zinc-800",
  }[variant];

  const dotColors = {
    default: "bg-zinc-400",
    indigo: "bg-indigo-400 animate-pulse",
    emerald: "bg-emerald-400 animate-pulse",
    amber: "bg-amber-400",
    sky: "bg-sky-400",
    zinc: "bg-zinc-500",
    outline: "bg-zinc-400",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-mono font-medium tracking-tight ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotColors}`} />}
      {children}
    </span>
  );
};
