import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  variant?: "default" | "elevated" | "secondary" | "dashed";
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverEffect = false,
  variant = "default",
  ...props
}) => {
  const variantClasses = {
    default: "bg-surface border-border-subtle shadow-sm",
    elevated: "bg-surface-raised border-border-subtle shadow-md",
    secondary: "bg-surface-secondary border-border-subtle",
    dashed: "bg-surface-secondary/40 border-dashed border-border-main",
  }[variant];

  return (
    <div
      className={`rounded-xl border p-5 text-text-primary transition-all duration-150 ${variantClasses} ${
        hoverEffect ? "hover:border-border-hover hover:shadow-md" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
