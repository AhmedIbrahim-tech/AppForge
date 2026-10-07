import React, { useState } from "react";
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
      <div className="max-w-2xl mb-6">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          Business Feature Builder
        </h1>
        <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
          Define fields, relationships, enums, and media for a new feature.
        </p>
      </div>

      {/* Main 2-Column Grid (66% editor / 34% review) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        {/* Left: Designer */}
        <div className="space-y-4 lg:col-span-8">
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

        {/* Right: Inspector & CLI Command Preview */}
        <div className="lg:sticky lg:top-20 lg:col-span-4">
          <FeatureReviewPanel feature={feature} />
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


