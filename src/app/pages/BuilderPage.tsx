import React from "react";
import { StackBuilderPreview } from "@/features/stack-builder/components/StackBuilderPreview";

export const BuilderPage: React.FC = () => {
  return (
    <div className="w-full animate-fade-in-up">
      <StackBuilderPreview />
    </div>
  );
};
