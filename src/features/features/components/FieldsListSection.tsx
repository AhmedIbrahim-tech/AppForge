import React from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Type,
  ListOrdered,
  Link2,
  FileImage,
  AlignLeft,
} from "lucide-react";
import type { FeatureField } from "../types";

interface FieldsListSectionProps {
  fields: FeatureField[];
  onAddField: () => void;
  onEditField: (field: FeatureField, index: number) => void;
  onRemoveField: (index: number) => void;
  onApplyPresetFields: (preset: FeatureField[]) => void;
}

export const FieldsListSection: React.FC<FieldsListSectionProps> = ({
  fields,
  onAddField,
  onEditField,
  onRemoveField,
  onApplyPresetFields,
}) => {
  const renderFieldBadge = (field: FeatureField) => {
    switch (field.kind) {
      case "scalar":
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-surface-secondary px-2.5 py-1 font-mono text-[11px] text-text-secondary border border-border-subtle font-medium">
            <Type className="h-3 w-3 text-info" />
            {field.type}
          </span>
        );
      case "enum":
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-surface-secondary px-2.5 py-1 font-mono text-[11px] text-text-secondary border border-border-subtle font-medium">
            <ListOrdered className="h-3 w-3 text-warning" />
            enum {field.enumName}
          </span>
        );
      case "relationship":
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-surface-secondary px-2.5 py-1 font-mono text-[11px] text-text-secondary border border-border-subtle font-medium">
            <Link2 className="h-3 w-3 text-accent" />
            {field.relationshipType} → {field.target}
          </span>
        );
      case "media":
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-surface-secondary px-2.5 py-1 font-mono text-[11px] text-text-secondary border border-border-subtle font-medium">
            <FileImage className="h-3 w-3 text-success" />
            {field.mediaKind} ({field.cardinality})
          </span>
        );
      case "richText":
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-surface-secondary px-2.5 py-1 font-mono text-[11px] text-text-secondary border border-border-subtle font-medium">
            <AlignLeft className="h-3 w-3 text-info" />
            richText (Tiptap)
          </span>
        );
    }
  };

  const renderFieldDetails = (field: FeatureField) => {
    const details: string[] = [];
    if (field.required) details.push("required");
    else details.push("nullable");

    if (field.kind === "scalar") {
      if (field.type === "string") {
        if (field.minLength) details.push(`min ${field.minLength}`);
        if (field.maxLength) details.push(`max ${field.maxLength}`);
      } else if (field.kind === "scalar" && field.minimum !== undefined) {
        details.push(`min ${field.minimum}`);
      }
    } else if (field.kind === "enum") {
      details.push(field.values.join(" | "));
    } else if (field.kind === "relationship") {
      if (field.display) details.push(`display: ${field.display}`);
      if (field.deleteBehavior) details.push(`delete: ${field.deleteBehavior}`);
    } else if (field.kind === "media") {
      if (field.maxSize) details.push(`${Math.round(field.maxSize / 1048576)}MB max`);
    }

    return details.join(" · ");
  };

  const handleLoadSampleCatalog = () => {
    onApplyPresetFields([
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
    ]);
  };

  return (
    <div className="rounded-2xl border border-border-subtle bg-surface p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border-subtle pb-3.5">
        <div>
          <h2 className="font-heading text-sm font-bold text-text-primary">
            Entity Fields ({fields.length})
          </h2>
          <p className="mt-0.5 text-xs text-text-muted">
            Define attributes, data validation, relationships, enums, and media.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {fields.length === 0 && (
            <button
              type="button"
              onClick={handleLoadSampleCatalog}
              className="rounded-lg border border-border-subtle bg-surface-secondary px-3 py-1.5 text-xs font-semibold text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-all cursor-pointer shadow-xs"
            >
              <span>Load Sample</span>
            </button>
          )}

          <button
            type="button"
            onClick={onAddField}
            className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-accent-hover active:scale-[0.985] transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Field</span>
          </button>
        </div>
      </div>

      <div className="mt-3">
        {fields.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-main bg-surface-secondary/40 p-8 text-center my-3">
            <Type className="h-7 w-7 text-text-muted mb-2 opacity-50" />
            <p className="text-xs font-semibold text-text-secondary">No fields configured</p>
            <p className="mt-0.5 text-[11px] text-text-muted max-w-sm">
              Click &quot;Add Field&quot; or &quot;Load Sample&quot; to configure entity properties.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border-subtle">
            {fields.map((field, index) => (
              <div
                key={`${field.name}-${index}`}
                className="group flex items-center justify-between py-3 px-3 -mx-3 rounded-xl hover:bg-surface-secondary/70 transition-all animate-fade-in"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs font-bold text-text-primary">
                    {field.name}
                  </span>
                  {renderFieldBadge(field)}
                  <span className="text-xs text-text-muted hidden sm:inline truncate">
                    {renderFieldDetails(field)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 opacity-90 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => onEditField(field, index)}
                    className="rounded-lg p-1.5 text-text-muted hover:bg-surface-hover hover:text-text-primary transition-all cursor-pointer"
                    title="Edit field"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveField(index)}
                    className="rounded-lg p-1.5 text-text-muted hover:bg-danger/10 hover:text-danger transition-all cursor-pointer"
                    title="Remove field"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
