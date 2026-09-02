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
      className={`relative rounded-2xl border border-white/8 bg-[#11131c]/70 p-6 text-zinc-100 backdrop-blur-sm transition-all duration-300 ${
        hoverEffect
          ? "hover:border-white/14 hover:bg-[#141724]/90 hover:shadow-xl hover:shadow-indigo-500/5"
          : ""
      } ${glow ? "border-indigo-500/30 shadow-[0_0_30px_-5px_rgba(99,102,241,0.15)]" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
