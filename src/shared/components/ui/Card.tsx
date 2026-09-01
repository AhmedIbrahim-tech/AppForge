import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  glow = false,
  hoverEffect = true,
  ...props
}) => {
  return (
    <div
      className={`relative rounded-2xl border border-zinc-800/80 bg-[#11131c]/70 backdrop-blur-sm p-6 text-zinc-100 transition-all duration-300 ${
        hoverEffect
          ? "hover:border-zinc-700/90 hover:bg-[#141724]/90 hover:shadow-xl hover:shadow-indigo-500/5"
          : ""
      } ${glow ? "border-indigo-500/30 shadow-[0_0_30px_-5px_rgba(99,102,241,0.15)]" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
