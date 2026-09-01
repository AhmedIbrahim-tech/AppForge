import { Hero } from "@/features/landing/components/Hero";
import { StackBuilderPreview } from "@/features/stack-builder/components/StackBuilderPreview";
import { WhyAppForge } from "@/features/landing/components/WhyAppForge";
import { HowItWorks } from "@/features/landing/components/HowItWorks";
import { CliInstallation } from "@/features/landing/components/CliInstallation";
import { FeatureGenerator } from "@/features/landing/components/FeatureGenerator";
import { Comparison } from "@/features/landing/components/Comparison";
import { FinalCta } from "@/features/landing/components/FinalCta";

export function HomePage() {
  return (
    <div className="flex w-full flex-col">
      <Hero />
      <StackBuilderPreview />
      <WhyAppForge />
      <HowItWorks />
      <CliInstallation />
      <FeatureGenerator />
      <Comparison />
      <FinalCta />
    </div>
  );
}
