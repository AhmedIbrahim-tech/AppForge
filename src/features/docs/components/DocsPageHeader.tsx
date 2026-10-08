import React from "react";
import { Badge } from "@/shared/components/ui/Badge";

export interface DocsPageHeaderProps {
  title: string;
  description: string;
  section: string;
}

export const DocsPageHeader: React.FC<DocsPageHeaderProps> = ({
  title,
  description,
  section,
}) => {
  return (
    <header className="mb-8 border-b border-border-subtle pb-6">
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="info" size="sm">
          {section}
        </Badge>
        <span className="text-text-muted text-xs">·</span>
        <span className="font-mono text-xs text-text-muted">Documentation</span>
      </div>
      <h1 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed font-sans">
        {description}
      </p>
    </header>
  );
};
