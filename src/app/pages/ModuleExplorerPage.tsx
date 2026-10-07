import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ModuleExplorer } from "@/features/modules/components/ModuleExplorer";

export const ModuleExplorerPage: React.FC = () => {
  return (
    <div className="relative min-h-screen py-8 animate-fade-in-up">
      <div className="app-container">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Visual Stack Builder</span>
          </Link>
        </div>

        <ModuleExplorer />
      </div>
    </div>
  );
};


