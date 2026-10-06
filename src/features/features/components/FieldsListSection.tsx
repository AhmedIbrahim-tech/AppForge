import {
  Plus,
  Trash2,
  Edit2,
  Type,
  ListOrdered,
  Link2,
  FileImage,
  AlignLeft,
  Sparkles,
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
          <span className="flex items-center gap-1 rounded bg-indigo-500/15 px-2 py-0.5 font-mono text-[11px] text-indigo-300">
            <Type className="h-3 w-3" />
            {field.type}
          </span>
        );
      case "enum":
        return (
          <span className="flex items-center gap-1 rounded bg-purple-500/15 px-2 py-0.5 font-mono text-[11px] text-purple-300">
            <ListOrdered className="h-3 w-3" />
            enum {field.enumName}
          </span>
        );
      case "relationship":
        return (
          <span className="flex items-center gap-1 rounded bg-emerald-500/15 px-2 py-0.5 font-mono text-[11px] text-emerald-300">
            <Link2 className="h-3 w-3" />
            {field.relationshipType} → {field.target}
          </span>
        );
      case "media":
        return (
          <span className="flex items-center gap-1 rounded bg-amber-500/15 px-2 py-0.5 font-mono text-[11px] text-amber-300">
            <FileImage className="h-3 w-3" />
            {field.mediaKind} ({field.cardinality})
          </span>
        );
      case "richText":
        return (
          <span className="flex items-center gap-1 rounded bg-rose-500/15 px-2 py-0.5 font-mono text-[11px] text-rose-300">
            <AlignLeft className="h-3 w-3" />
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
    <div className="rounded-xl border border-white/[0.08] bg-[#11131a] p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.06] pb-3">
        <div>
          <h2 className="text-sm font-semibold text-white">Entity Fields Designer</h2>
          <p className="text-xs text-zinc-400">
            Define attributes, data validation, relationships, enums, and media attachments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {fields.length === 0 && (
            <button
              type="button"
              onClick={handleLoadSampleCatalog}
              className="flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1.5 text-xs font-medium text-indigo-300 hover:bg-indigo-500/20"
            >
              <Sparkles className="h-3 w-3" />
              <span>Load Product Sample</span>
            </button>
          )}

          <button
            type="button"
            onClick={onAddField}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-indigo-500"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Field</span>
          </button>
        </div>
      </div>

      <div className="mt-4">
        {fields.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.1] bg-[#0c0d14] p-8 text-center">
            <Type className="h-8 w-8 text-zinc-600 mb-2" />
            <p className="text-xs font-medium text-zinc-300">No fields added yet</p>
            <p className="mt-1 text-[11px] text-zinc-500 max-w-sm">
              Click &quot;Add Field&quot; to design scalar properties, enums, relationships, or media, or click &quot;Load Product Sample&quot; for instant presets.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-[#0c0d14] p-3 transition-colors hover:border-white/[0.12]"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-white">
                    {field.name}
                  </span>
                  {renderFieldBadge(field)}
                  <span className="text-xs text-zinc-400 hidden sm:inline">
                    {renderFieldDetails(field)}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onEditField(field, index)}
                    className="rounded p-1.5 text-zinc-400 hover:bg-white/[0.08] hover:text-white"
                    title="Edit field"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveField(index)}
                    className="rounded p-1.5 text-zinc-400 hover:bg-red-500/10 hover:text-red-400"
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
