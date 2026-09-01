import React from "react";
import { Loader2 } from "lucide-react";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  text,
  className = "",
  ...props
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }[size];

  return (
    <div
      className={`flex items-center justify-center gap-2.5 text-zinc-400 ${className}`}
      {...props}
    >
      <Loader2 className={`animate-spin text-indigo-400 ${sizeClasses}`} />
      {text && <span className="text-xs font-mono">{text}</span>}
    </div>
  );
};
