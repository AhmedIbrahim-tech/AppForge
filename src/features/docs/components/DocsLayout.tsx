import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { DocsSidebar } from "./DocsSidebar";
import { Menu, X, BookOpen } from "lucide-react";

export const DocsLayout: React.FC = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="relative min-h-[calc(100vh-3.5rem-8rem)] bg-base">
      {/* Mobile/Tablet Subheader with Docs Navigation Trigger */}
      <div className="sticky top-14 z-30 flex items-center justify-between border-b border-border-subtle bg-surface/95 px-4 py-2.5 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-2 text-xs font-semibold text-text-primary font-heading">
          <BookOpen className="h-4 w-4 text-accent" />
          <span>Flatron Documentation</span>
        </div>
        <button
          type="button"
          onClick={() => setMobileNavOpen((prev) => !prev)}
          className="flex items-center gap-1.5 rounded-lg border border-border-subtle bg-surface-secondary px-2.5 py-1 text-xs font-medium text-text-secondary hover:text-text-primary cursor-pointer"
          aria-label="Toggle Documentation Navigation"
        >
          {mobileNavOpen ? (
            <>
              <X className="h-3.5 w-3.5" />
              <span>Close</span>
            </>
          ) : (
            <>
              <Menu className="h-3.5 w-3.5" />
              <span>Docs Menu</span>
            </>
          )}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileNavOpen && (
        <div className="border-b border-border-subtle bg-surface p-4 shadow-lg lg:hidden animate-fade-in">
          <DocsSidebar onItemClick={() => setMobileNavOpen(false)} />
        </div>
      )}

      {/* Main 3-Column Layout Container */}
      <div className="app-container py-8 lg:py-10">
        <div className="flex items-start gap-8 lg:gap-12">
          {/* LEFT: Desktop Sticky Sidebar */}
          <aside className="sticky top-20 hidden lg:block w-64 shrink-0 overflow-y-auto max-h-[calc(100vh-6rem)] pr-2">
            <DocsSidebar />
          </aside>

          {/* CENTER: Main Documentation Article (Takes full available width) */}
          <main className="min-w-0 flex-1 w-full">
            <article className="w-full animate-fade-in-up">
              <Outlet />
            </article>
          </main>
        </div>
      </div>
    </div>
  );
};
