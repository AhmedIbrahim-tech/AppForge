import React, { useState, useMemo } from "react";
import { Search, Filter, Boxes } from "lucide-react";
import { MODULE_LIST, MODULE_CATEGORIES } from "../modules-data";
import type { ModuleCategory, ModuleDefinition } from "../types";
import { ModuleCard } from "./ModuleCard";
import { ModuleDetailsPanel } from "./ModuleDetailsPanel";

export const ModuleExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ModuleCategory | "All">("All");
  const [selectedModule, setSelectedModule] = useState<ModuleDefinition>(MODULE_LIST[0]);

  const filteredModules = useMemo(() => {
    return MODULE_LIST.filter((mod) => {
      const matchesSearch =
        mod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || mod.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full space-y-6">
      {/* Intro Header */}
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3 py-1 font-mono text-xs font-medium text-text-secondary shadow-xs mb-2">
          <Boxes className="h-3.5 w-3.5 text-accent" />
          <span>Module Catalog</span>
        </div>
        <h1 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          Application Module Explorer
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
          Browse and install ready-made enterprise modules with pre-wired C# persistence, handlers, API endpoints, and admin UI views.
        </p>
      </div>

      {/* Integrated Search & Filter Toolbar */}
      <div className="rounded-2xl border border-border-subtle bg-surface p-4 shadow-card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search modules by name, id, or feature..."
            className="w-full rounded-xl border border-border-subtle bg-surface-secondary py-2 pl-10 pr-3.5 text-xs text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none focus:bg-surface transition-all"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === "All"
                ? "bg-accent text-white shadow-xs"
                : "bg-surface-secondary border border-border-subtle text-text-secondary hover:text-text-primary hover:bg-surface-hover hover:border-border-hover"
            }`}
          >
            All
          </button>
          {MODULE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-accent text-white shadow-xs"
                  : "bg-surface-secondary border border-border-subtle text-text-secondary hover:text-text-primary hover:bg-surface-hover hover:border-border-hover"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Layout (66% catalog / 34% inspector rail) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        {/* Left: Module Cards Catalog */}
        <div className="lg:col-span-8">
          {filteredModules.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-main bg-surface p-12 text-center shadow-xs">
              <Filter className="h-8 w-8 text-text-muted mb-3 opacity-50" />
              <p className="text-sm font-bold text-text-primary font-heading">No modules match your filter</p>
              <p className="mt-1 text-xs text-text-muted">Try adjusting your search query or selecting &quot;All&quot; categories.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {filteredModules.map((mod) => (
                <ModuleCard
                  key={mod.id}
                  module={mod}
                  isSelected={selectedModule?.id === mod.id}
                  onSelect={(m) => setSelectedModule(m)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right: Selected Module Details Inspector */}
        <div className="lg:sticky lg:top-20 lg:col-span-4">
          {selectedModule ? (
            <ModuleDetailsPanel module={selectedModule} />
          ) : (
            <div className="rounded-2xl border border-border-subtle bg-surface p-6 text-center text-xs text-text-muted shadow-xs">
              Select a module from the catalog to inspect details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
