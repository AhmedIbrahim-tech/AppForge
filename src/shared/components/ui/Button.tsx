import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
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
      sm: "px-2.5 py-1.5 text-xs font-medium gap-1.5 rounded-[6px]",
      md: "px-3.5 py-2 text-xs font-medium gap-2 rounded-[7px]",
      lg: "px-5 py-2.5 text-sm font-semibold gap-2 rounded-[7px]",
    }[size];

    const variantClasses = {
      primary:
        "bg-accent text-white hover:bg-accent-hover active:scale-[0.985] border border-accent transition-colors duration-150 shadow-sm",
      secondary:
        "bg-surface-secondary text-text-primary hover:bg-surface-raised hover:border-zinc-700 active:scale-[0.985] border border-border-subtle transition-colors duration-150",
      outline:
        "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-secondary hover:border-zinc-700 border border-border-subtle transition-colors duration-150",
      ghost:
        "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-secondary border border-transparent transition-colors duration-150",
    }[variant];

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`inline-flex items-center justify-center cursor-pointer select-none font-heading disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${sizeClasses} ${variantClasses} ${className}`}
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

