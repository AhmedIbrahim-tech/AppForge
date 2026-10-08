import React from "react";
import { DocsPageHeader } from "../components/DocsPageHeader";
import { DocsToc } from "../components/DocsToc";
import { DocsCallout } from "../components/DocsCallout";
import { DocsNextPrevious } from "../components/DocsNextPrevious";
import { DOC_PAGES } from "../docs-data";
import { CodeBlock } from "@/shared/components/ui/CodeBlock";
import { Tag } from "lucide-react";

export const FeatureBuilderDocPage: React.FC = () => {
  const meta = DOC_PAGES["feature-builder"];

  return (
    <div className="flex items-start gap-8 w-full">
      <div className="flex-1 min-w-0">
        <DocsPageHeader
          title={meta.title}
          description={meta.description}
          section={meta.section}
        />

        {/* Section 1: What is a Feature? */}
        <section id="what-is-a-feature" className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            What is a Feature?
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            In Flatron, a <strong>Feature</strong> represents a core business entity or domain capability specific to your application's domain model.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {["Product", "Order", "Customer", "Invoice", "Employee", "Warehouse", "Project", "Contract"].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-surface px-3 py-1 font-mono text-xs text-text-primary shadow-xs"
              >
                <Tag className="h-3 w-3 text-accent" />
                <span>{item}</span>
              </span>
            ))}
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            When you generate a feature, Flatron creates the entire vertical slice: C# domain entities, EF Core configurations, MediatR CQRS commands/queries, FluentValidation schemas, controller endpoints, and frontend TypeScript tables and dialogs.
          </p>
        </section>

        {/* Section 2: Configurable Capabilities */}
        <section id="configurable-capabilities" className="mt-10 space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            Configurable Capabilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-border-subtle bg-surface p-4">
              <div className="font-heading font-bold text-text-primary mb-1">Target Surface</div>
              <div className="text-text-muted">Full-stack (both), Backend-only, or Frontend-only views.</div>
            </div>
            <div className="rounded-xl border border-border-subtle bg-surface p-4">
              <div className="font-heading font-bold text-text-primary mb-1">Feature Type &amp; CRUD</div>
              <div className="text-text-muted">Full CRUD or Read-Only with toggleable Create, Update, Delete, and Restore operations.</div>
            </div>
            <div className="rounded-xl border border-border-subtle bg-surface p-4">
              <div className="font-heading font-bold text-text-primary mb-1">Search &amp; Pagination</div>
              <div className="text-text-muted">Paginated list queries with keyword search filters and sort orders.</div>
            </div>
            <div className="rounded-xl border border-border-subtle bg-surface p-4">
              <div className="font-heading font-bold text-text-primary mb-1">Security &amp; Labels</div>
              <div className="text-text-muted">Fine-grained permission policies and bilingual singular/plural labels (English &amp; Arabic).</div>
            </div>
          </div>
        </section>

        {/* Section 3: Field Types and Rules */}
        <section id="field-types-and-rules" className="mt-10 space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            Supported Field Types &amp; Rules
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border-subtle bg-surface shadow-xs mt-3">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border-subtle bg-surface-secondary text-text-muted font-mono uppercase tracking-wider">
                <tr>
                  <th className="p-3">Field Kind</th>
                  <th className="p-3">Supported Types</th>
                  <th className="p-3">Validation &amp; Options</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle text-text-secondary">
                <tr>
                  <td className="p-3 font-semibold text-text-primary font-heading">Scalar</td>
                  <td className="p-3 font-mono">string, int, long, decimal, double, bool, datetime, guid</td>
                  <td className="p-3">Required/optional, min/max length, min/max value, decimal precision/scale</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-text-primary font-heading">Enum</td>
                  <td className="p-3 font-mono">Custom Enum</td>
                  <td className="p-3">Custom enum type name and pipe-separated values (e.g. <code className="font-mono text-accent">Active|Draft|Archived</code>)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-text-primary font-heading">Relationship</td>
                  <td className="p-3 font-mono">many-to-one, one-to-many, many-to-many</td>
                  <td className="p-3">Target entity name, display property, cascade/restrict delete behaviors</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-text-primary font-heading">Media</td>
                  <td className="p-3 font-mono">image, pdf, document</td>
                  <td className="p-3">Single or multiple files, max file size in MB, max attachments limit</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-text-primary font-heading">Rich Text</td>
                  <td className="p-3 font-mono">richText (Tiptap JSON)</td>
                  <td className="p-3">Formatted WYSIWYG documents with structured JSON storage</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Concrete Example: Product */}
        <section id="concrete-example" className="mt-10 space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            Concrete Example: Product Feature
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Consider a typical e-commerce <code className="font-mono text-xs text-accent">Product</code> entity with fields:
          </p>

          <div className="rounded-xl border border-border-subtle bg-surface p-4 shadow-xs font-mono text-xs space-y-1.5 text-text-secondary">
            <div className="text-text-primary font-bold">Product (Entity)</div>
            <div className="pl-4">├── Name: string (required, max=100)</div>
            <div className="pl-4">├── Price: decimal (required, precision=18, scale=2, min=0)</div>
            <div className="pl-4">├── Status: enum ProductStatus (Active | Draft | Archived)</div>
            <div className="pl-4">└── Category: relationship (Target: Category, Type: many-to-one)</div>
          </div>
        </section>

        {/* Section 5: CLI Generation */}
        <section id="cli-generation" className="mt-10 space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            CLI Command Format
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            The Feature Builder automatically compiles the exact non-interactive CLI flags consumed by the Flatron generator:
          </p>

          <CodeBlock
            code={`flatron create feature Product --yes \\
  --field "Name:string:required:max=100" \\
  --field "Price:decimal:required:min=0" \\
  --field "Status:enum:name=ProductStatus:values=Active|Draft|Archived:required" \\
  --field "Category:relationship:target=Category:type=many-to-one:required:display=Name"`}
            language="bash"
            filename="Terminal"
          />

          <DocsCallout type="tip" title="Interactive Generation">
            You can also run <code className="font-mono text-xs text-accent">flatron create feature Product</code> to use the step-by-step terminal prompt wizard.
          </DocsCallout>
        </section>

        <DocsNextPrevious previous={meta.previous} next={meta.next} />
      </div>

      <DocsToc items={meta.toc} />
    </div>
  );
};
