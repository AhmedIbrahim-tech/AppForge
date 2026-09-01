import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Terminal, AlertCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";

export const NotFoundPage: React.FC = () => {
  return (
    <section className="relative min-h-[calc(100vh-4rem-14rem)] flex items-center justify-center py-20 overflow-hidden">
      {/* Ambient glows and grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-[500px] rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-xl px-4 text-center">
        {/* Eyebrow badge */}
        <Badge variant="indigo" dot size="md" className="mb-4">
          Error 404
        </Badge>

        {/* Large 404 Display */}
        <h1 className="font-mono text-7xl font-extrabold tracking-tight text-white sm:text-8xl">
          40
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            4
          </span>
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Page not found
        </h2>

        {/* Short Description */}
        <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
          The architecture blueprint, route, or page you are looking for does not
          exist or has been moved to another location.
        </p>

        {/* Terminal snippet box */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-[#0d0e17] px-3.5 py-2 font-mono text-xs text-zinc-400 shadow-lg">
            <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
            <span>HTTP 404: Resource_Not_Found</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/">
            <Button
              size="md"
              variant="gradient"
              icon={<ArrowLeft className="h-4 w-4" />}
            >
              Back to Home
            </Button>
          </Link>
          <a href="/#builder">
            <Button
              size="md"
              variant="outline"
              icon={<Terminal className="h-4 w-4" />}
            >
              Open Builder
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
