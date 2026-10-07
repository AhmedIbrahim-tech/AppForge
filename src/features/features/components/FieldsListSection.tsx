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
          <span className="inline-flex items-center gap-1 rounded bg-surface-raised px-2 py-0.5 font-mono text-[11px] text-text-secondary border border-border-line">
            <Type className="h-3 w-3 text-text-muted" />
            {field.type}
          </span>
        );
      case "enum":
        return (
          <span className="inline-flex items-center gap-1 rounded bg-surface-raised px-2 py-0.5 font-mono text-[11px] text-text-secondary border border-border-line">
            <ListOrdered className="h-3 w-3 text-text-muted" />
            enum {field.enumName}
          </span>
        );
      case "relationship":
        return (
          <span className="inline-flex items-center gap-1 rounded bg-surface-raised px-2 py-0.5 font-mono text-[11px] text-text-secondary border border-border-line">
            <Link2 className="h-3 w-3 text-text-muted" />
            {field.relationshipType} → {field.target}
          </span>
        );
      case "media":
        return (
          <span className="inline-flex items-center gap-1 rounded bg-surface-raised px-2 py-0.5 font-mono text-[11px] text-text-secondary border border-border-line">
            <FileImage className="h-3 w-3 text-text-muted" />
            {field.mediaKind} ({field.cardinality})
          </span>
        );
      case "richText":
        return (
          <span className="inline-flex items-center gap-1 rounded bg-surface-raised px-2 py-0.5 font-mono text-[11px] text-text-secondary border border-border-line">
            <AlignLeft className="h-3 w-3 text-text-muted" />
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
    <div className="rounded-lg border border-border bg-surface p-4 sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border-line pb-3">
        <div>
          <h2 className="font-heading text-sm font-semibold text-text-primary">
            Entity fields ({fields.length})
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
              className="rounded-md border border-border bg-surface-raised px-2.5 py-1.5 text-xs font-medium text-text-secondary hover:bg-surface-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              <span>Load sample</span>
            </button>
          )}

          <button
            type="button"
            onClick={onAddField}
            className="flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-accent-hover active:scale-[0.985] transition-all cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add field</span>
          </button>
        </div>
      </div>

      <div className="mt-2">
        {fields.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-border bg-surface-secondary/40 p-8 text-center my-3">
            <Type className="h-6 w-6 text-text-muted mb-2 opacity-50" />
            <p className="text-xs font-medium text-text-secondary">No fields configured</p>
            <p className="mt-0.5 text-[11px] text-text-muted max-w-sm">
              Click &quot;Add field&quot; or &quot;Load sample&quot; to configure entity properties.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border-line/60">
            {fields.map((field, index) => (
              <div
                key={`${field.name}-${index}`}
                className="group flex items-center justify-between py-2.5 px-2.5 -mx-2.5 rounded-md hover:bg-surface-raised/80 transition-colors animate-fade-in"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs font-semibold text-text-primary">
                    {field.name}
                  </span>
                  {renderFieldBadge(field)}
                  <span className="text-xs text-text-muted hidden sm:inline truncate">
                    {renderFieldDetails(field)}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => onEditField(field, index)}
                    className="rounded p-1.5 text-text-muted hover:bg-surface-secondary hover:text-text-primary transition-colors cursor-pointer"
                    title="Edit field"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveField(index)}
                    className="rounded p-1.5 text-text-muted hover:bg-danger/10 hover:text-danger transition-colors cursor-pointer"
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


