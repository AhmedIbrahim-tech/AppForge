import React, { useState, useMemo } from "react";
import { Search, Sparkles, Filter, PackageCheck } from "lucide-react";
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
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Application Modules · Flatron Ecosystem</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Module Explorer
        </h1>
        <p className="max-w-3xl text-sm text-zinc-400 leading-relaxed">
          Discover and install pre-architected modules into your existing Flatron projects.
          Each module integrates clean domain layers, persistence entities, service registrations,
          and frontend UI components.
        </p>
      </div>

      {/* Workflow Guidance Card */}
      <div className="mt-6 flex flex-col gap-3 rounded-xl border border-white/[0.08] bg-[#11131a]/60 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <PackageCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">
              Installation Flow
            </div>
            <div className="text-xs text-zinc-400">
              1. Scaffold project <code className="rounded bg-black/40 px-1 py-0.5 text-indigo-300">flatron MyApp</code> → 2. Navigate <code className="rounded bg-black/40 px-1 py-0.5 text-indigo-300">cd MyApp</code> → 3. Install <code className="rounded bg-black/40 px-1 py-0.5 text-indigo-300">flatron create module &lt;name&gt;</code>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-xs text-zinc-400">
          <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-zinc-300">
            {MODULE_LIST.length} Modules Available
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search modules by name, keyword, or id..."
            className="w-full rounded-xl border border-white/[0.08] bg-[#11131a] py-2 pl-9 pr-4 text-xs text-white placeholder-zinc-500 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              selectedCategory === "All"
                ? "bg-indigo-600 text-white shadow-sm"
                : "border border-white/[0.08] bg-[#11131a] text-zinc-400 hover:text-white"
            }`}
          >
            All
          </button>
          {MODULE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "border border-white/[0.08] bg-[#11131a] text-zinc-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Module Cards Grid (7 cols on desktop) */}
        <div className="lg:col-span-7 xl:col-span-8">
          {filteredModules.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-white/[0.08] bg-[#11131a] p-12 text-center">
              <Filter className="h-8 w-8 text-zinc-600 mb-2" />
              <p className="text-sm font-medium text-zinc-300">No modules match your criteria</p>
              <p className="mt-1 text-xs text-zinc-500">Try adjusting your search query or category filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-3">
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

        {/* Right: Selected Module Details Panel (5 cols on desktop) */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-24">
            {selectedModule ? (
              <ModuleDetailsPanel module={selectedModule} />
            ) : (
              <div className="rounded-xl border border-white/[0.08] bg-[#11131a] p-6 text-center text-xs text-zinc-500">
                Select a module to view installation commands and architectural details.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
