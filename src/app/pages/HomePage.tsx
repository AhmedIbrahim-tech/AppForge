import { Hero } from "@/features/landing/components/Hero";
import { StackBuilderPreview } from "@/features/stack-builder/components/StackBuilderPreview";
import { ExtendYourProjectSection } from "@/features/extend/components/ExtendYourProjectSection";
import { ManualSetupComparison } from "@/features/landing/components/ManualSetupComparison";

export function HomePage() {
  return (
    <div className="flex w-full flex-col">
      <Hero />
      <StackBuilderPreview />
      <ExtendYourProjectSection />
      <ManualSetupComparison />
    </div>
  );
}
