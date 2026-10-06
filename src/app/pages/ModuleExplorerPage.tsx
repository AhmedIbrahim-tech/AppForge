import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ModuleExplorer } from "@/features/modules/components/ModuleExplorer";

export const ModuleExplorerPage: React.FC = () => {
  return (
    <div className="relative min-h-screen py-10">
      {/* Background patterns */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-40" />

      <div className="relative mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        <ModuleExplorer />
      </div>
    </div>
  );
};
