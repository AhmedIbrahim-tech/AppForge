import React, { useState } from "react";
import { Sparkles, PackagePlus } from "lucide-react";
import type { FeatureDefinition, FeatureField } from "../types";
import { FeatureIdentitySection } from "./FeatureIdentitySection";
import { FieldsListSection } from "./FieldsListSection";
import { FieldEditorModal } from "./FieldEditorModal";
import { FeatureReviewPanel } from "./FeatureReviewPanel";

const DEFAULT_FEATURE: FeatureDefinition = {
  name: "Product",
  plural: "Products",
  mode: "fullstack",
  surface: "dashboard",
  featureType: "crud",
  permissions: true,
  localize: false,
  fields: [
    {
      kind: "scalar",
      name: "Name",
      type: "string",
      required: true,
      maxLength: 200,
    },
    {
      kind: "scalar",
      name: "Price",
      type: "decimal",
      required: true,
      minimum: 0,
      precision: 18,
      scale: 2,
    },
    {
      kind: "enum",
      name: "Status",
      enumName: "ProductStatus",
      values: ["Draft", "Active", "Archived"],
      required: true,
    },
    {
      kind: "relationship",
      name: "Category",
      target: "Category",
      relationshipType: "many-to-one",
      required: true,
      display: "Name",
      deleteBehavior: "restrict",
    },
  ],
};

export const FeatureBuilder: React.FC = () => {
  const [feature, setFeature] = useState<FeatureDefinition>(DEFAULT_FEATURE);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFieldIndex, setEditingFieldIndex] = useState<number | null>(null);

  const handleUpdateIdentity = (updated: Partial<FeatureDefinition>) => {
    setFeature((prev) => ({ ...prev, ...updated }));
  };

  const handleOpenAddField = () => {
    setEditingFieldIndex(null);
    setIsModalOpen(true);
  };

  const handleOpenEditField = (_field: FeatureField, index: number) => {
    setEditingFieldIndex(index);
    setIsModalOpen(true);
  };

  const handleSaveField = (savedField: FeatureField) => {
    setFeature((prev) => {
      const nextFields = [...prev.fields];
      if (editingFieldIndex !== null && editingFieldIndex >= 0) {
        nextFields[editingFieldIndex] = savedField;
      } else {
        nextFields.push(savedField);
      }
      return { ...prev, fields: nextFields };
    });
    setIsModalOpen(false);
    setEditingFieldIndex(null);
  };

  const handleRemoveField = (index: number) => {
    setFeature((prev) => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index),
    }));
  };

  const handleApplyPresetFields = (presetFields: FeatureField[]) => {
    setFeature((prev) => ({
      ...prev,
      fields: presetFields,
    }));
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Business Feature Generator · Flatron Ecosystem</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Feature Builder
        </h1>
        <p className="max-w-3xl text-sm text-zinc-400 leading-relaxed">
          Design business domain entities with scalar attributes, enums, relationships, and media.
          Compose exact commands for the Flatron CLI generator to scaffold full-stack Clean Architecture
          code into your project.
        </p>
      </div>

      {/* Workflow notice */}
      <div className="mt-6 flex flex-col gap-3 rounded-xl border border-white/[0.08] bg-[#11131a]/60 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <PackagePlus className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">
              Feature Workflow
            </div>
            <div className="text-xs text-zinc-400">
              1. Scaffold app <code className="rounded bg-black/40 px-1 py-0.5 text-indigo-300">flatron MyApp</code> → 2. Navigate <code className="rounded bg-black/40 px-1 py-0.5 text-indigo-300">cd MyApp</code> → 3. Generate feature <code className="rounded bg-black/40 px-1 py-0.5 text-indigo-300">flatron create feature {feature.name || "Product"}</code>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-xs text-zinc-400">
          <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-zinc-300">
            v4.0 Schema Engine
          </span>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Designer (7 cols on desktop) */}
        <div className="space-y-6 lg:col-span-7 xl:col-span-8">
          <FeatureIdentitySection
            feature={feature}
            onChange={handleUpdateIdentity}
          />
          <FieldsListSection
            fields={feature.fields}
            onAddField={handleOpenAddField}
            onEditField={handleOpenEditField}
            onRemoveField={handleRemoveField}
            onApplyPresetFields={handleApplyPresetFields}
          />
        </div>

        {/* Right: Inspector & CLI Command Preview (5 cols on desktop) */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-24">
            <FeatureReviewPanel feature={feature} />
          </div>
        </div>
      </div>

      {/* Field Editor Modal */}
      {isModalOpen && (
        <FieldEditorModal
          initialField={
            editingFieldIndex !== null ? feature.fields[editingFieldIndex] : undefined
          }
          onSave={handleSaveField}
          onClose={() => {
            setIsModalOpen(false);
            setEditingFieldIndex(null);
          }}
        />
      )}
    </div>
  );
};
