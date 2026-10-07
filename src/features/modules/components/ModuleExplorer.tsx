import React, { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
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
    <div className="w-full">
      {/* Intro Header */}
      <div className="max-w-2xl mb-6">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          Application Module Explorer
        </h1>
        <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
          Add ready-made application capabilities to an existing Flatron project.
        </p>
      </div>

      {/* Integrated Search & Filter Toolbar */}
      <div className="rounded-lg border border-border bg-surface p-3 mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search modules by name, id, or feature..."
            className="w-full rounded-md border border-border bg-surface-raised py-1.5 pl-8 pr-3 text-xs text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            className={`rounded px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === "All"
                ? "bg-accent text-white font-semibold shadow-sm"
                : "bg-surface-raised border border-border text-text-muted hover:text-text-primary hover:border-border-hover"
            }`}
          >
            All
          </button>
          {MODULE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-accent text-white font-semibold shadow-sm"
                  : "bg-surface-raised border border-border text-text-muted hover:text-text-primary hover:border-border-hover"
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
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface p-12 text-center">
              <Filter className="h-6 w-6 text-text-muted mb-2 opacity-50" />
              <p className="text-xs font-medium text-text-secondary">No modules match your filter</p>
              <p className="mt-0.5 text-[11px] text-text-muted">Try adjusting your search query or selecting &quot;All&quot; categories.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
            <div className="rounded-lg border border-border bg-surface p-6 text-center text-xs text-text-muted">
              Select a module from the catalog to inspect details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


