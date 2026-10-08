import React from "react";
import { ManualSetupComparison } from "@/features/landing/components/ManualSetupComparison";
import { ExtendYourProjectSection } from "@/features/extend/components/ExtendYourProjectSection";

export const WhyFlatronPage: React.FC = () => {
  return (
    <div className="w-full animate-fade-in-up">
      <ManualSetupComparison />
      <ExtendYourProjectSection />
    </div>
  );
};
