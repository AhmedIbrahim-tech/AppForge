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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-border-subtle bg-surface p-6 shadow-modal max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-subtle pb-3.5">
          <div>
            <h2 className="font-heading text-base font-bold text-text-primary">
              {initialField ? "Edit Field Definition" : "Add Feature Field"}
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              Configure attribute data types, rules, and relationships.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-text-muted hover:bg-surface-secondary hover:text-text-primary transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-danger/30 bg-danger/10 p-3 text-xs text-danger shadow-xs">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span className="font-sans">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Field Kind Switcher */}
          <div>
            <label className="text-xs font-semibold text-text-secondary">Field Kind</label>
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
                  className={`flex flex-col items-center gap-1.5 rounded-xl border p-2.5 text-[11px] font-semibold transition-all cursor-pointer ${
                    kind === item.k
                      ? "border-accent/80 bg-accent-subtle text-text-primary shadow-xs ring-1 ring-accent/30"
                      : "border-border-subtle bg-surface-secondary text-text-muted hover:text-text-primary hover:bg-surface-hover hover:border-border-hover"
                  }`}
                >
                  <span className={kind === item.k ? "text-accent" : "text-text-muted"}>
                    {item.icon}
                  </span>
                  <span className="font-heading">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Common: Name & Required */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-text-secondary">
                Field Name (PascalCase) <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Title, Price, Category"
                className="mt-1.5 w-full rounded-lg border border-border-subtle bg-surface-secondary px-3.5 py-2 font-mono text-xs text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none focus:bg-surface transition-all"
                required
              />
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2.5 rounded-lg border border-border-subtle bg-surface-secondary px-3.5 py-2 text-xs text-text-secondary cursor-pointer hover:border-border-hover hover:bg-surface-hover transition-all">
                <input
                  type="checkbox"
                  checked={required}
                  onChange={(e) => setRequired(e.target.checked)}
                  className="h-4 w-4 rounded border-border-main text-accent focus:ring-accent/30 accent-accent"
                />
                <span className="font-semibold text-text-primary font-heading">Required (Non-nullable)</span>
              </label>
            </div>
          </div>

          {/* Contextual Options based on Kind */}
          {kind === "scalar" && (
            <div className="space-y-3.5 rounded-xl border border-border-subtle bg-surface-secondary/70 p-4">
              <div>
                <label className="text-xs font-semibold text-text-secondary">Data Type</label>
                <select
                  value={scalarType}
                  onChange={(e) => setScalarType(e.target.value as ScalarFieldType)}
                  className="mt-1.5 w-full rounded-lg border border-border-subtle bg-surface px-3.5 py-2 text-xs text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none transition-all"
                >
                  {SCALAR_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {scalarType === "string" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-text-muted">Min Length</label>
                    <input
                      type="number"
                      value={minLength}
                      onChange={(e) => setMinLength(e.target.value)}
                      placeholder="0"
                      className="mt-1 w-full rounded-lg border border-border-subtle bg-surface px-3 py-1.5 text-xs text-text-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-text-muted">Max Length</label>
                    <input
                      type="number"
                      value={maxLength}
                      onChange={(e) => setMaxLength(e.target.value)}
                      placeholder="200"
                      className="mt-1 w-full rounded-lg border border-border-subtle bg-surface px-3 py-1.5 text-xs text-text-primary"
                    />
                  </div>
                </div>
              )}

              {scalarType === "decimal" && (
                <div className="grid grid-cols-4 gap-2.5">
                  <div>
                    <label className="text-xs text-text-muted">Min</label>
                    <input
                      type="number"
                      value={numericMin}
                      onChange={(e) => setNumericMin(e.target.value)}
                      placeholder="0"
                      className="mt-1 w-full rounded-lg border border-border-subtle bg-surface px-2.5 py-1.5 text-xs text-text-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-text-muted">Max</label>
                    <input
                      type="number"
                      value={numericMax}
                      onChange={(e) => setNumericMax(e.target.value)}
                      placeholder="10000"
                      className="mt-1 w-full rounded-lg border border-border-subtle bg-surface px-2.5 py-1.5 text-xs text-text-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-text-muted">Precision</label>
                    <input
                      type="number"
                      value={precision}
                      onChange={(e) => setPrecision(e.target.value)}
                      placeholder="18"
                      className="mt-1 w-full rounded-lg border border-border-subtle bg-surface px-2.5 py-1.5 text-xs text-text-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-text-muted">Scale</label>
                    <input
                      type="number"
                      value={scale}
                      onChange={(e) => setScale(e.target.value)}
                      placeholder="2"
                      className="mt-1 w-full rounded-lg border border-border-subtle bg-surface px-2.5 py-1.5 text-xs text-text-primary"
                    />
                  </div>
                </div>
              )}

              {(scalarType === "int" || scalarType === "long" || scalarType === "double") && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-text-muted">Min Value</label>
                    <input
                      type="number"
                      value={numericMin}
                      onChange={(e) => setNumericMin(e.target.value)}
                      placeholder="e.g. 0"
                      className="mt-1 w-full rounded-lg border border-border-subtle bg-surface px-3 py-1.5 text-xs text-text-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-text-muted">Max Value</label>
                    <input
                      type="number"
                      value={numericMax}
                      onChange={(e) => setNumericMax(e.target.value)}
                      placeholder="e.g. 100"
                      className="mt-1 w-full rounded-lg border border-border-subtle bg-surface px-3 py-1.5 text-xs text-text-primary"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {kind === "enum" && (
            <div className="space-y-3.5 rounded-xl border border-border-subtle bg-surface-secondary/70 p-4">
              <div>
                <label className="text-xs font-semibold text-text-secondary">Enum Class Name</label>
                <input
                  type="text"
                  value={enumName}
                  onChange={(e) => setEnumName(e.target.value)}
                  placeholder={`e.g. ${name || "Product"}Status`}
                  className="mt-1.5 w-full rounded-lg border border-border-subtle bg-surface px-3.5 py-2 font-mono text-xs text-text-primary"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-text-secondary">Enum Values</label>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {enumValues.map((val, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-accent-subtle border border-accent-border px-2.5 py-1 font-mono text-xs text-accent-text font-medium"
                    >
                      {val}
                      <button
                        type="button"
                        onClick={() => handleRemoveEnumValue(idx)}
                        className="text-text-muted hover:text-danger transition-colors cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="mt-3 flex gap-2">
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
                    className="flex-1 rounded-lg border border-border-subtle bg-surface px-3.5 py-1.5 font-mono text-xs text-text-primary"
                  />
                  <button
                    type="button"
                    onClick={handleAddEnumValue}
                    className="flex items-center gap-1 rounded-lg bg-surface-secondary border border-border-subtle px-3.5 py-1.5 text-xs font-semibold text-text-primary hover:bg-surface-hover transition-all cursor-pointer shadow-xs"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {kind === "relationship" && (
            <div className="space-y-3.5 rounded-xl border border-border-subtle bg-surface-secondary/70 p-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-text-secondary">Target Entity</label>
                  <input
                    type="text"
                    value={targetEntity}
                    onChange={(e) => setTargetEntity(e.target.value)}
                    placeholder="e.g. Category, User"
                    className="mt-1.5 w-full rounded-lg border border-border-subtle bg-surface px-3.5 py-2 font-mono text-xs text-text-primary"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-secondary">Display Property</label>
                  <input
                    type="text"
                    value={displayField}
                    onChange={(e) => setDisplayField(e.target.value)}
                    placeholder="e.g. Name, Title"
                    className="mt-1.5 w-full rounded-lg border border-border-subtle bg-surface px-3.5 py-2 font-mono text-xs text-text-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-text-secondary">Relationship Type</label>
                <div className="mt-2 grid grid-cols-2 gap-2.5">
                  {RELATIONSHIP_TYPES.map((rt) => (
                    <button
                      key={rt.value}
                      type="button"
                      onClick={() => setRelType(rt.value)}
                      className={`flex flex-col rounded-xl border p-2.5 text-left text-xs transition-all cursor-pointer ${
                        relType === rt.value
                          ? "border-accent/80 bg-accent-subtle text-text-primary ring-1 ring-accent/30 shadow-xs"
                          : "border-border-subtle bg-surface text-text-secondary hover:border-border-hover hover:bg-surface-hover"
                      }`}
                    >
                      <span className="font-bold text-text-primary font-heading">{rt.label}</span>
                      <span className="text-[10px] text-text-muted font-mono">{rt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-text-secondary">On Delete Behavior</label>
                <select
                  value={deleteBehavior}
                  onChange={(e) => setDeleteBehavior(e.target.value as DeleteBehavior)}
                  className="mt-1.5 w-full rounded-lg border border-border-subtle bg-surface px-3.5 py-2 text-xs text-text-primary"
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
            <div className="space-y-3.5 rounded-xl border border-border-subtle bg-surface-secondary/70 p-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-text-secondary">Media Kind</label>
                  <select
                    value={mediaKind}
                    onChange={(e) => setMediaKind(e.target.value as MediaKind)}
                    className="mt-1.5 w-full rounded-lg border border-border-subtle bg-surface px-3.5 py-2 text-xs text-text-primary"
                  >
                    <option value="image">Image (jpg, png, webp)</option>
                    <option value="file">File (pdf, docx, any)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-secondary">Cardinality</label>
                  <select
                    value={cardinality}
                    onChange={(e) => setCardinality(e.target.value as "single" | "multiple")}
                    className="mt-1.5 w-full rounded-lg border border-border-subtle bg-surface px-3.5 py-2 text-xs text-text-primary"
                  >
                    <option value="single">Single File</option>
                    <option value="multiple">Multiple Files</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-text-secondary">Max Size (MB)</label>
                  <input
                    type="number"
                    value={maxSizeMb}
                    onChange={(e) => setMaxSizeMb(e.target.value)}
                    placeholder="5"
                    className="mt-1.5 w-full rounded-lg border border-border-subtle bg-surface px-3.5 py-2 text-xs text-text-primary"
                  />
                </div>
                {cardinality === "multiple" && (
                  <div>
                    <label className="text-xs font-semibold text-text-secondary">Max Files Count</label>
                    <input
                      type="number"
                      value={maxFiles}
                      onChange={(e) => setMaxFiles(e.target.value)}
                      placeholder="8"
                      className="mt-1.5 w-full rounded-lg border border-border-subtle bg-surface px-3.5 py-2 text-xs text-text-primary"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {kind === "richText" && (
            <div className="rounded-xl border border-border-subtle bg-surface-secondary/70 p-4 text-xs text-text-secondary leading-relaxed">
              <span className="font-bold text-text-primary">Note on Rich Text:</span> Rich-text
              fields store structured JSON documents with Tiptap editor support.
              Ensure your project has the <strong className="font-mono text-accent">rich-text</strong> module
              installed from the Module Explorer.
            </div>
          )}

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-border-subtle pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-xs font-semibold text-text-muted hover:bg-surface-secondary hover:text-text-primary transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-accent px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-accent-hover active:scale-[0.985] transition-all cursor-pointer"
            >
              {initialField ? "Update Field" : "Add Field"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
