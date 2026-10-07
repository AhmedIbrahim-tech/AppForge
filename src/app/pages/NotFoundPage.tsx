import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Terminal, AlertCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

export const NotFoundPage: React.FC = () => {
  return (
    <section className="relative min-h-[calc(100vh-4rem-14rem)] flex items-center justify-center py-20 overflow-hidden animate-fade-in-up">
      <div className="relative mx-auto max-w-md px-4 text-center">
        {/* Large 404 Display */}
        <div className="font-mono text-6xl font-bold tracking-tight text-accent sm:text-7xl">
          404
        </div>

        {/* Heading */}
        <h1 className="mt-4 font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          Page not found
        </h1>

        {/* Short Description */}
        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
          The requested page or route does not exist.
        </p>

        {/* Status box */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text-muted">
            <AlertCircle className="h-3.5 w-3.5 text-warning shrink-0" />
            <span>HTTP 404 · Route not found</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link to="/">
            <Button
              size="md"
              variant="primary"
              icon={<ArrowLeft className="h-4 w-4" />}
            >
              Back to Home
            </Button>
          </Link>
          <a href="/#builder">
            <Button
              size="md"
              variant="secondary"
              icon={<Terminal className="h-4 w-4" />}
            >
              Visual Builder
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};


