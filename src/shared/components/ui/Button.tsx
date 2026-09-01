import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "left",
      disabled,
      ...props
    },
    ref,
  ) => {
    const sizeClasses = {
      sm: "px-3 py-1.5 text-xs font-medium gap-1.5 rounded-lg",
      md: "px-4 py-2.5 text-sm font-medium gap-2 rounded-xl",
      lg: "px-6 py-3.5 text-base font-semibold gap-2.5 rounded-xl",
    }[size];

    const variantClasses = {
      primary:
        "bg-zinc-100 text-zinc-950 hover:bg-white active:bg-zinc-200 border border-transparent shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-200",
      secondary:
        "bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-white border border-zinc-800 active:bg-zinc-850 transition-all duration-200",
      outline:
        "bg-transparent text-zinc-300 hover:text-white hover:bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all duration-200",
      ghost:
        "bg-transparent text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 border border-transparent transition-all duration-200",
      gradient:
        "bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500 text-white hover:opacity-95 shadow-[0_0_25px_rgba(99,102,241,0.35)] active:scale-[0.98] transition-all duration-200",
    }[variant];

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`inline-flex items-center justify-center cursor-pointer select-none transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${sizeClasses} ${variantClasses} ${className}`}
        {...props}
      >
        {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
        {children}
        {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
      </button>
    );
  },
);

Button.displayName = "Button";
