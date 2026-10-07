import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={`rounded-[8px] border border-border-subtle bg-surface p-5 text-text-primary transition-colors duration-150 ${
        hoverEffect ? "hover:border-zinc-700 hover:bg-surface-secondary" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

