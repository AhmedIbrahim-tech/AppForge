import React, { useState } from "react";
import {
  X,
  Plus,
  AlertCircle,
  Link2,
  FileImage,
  AlignLeft,
  ListOrdered,
  Type,
} from "lucide-react";
import type {
  FeatureField,
  FieldKind,
  ScalarFieldType,
  RelationshipType,
  DeleteBehavior,
  MediaKind,
  ScalarFieldConfig,
  EnumFieldConfig,
  RelationshipFieldConfig,
  MediaFieldConfig,
  RichTextFieldConfig,
} from "../types";

const SCALAR_TYPES: ScalarFieldType[] = [
  "string",
  "int",
  "long",
  "decimal",
  "double",
  "boolean",
  "Guid",
  "DateTime",
  "DateTimeOffset",
];

const RELATIONSHIP_TYPES: { value: RelationshipType; label: string; desc: string }[] = [
  { value: "many-to-one", label: "Many to One", desc: "e.g. Product belongs to Category" },
  { value: "one-to-many", label: "One to Many", desc: "e.g. Category has many Products" },
  { value: "many-to-many", label: "Many to Many", desc: "e.g. Product has many Tags" },
  { value: "one-to-one", label: "One to One", desc: "e.g. User has one Profile" },
];

const DELETE_BEHAVIORS: DeleteBehavior[] = ["restrict", "cascade", "set-null", "no-action"];

interface FieldEditorModalProps {
  initialField?: FeatureField;
  onSave: (field: FeatureField) => void;
  onClose: () => void;
}

