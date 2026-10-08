import React from "react";
import { DocsPageHeader } from "../components/DocsPageHeader";
import { DocsToc } from "../components/DocsToc";
import { DocsCallout } from "../components/DocsCallout";
import { DocsNextPrevious } from "../components/DocsNextPrevious";
import { DOC_PAGES } from "../docs-data";
import { Workflow, Boxes } from "lucide-react";

export const FeatureVsModulePage: React.FC = () => {
  const meta = DOC_PAGES["feature-vs-module"];

  return (
    <div className="flex items-start gap-8 w-full">
      <div className="flex-1 min-w-0">
        <DocsPageHeader
          title={meta.title}
          description={meta.description}
          section={meta.section}
        />

        {/* Section 1: The Core Mental Model */}
        <section id="the-core-mental-model" className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            The Core Mental Model
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            When expanding your Flatron application, deciding between a <strong>Feature</strong> and a <strong>Module</strong> comes down to a single distinction:
          </p>

          {/* Emphasized Core Questions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            {/* Feature Box */}
            <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6 shadow-xs">
              <div className="flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-wider text-accent mb-2">
                <Workflow className="h-4 w-4" />
                <span>Feature</span>
              </div>
              <div className="font-heading text-base sm:text-lg font-bold text-text-primary">
                "What does my business do?"
              </div>
              <p className="mt-2 text-xs text-text-secondary leading-relaxed">
                A domain-specific entity unique to your organization or product rules (e.g., <em>Product</em>, <em>Invoice</em>, <em>Patient</em>, <em>Booking</em>).
              </p>
            </div>

            {/* Module Box */}
            <div className="rounded-2xl border border-info/30 bg-info/5 p-6 shadow-xs">
              <div className="flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-wider text-info mb-2">
                <Boxes className="h-4 w-4" />
                <span>Module</span>
              </div>
              <div className="font-heading text-base sm:text-lg font-bold text-text-primary">
                "What reusable capability does my application need?"
              </div>
              <p className="mt-2 text-xs text-text-secondary leading-relaxed">
                A horizontal application infrastructure capability that can be reused across any project (e.g., <em>Authentication</em>, <em>Audit Trail</em>, <em>Notifications</em>).
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Comparison Matrix */}
        <section id="comparison-matrix" className="mt-10 space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            Comparison Matrix
          </h2>

          <div className="overflow-x-auto rounded-xl border border-border-subtle bg-surface shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border-subtle bg-surface-secondary text-text-muted font-mono uppercase tracking-wider">
                <tr>
                  <th className="p-3">Attribute</th>
                  <th className="p-3 text-accent font-bold">Feature</th>
                  <th className="p-3 text-info font-bold">Module</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle text-text-secondary">
                <tr>
                  <td className="p-3 font-semibold text-text-primary font-heading">Primary Purpose</td>
                  <td className="p-3">Domain business entity modeling</td>
                  <td className="p-3">Cross-cutting application capabilities</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-text-primary font-heading">Scope</td>
                  <td className="p-3">Specific to single business model</td>
                  <td className="p-3">Global / shared horizontal infrastructure</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-text-primary font-heading">Reusability</td>
                  <td className="p-3">Custom to your domain</td>
                  <td className="p-3">Reusable across different applications</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-text-primary font-heading">CLI Command</td>
                  <td className="p-3 font-mono text-accent">flatron create feature &lt;Name&gt;</td>
                  <td className="p-3 font-mono text-info">flatron create module &lt;name&gt;</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-text-primary font-heading">Generated Code</td>
                  <td className="p-3">Entity, CQRS Handlers, DTOs, CRUD Dialogs</td>
                  <td className="p-3">Middleware, Interceptors, Seeders, Shells</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-text-primary font-heading">Typical Examples</td>
                  <td className="p-3 font-mono">Product, Order, Customer, Invoice</td>
                  <td className="p-3 font-mono">auth, users, permissions, audit, notifications</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Decision Guide */}
        <section id="decision-guide" className="mt-10 space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            Decision Guide: Feature or Module?
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Quickly test your requirement with these common scenarios:
          </p>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between rounded-xl border border-border-subtle bg-surface p-3.5">
              <span className="text-text-secondary font-medium">"I need to store and manage Products with price, SKU, and categories."</span>
              <span className="rounded-md bg-accent/15 px-2.5 py-1 font-mono font-bold text-accent shrink-0">
                → Feature
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border-subtle bg-surface p-3.5">
              <span className="text-text-secondary font-medium">"I need user login, JWT tokens, and password hashing."</span>
              <span className="rounded-md bg-info/15 px-2.5 py-1 font-mono font-bold text-info shrink-0">
                → Module (auth)
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border-subtle bg-surface p-3.5">
              <span className="text-text-secondary font-medium">"I need to track who changed what entity for compliance."</span>
              <span className="rounded-md bg-info/15 px-2.5 py-1 font-mono font-bold text-info shrink-0">
                → Module (audit)
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border-subtle bg-surface p-3.5">
              <span className="text-text-secondary font-medium">"I need to manage Customer support tickets."</span>
              <span className="rounded-md bg-accent/15 px-2.5 py-1 font-mono font-bold text-accent shrink-0">
                → Feature
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border-subtle bg-surface p-3.5">
              <span className="text-text-secondary font-medium">"I need in-app bell notifications dispatched to users."</span>
              <span className="rounded-md bg-info/15 px-2.5 py-1 font-mono font-bold text-info shrink-0">
                → Module (notifications)
              </span>
            </div>
          </div>
        </section>

        {/* Section 4: Real-World Architecture Example */}
        <section id="real-world-example" className="mt-10 space-y-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            Real-World Architecture Example
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            In a complete e-commerce solution, Features and Modules work in harmony:
          </p>

          <div className="rounded-xl border border-border-subtle bg-surface p-5 shadow-xs font-mono text-xs space-y-3">
            <div>
              <span className="text-accent font-bold">Domain Features:</span>
              <div className="text-text-secondary pl-4 mt-1">
                ├── Product &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-text-muted">(Catalog &amp; Inventory)</span><br />
                ├── Category &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-text-muted">(Taxonomy)</span><br />
                ├── Order &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-text-muted">(Checkout &amp; Fulfillment)</span><br />
                └── Customer &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-text-muted">(CRM)</span>
              </div>
            </div>

            <div className="border-t border-border-subtle pt-3">
              <span className="text-info font-bold">Installed Modules:</span>
              <div className="text-text-secondary pl-4 mt-1">
                ├── auth &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-text-muted">(Identity &amp; JWT Access)</span><br />
                ├── permissions &nbsp;&nbsp;&nbsp;<span className="text-text-muted">(Admin / Manager / Buyer Policies)</span><br />
                ├── audit &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-text-muted">(Order Change Logging)</span><br />
                └── notifications &nbsp;<span className="text-text-muted">(Order Status Alerts)</span>
              </div>
            </div>
          </div>

          <DocsCallout type="tip" title="Best Practice">
            Start with the core <strong>Modules</strong> your application requires for baseline security and auditability, then use <strong>Feature Builder</strong> to scaffold your specific business entities.
          </DocsCallout>
        </section>

        <DocsNextPrevious previous={meta.previous} next={meta.next} />
      </div>

      <DocsToc items={meta.toc} />
    </div>
  );
};
