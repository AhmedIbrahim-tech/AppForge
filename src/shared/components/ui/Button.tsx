import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "info" | "danger";
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
      sm: "px-3 py-1.5 text-xs font-medium gap-1.5 rounded-lg min-h-[32px]",
      md: "px-3.5 py-2 text-xs font-semibold gap-2 rounded-lg min-h-[38px]",
      lg: "px-5 py-2.5 text-sm font-semibold gap-2 rounded-xl min-h-[44px]",
    }[size];

    const variantClasses = {
      primary:
        "bg-accent text-white hover:bg-accent-hover active:scale-[0.985] border border-accent/90 shadow-sm transition-all duration-150",
      secondary:
        "bg-surface-secondary text-text-primary hover:bg-surface-hover hover:border-border-hover active:scale-[0.985] border border-border-subtle shadow-sm transition-all duration-150",
      outline:
        "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-secondary hover:border-border-main border border-border-subtle transition-all duration-150",
      ghost:
        "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-secondary border border-transparent transition-all duration-150",
      info:
        "bg-info/10 text-info hover:bg-info/20 active:scale-[0.985] border border-info/30 transition-all duration-150",
      danger:
        "bg-danger/10 text-danger hover:bg-danger/20 active:scale-[0.985] border border-danger/30 transition-all duration-150",
    }[variant];

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`inline-flex items-center justify-center cursor-pointer select-none font-heading disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${sizeClasses} ${variantClasses} ${className}`}
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