export const FieldEditorModal: React.FC<FieldEditorModalProps> = ({
  initialField,
  onSave,
  onClose,
}) => {
  const [kind, setKind] = useState<FieldKind>(initialField?.kind || "scalar");
  const [name, setName] = useState(initialField?.name || "");
  const [required, setRequired] = useState(initialField?.required ?? true);

  // Scalar states
  const [scalarType, setScalarType] = useState<ScalarFieldType>(
    initialField?.kind === "scalar" ? initialField.type : "string",
  );
  const [minLength, setMinLength] = useState<string>(
    initialField?.kind === "scalar" && initialField.minLength !== undefined
      ? String(initialField.minLength)
      : "",
  );
  const [maxLength, setMaxLength] = useState<string>(
    initialField?.kind === "scalar" && initialField.maxLength !== undefined
      ? String(initialField.maxLength)
      : "",
  );
  const [numericMin, setNumericMin] = useState<string>(
    initialField?.kind === "scalar" && initialField.minimum !== undefined
      ? String(initialField.minimum)
      : "",
  );
  const [numericMax, setNumericMax] = useState<string>(
    initialField?.kind === "scalar" && initialField.maximum !== undefined
      ? String(initialField.maximum)
      : "",
  );
  const [precision, setPrecision] = useState<string>(
    initialField?.kind === "scalar" && initialField.precision !== undefined
      ? String(initialField.precision)
      : "18",
  );
  const [scale, setScale] = useState<string>(
    initialField?.kind === "scalar" && initialField.scale !== undefined
      ? String(initialField.scale)
      : "2",
  );

  // Enum states
  const [enumName, setEnumName] = useState(
    initialField?.kind === "enum" ? initialField.enumName : "",
  );
  const [enumValues, setEnumValues] = useState<string[]>(
    initialField?.kind === "enum" ? initialField.values : ["Draft", "Active", "Archived"],
  );
  const [newValueInput, setNewValueInput] = useState("");

  // Relationship states
  const [targetEntity, setTargetEntity] = useState(
    initialField?.kind === "relationship" ? initialField.target : "",
  );
  const [relType, setRelType] = useState<RelationshipType>(
    initialField?.kind === "relationship" ? initialField.relationshipType : "many-to-one",
  );
  const [displayField, setDisplayField] = useState(
    initialField?.kind === "relationship" ? initialField.display || "Name" : "Name",
  );
  const [deleteBehavior, setDeleteBehavior] = useState<DeleteBehavior>(
    initialField?.kind === "relationship"
      ? initialField.deleteBehavior || "restrict"
      : "restrict",
  );

  // Media states
  const [mediaKind, setMediaKind] = useState<MediaKind>(
    initialField?.kind === "media" ? initialField.mediaKind : "image",
  );
  const [cardinality, setCardinality] = useState<"single" | "multiple">(
    initialField?.kind === "media" ? initialField.cardinality : "single",
  );
  const [maxSizeMb, setMaxSizeMb] = useState<string>(
    initialField?.kind === "media" && initialField.maxSize
      ? String(initialField.maxSize / 1048576)
      : "5",
  );
  const [maxFiles, setMaxFiles] = useState<string>(
    initialField?.kind === "media" && initialField.maxFiles
      ? String(initialField.maxFiles)
      : "5",
  );

  const [error, setError] = useState<string | null>(null);

  const handleAddEnumValue = () => {
    const val = newValueInput.trim();
    if (!val) return;
    if (enumValues.includes(val)) {
      setError(`Enum value "${val}" already exists.`);
      return;
    }
    setEnumValues([...enumValues, val]);
    setNewValueInput("");
    setError(null);
  };

  const handleRemoveEnumValue = (idx: number) => {
    setEnumValues(enumValues.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      setError("Field name is required.");
      return;
    }
    if (!/^[A-Za-z_][A-Za-z0-9]*$/.test(cleanName)) {
      setError("Field name must be a valid C# identifier (e.g. ProductName, IsActive).");
      return;
    }

    if (kind === "scalar") {
      const field: ScalarFieldConfig = {
        kind: "scalar",
        name: cleanName,
        type: scalarType,
        required,
        ...(minLength ? { minLength: parseInt(minLength, 10) } : {}),
        ...(maxLength ? { maxLength: parseInt(maxLength, 10) } : {}),
        ...(numericMin ? { minimum: parseFloat(numericMin) } : {}),
        ...(numericMax ? { maximum: parseFloat(numericMax) } : {}),
        ...(scalarType === "decimal" && precision ? { precision: parseInt(precision, 10) } : {}),
        ...(scalarType === "decimal" && scale ? { scale: parseInt(scale, 10) } : {}),
      };
      onSave(field);
    } else if (kind === "enum") {
      const eName = enumName.trim() || `${cleanName}Status`;
      if (enumValues.length === 0) {
        setError("Enum must have at least one value.");
        return;
      }
      const field: EnumFieldConfig = {
        kind: "enum",
        name: cleanName,
        enumName: eName,
        values: enumValues,
        required,
      };
      onSave(field);
    } else if (kind === "relationship") {
      const target = targetEntity.trim();
      if (!target) {
        setError("Target entity name is required (e.g. Category, Customer).");
        return;
      }
      const field: RelationshipFieldConfig = {
        kind: "relationship",
        name: cleanName,
        target,
        relationshipType: relType,
        required,
        display: displayField.trim() || "Name",
        deleteBehavior,
      };
      onSave(field);
    } else if (kind === "media") {
      const bytes = (parseFloat(maxSizeMb) || 5) * 1048576;
      const field: MediaFieldConfig = {
        kind: "media",
        name: cleanName,
        mediaKind,
        cardinality,
        required,
        maxSize: bytes,
        ...(cardinality === "multiple" && maxFiles ? { maxFiles: parseInt(maxFiles, 10) } : {}),
      };
      onSave(field);
    } else if (kind === "richText") {
      const field: RichTextFieldConfig = {
        kind: "richText",
        name: cleanName,
        required,
      };
      onSave(field);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-lg rounded-lg border border-border bg-surface p-5 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-line pb-3">
          <h2 className="font-heading text-sm font-bold text-text-primary">
            {initialField ? "Edit Field" : "Add Feature Field"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-text-muted hover:bg-surface-raised hover:text-text-primary transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {error && (
          <div className="mt-3 flex items-center gap-2 rounded-md border border-danger/30 bg-danger/10 p-2.5 text-xs text-danger">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span className="font-body">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-3.5 space-y-3.5">
          {/* Field Kind Switcher */}
          <div>
            <label className="text-xs font-medium text-text-secondary">Field kind</label>
            <div className="mt-1.5 grid grid-cols-5 gap-1.5">
              {[
                { k: "scalar", label: "Scalar", icon: <Type className="h-3.5 w-3.5" /> },
                { k: "enum", label: "Enum", icon: <ListOrdered className="h-3.5 w-3.5" /> },
                { k: "relationship", label: "Relation", icon: <Link2 className="h-3.5 w-3.5" /> },
                { k: "media", label: "Media", icon: <FileImage className="h-3.5 w-3.5" /> },
                { k: "richText", label: "Rich Text", icon: <AlignLeft className="h-3.5 w-3.5" /> },
              ].map((item) => (
                <button
                  key={item.k}
                  type="button"
                  onClick={() => {
                    setKind(item.k as FieldKind);
                    setError(null);
                  }}
                  className={`flex flex-col items-center gap-1 rounded-md border p-2 text-[11px] font-medium transition-all cursor-pointer ${
                    kind === item.k
                      ? "border-accent bg-accent/10 text-text-primary shadow-sm"
                      : "border-border bg-surface-raised text-text-muted hover:text-text-primary hover:border-border-hover"
                  }`}
                >
                  {item.icon}
                  <span className="font-body">{item.label}</span>
                </button>
              ))}
            </div>
          </div>


          {/* Common: Name & Required */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-text-secondary">
                Field name (PascalCase)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Title, Price, Category"
                className="mt-1 w-full rounded-md border border-border bg-surface-raised px-3 py-1.5 font-mono text-xs text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
                required
              />
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 rounded-md border border-border bg-surface-raised px-3 py-2 text-xs text-text-secondary cursor-pointer hover:border-border-hover transition-colors">
                <input
                  type="checkbox"
                  checked={required}
                  onChange={(e) => setRequired(e.target.checked)}
                  className="rounded border-border text-accent focus:ring-accent accent-accent"
                />
                <span className="font-body">Required (Non-nullable)</span>
              </label>
            </div>
          </div>

          {/* Contextual Options based on Kind */}
          {kind === "scalar" && (
            <div className="space-y-3 rounded-md border border-border bg-surface-raised p-3">
              <div>
                <label className="text-xs font-medium text-text-secondary">Data type</label>
                <select
                  value={scalarType}
                  onChange={(e) => setScalarType(e.target.value as ScalarFieldType)}
                  className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-1.5 text-xs text-text-primary focus:border-accent focus:outline-none transition-colors"
                >
                  {SCALAR_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>


              {scalarType === "string" && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-zinc-400">Min length</label>
                    <input
                      type="number"
                      value={minLength}
                      onChange={(e) => setMinLength(e.target.value)}
                      placeholder="0"
                      className="mt-1 w-full rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-zinc-400">Max length</label>
                    <input
                      type="number"
                      value={maxLength}
                      onChange={(e) => setMaxLength(e.target.value)}
                      placeholder="200"
                      className="mt-1 w-full rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {scalarType === "decimal" && (
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <label className="text-[11px] text-zinc-400">Min</label>
                    <input
                      type="number"
                      value={numericMin}
                      onChange={(e) => setNumericMin(e.target.value)}
                      placeholder="0"
                      className="mt-1 w-full rounded-md border border-border bg-surface px-2 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-zinc-400">Max</label>
                    <input
                      type="number"
                      value={numericMax}
                      onChange={(e) => setNumericMax(e.target.value)}
                      placeholder="10000"
                      className="mt-1 w-full rounded-md border border-border bg-surface px-2 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-zinc-400">Precision</label>
                    <input
                      type="number"
                      value={precision}
                      onChange={(e) => setPrecision(e.target.value)}
                      placeholder="18"
                      className="mt-1 w-full rounded-md border border-border bg-surface px-2 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-zinc-400">Scale</label>
                    <input
                      type="number"
                      value={scale}
                      onChange={(e) => setScale(e.target.value)}
                      placeholder="2"
                      className="mt-1 w-full rounded-md border border-border bg-surface px-2 py-1 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {(scalarType === "int" || scalarType === "long" || scalarType === "double") && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-zinc-400">Min value</label>
                    <input
                      type="number"
                      value={numericMin}
                      onChange={(e) => setNumericMin(e.target.value)}
                      placeholder="e.g. 0"
                      className="mt-1 w-full rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-zinc-400">Max value</label>
                    <input
                      type="number"
                      value={numericMax}
                      onChange={(e) => setNumericMax(e.target.value)}
                      placeholder="e.g. 100"
                      className="mt-1 w-full rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-white"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {kind === "enum" && (
            <div className="space-y-3 rounded-md border border-border bg-surface-raised p-3">
              <div>
                <label className="text-xs font-medium text-zinc-300">Enum class name</label>
                <input
                  type="text"
                  value={enumName}
                  onChange={(e) => setEnumName(e.target.value)}
                  placeholder={`e.g. ${name || "Product"}Status`}
                  className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300">Enum values</label>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {enumValues.map((val, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded bg-accent/10 border border-accent/20 px-2 py-0.5 font-mono text-xs text-accent-hover"
                    >
                      {val}
                      <button
                        type="button"
                        onClick={() => handleRemoveEnumValue(idx)}
                        className="text-zinc-400 hover:text-white"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="mt-2 flex gap-1.5">
                  <input
                    type="text"
                    value={newValueInput}
                    onChange={(e) => setNewValueInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddEnumValue();
                      }
                    }}
                    placeholder="Add value (e.g. Pending, Completed)"
                    className="flex-1 rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddEnumValue}
                    className="flex items-center gap-1 rounded-md bg-surface-strong border border-border px-3 py-1.5 text-xs font-medium text-white hover:bg-surface hover:border-zinc-600 transition-colors cursor-pointer"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {kind === "relationship" && (
            <div className="space-y-3 rounded-md border border-border bg-surface-raised p-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-zinc-300">Target entity</label>
                  <input
                    type="text"
                    value={targetEntity}
                    onChange={(e) => setTargetEntity(e.target.value)}
                    placeholder="e.g. Category, User"
                    className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-xs text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-300">Display property</label>
                  <input
                    type="text"
                    value={displayField}
                    onChange={(e) => setDisplayField(e.target.value)}
                    placeholder="e.g. Name, Title"
                    className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300">Relationship type</label>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  {RELATIONSHIP_TYPES.map((rt) => (
                    <button
                      key={rt.value}
                      type="button"
                      onClick={() => setRelType(rt.value)}
                      className={`flex flex-col rounded-md border p-2 text-left text-xs transition-colors cursor-pointer ${
                        relType === rt.value
                          ? "border-accent bg-accent/10 text-white"
                          : "border-border bg-surface text-zinc-400 hover:text-white hover:border-zinc-700"
                      }`}
                    >
                      <span className="font-semibold text-white">{rt.label}</span>
                      <span className="text-[10px] text-zinc-500">{rt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300">On delete behavior</label>
                <select
                  value={deleteBehavior}
                  onChange={(e) => setDeleteBehavior(e.target.value as DeleteBehavior)}
                  className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-1.5 text-xs text-white"
                >
                  {DELETE_BEHAVIORS.map((db) => (
                    <option key={db} value={db}>
                      {db} {db === "restrict" ? "(default)" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {kind === "media" && (
            <div className="space-y-3 rounded-md border border-border bg-surface-raised p-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-zinc-300">Media kind</label>
                  <select
                    value={mediaKind}
                    onChange={(e) => setMediaKind(e.target.value as MediaKind)}
                    className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-1.5 text-xs text-white"
                  >
                    <option value="image">Image (jpg, png, webp)</option>
                    <option value="file">File (pdf, docx, any)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-300">Cardinality</label>
                  <select
                    value={cardinality}
                    onChange={(e) => setCardinality(e.target.value as "single" | "multiple")}
                    className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-1.5 text-xs text-white"
                  >
                    <option value="single">Single File</option>
                    <option value="multiple">Multiple Files</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-zinc-300">Max size (MB)</label>
                  <input
                    type="number"
                    value={maxSizeMb}
                    onChange={(e) => setMaxSizeMb(e.target.value)}
                    placeholder="5"
                    className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-1.5 text-xs text-white"
                  />
                </div>
                {cardinality === "multiple" && (
                  <div>
                    <label className="text-xs font-medium text-zinc-300">Max files count</label>
                    <input
                      type="number"
                      value={maxFiles}
                      onChange={(e) => setMaxFiles(e.target.value)}
                      placeholder="8"
                      className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {kind === "richText" && (
            <div className="rounded-md border border-border bg-surface-raised p-3 text-xs text-text-secondary">
              <span className="font-semibold text-text-primary">Note on rich text:</span> Rich-text
              fields store structured JSON documents with Tiptap editor support.
              Ensure your project has the <strong className="font-mono text-accent">rich-text</strong> module
              installed from the Module Explorer.
            </div>
          )}

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-2 border-t border-border-line pt-3.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-3 py-1.5 text-xs font-medium text-text-muted hover:bg-surface-raised hover:text-text-primary transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-accent px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-accent-hover active:scale-[0.985] transition-all cursor-pointer"
            >
              {initialField ? "Update Field" : "Add Field"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

