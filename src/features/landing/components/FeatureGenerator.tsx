import React, { useState } from "react";
import {
  Cpu,
  Server,
  Layout,
  Terminal,
  CheckCircle2,
  Settings2,
  Workflow,
  Code2,
} from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { CodeBlock } from "@/shared/components/ui/CodeBlock";

export const FeatureGenerator: React.FC = () => {
  const [backendPattern, setBackendPattern] = useState<"cqrs" | "services">("cqrs");
  const [frontendFramework, setFrontendFramework] = useState<"react" | "angular">("react");
  const [activeTab, setActiveTab] = useState<"step1" | "step2" | "step3">("step2");

  // Sample code blocks demonstrating architecture awareness
  const backendCqrsCode = `// src/backend/MyStore.Application/Features/Products/Commands/CreateProduct/CreateProductCommand.cs
namespace MyStore.Application.Features.Products.Commands;

// CQRS Command with MediatR & Result Pattern
public record CreateProductCommand(string Name, decimal Price, string Sku) 
    : IRequest<Result<ProductDto>>;

public class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
{
    public CreateProductCommandValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Price).GreaterThan(0);
        RuleFor(x => x.Sku).NotEmpty().MaximumLength(50);
    }
}

public class CreateProductCommandHandler(IAppDbContext context, ILogger<CreateProductCommandHandler> logger) 
    : IRequestHandler<CreateProductCommand, Result<ProductDto>>
{
    public async Task<Result<ProductDto>> Handle(CreateProductCommand request, CancellationToken ct)
    {
        var product = Product.Create(request.Name, request.Price, request.Sku);
        context.Products.Add(product);
        await context.SaveChangesAsync(ct);
        return Result<ProductDto>.Success(product.ToDto());
    }
}`;

  const backendServiceCode = `// src/backend/MyStore.Application/Services/ProductService.cs
namespace MyStore.Application.Services;

// Clean Application Service Architecture
public class ProductService(IProductRepository repository, IUnitOfWork unitOfWork) 
    : IProductService
{
    public async Task<Result<ProductDto>> CreateAsync(CreateProductInput input, CancellationToken ct)
    {
        var product = Product.Create(input.Name, input.Price, input.Sku);
        await repository.AddAsync(product, ct);
        await unitOfWork.SaveChangesAsync(ct);
        return Result<ProductDto>.Success(product.ToDto());
    }

    public async Task<IEnumerable<ProductDto>> GetAllAsync(CancellationToken ct)
    {
        var products = await repository.GetAllAsync(ct);
        return products.Select(p => p.ToDto());
    }
}`;

  const frontendReactCode = `// src/frontend/src/modules/products/services/product.service.ts
import { apiClient } from "@/services/api-client";
import type { ProductDto, CreateProductInput } from "../types/product.types";

export const productService = {
  getAll: () => apiClient.get<ProductDto[]>("/api/products"),
  getById: (id: string) => apiClient.get<ProductDto>(\`/api/products/\${id}\`),
  create: (input: CreateProductInput) => apiClient.post<ProductDto>("/api/products", input),
  delete: (id: string) => apiClient.delete(\`/api/products/\${id}\`),
};`;

  const frontendAngularCode = `// src/frontend/src/app/features/products/services/product.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDto, CreateProductInput } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = '/api/products';

  getAll(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(this.apiUrl);
  }

  create(input: CreateProductInput): Observable<ProductDto> {
    return this.http.post<ProductDto>(this.apiUrl, input);
  }
}`;

  return (
    <section id="feature-generator" className="relative py-24 border-t border-zinc-850 bg-[#090a0f]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="emerald" dot size="md">
            Product Evolution
          </Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl font-sans">
            Generate Features, Not Just Projects
          </h2>
          <p className="mt-4 text-base text-zinc-400 leading-relaxed sm:text-lg">
            After building your initial application foundation, AppForge enables on-demand scaffolding of complete end-to-end vertical features as your product scales — saving hours of boilerplate plumbing per domain entity.
          </p>

          {/* Command execution badge */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-zinc-800 bg-[#0c0e18] px-5 py-3 text-xs sm:text-sm font-mono text-zinc-200 shadow-2xl backdrop-blur-md">
            <Terminal className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
            <span className="text-emerald-400 font-semibold">$</span>
            <span>create-fullstack-feature Product</span>
          </div>
        </div>

        {/* 3-Step Visual Workflow Timeline */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Step 1 Card */}
          <div
            onClick={() => setActiveTab("step1")}
            className={`group relative flex flex-col justify-between rounded-2xl border p-6 transition-all cursor-pointer ${
              activeTab === "step1"
                ? "border-indigo-500/80 bg-[#0f111c] shadow-[0_0_30px_rgba(99,102,241,0.15)]"
                : "border-zinc-800/80 bg-[#0c0d16]/70 hover:border-zinc-700"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono text-xs font-bold">
                  01
                </span>
                <Badge variant="indigo" size="sm">
                  Domain Input
                </Badge>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Cpu className="h-4.5 w-4.5 text-indigo-400" />
                <span>Step 1: Define Entity</span>
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Specify entity name and properties. AppForge creates the core domain entity, value objects, and domain events.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Domain Model</span>
              <span className="text-indigo-400 font-semibold">Product.cs</span>
            </div>
          </div>

          {/* Step 2 Card */}
          <div
            onClick={() => setActiveTab("step2")}
            className={`group relative flex flex-col justify-between rounded-2xl border p-6 transition-all cursor-pointer ${
              activeTab === "step2"
                ? "border-emerald-500/80 bg-[#0f111c] shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                : "border-zinc-800/80 bg-[#0c0d16]/70 hover:border-zinc-700"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-xs font-bold">
                  02
                </span>
                <Badge variant="emerald" size="sm">
                  Backend Stack
                </Badge>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Server className="h-4.5 w-4.5 text-emerald-400" />
                <span>Step 2: Generate Backend</span>
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Generates CQRS handlers or Services, FluentValidation rules, EF Core / Dapper mappings, and REST API endpoints.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>CQRS or Services</span>
              <span className="text-emerald-400 font-semibold">API + Handlers</span>
            </div>
          </div>

          {/* Step 3 Card */}
          <div
            onClick={() => setActiveTab("step3")}
            className={`group relative flex flex-col justify-between rounded-2xl border p-6 transition-all cursor-pointer ${
              activeTab === "step3"
                ? "border-purple-500/80 bg-[#0f111c] shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                : "border-zinc-800/80 bg-[#0c0d16]/70 hover:border-zinc-700"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono text-xs font-bold">
                  03
                </span>
                <Badge variant="sky" size="sm">
                  Frontend Slice
                </Badge>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Layout className="h-4.5 w-4.5 text-purple-400" />
                <span>Step 3: Generate Frontend</span>
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Scaffolds typed API clients, state store hooks (Zustand/NgRx), form schemas, and responsive UI page views.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>React or Angular</span>
              <span className="text-purple-400 font-semibold">UI + Services</span>
            </div>
          </div>
        </div>

        {/* Interactive Architecture & Code Explorer */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Visual Tree & Architecture Matrix */}
          <div className="space-y-6 lg:col-span-5">
            {/* Visual Tree Preview */}
            <div className="rounded-2xl border border-zinc-800/90 bg-[#0d0f17] p-5 shadow-2xl">
              <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <Workflow className="h-4 w-4 text-emerald-400" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-200">
                    Generated Vertical Slice
                  </span>
                </div>
                <Badge variant="emerald" size="sm">Product</Badge>
              </div>

              {/* Exact Product Output Tree */}
              <div className="p-4 rounded-xl bg-[#090a10] border border-zinc-800 font-mono text-xs text-zinc-200 space-y-1.5 leading-relaxed">
                <div className="text-emerald-400 font-bold flex items-center gap-2">
                  <span>📁 Product/</span>
                  <span className="text-[10px] text-zinc-500 font-normal">// Vertical Slice</span>
                </div>
                <div className="pl-4 text-indigo-400">
                  ├── 📁 Domain/{" "}
                  <span className="text-zinc-500 text-[10px]">// Entities, Enums & Events</span>
                </div>
                <div className="pl-4 text-emerald-400">
                  ├── 📁 Application/{" "}
                  <span className="text-zinc-500 text-[10px]">
                    // {backendPattern === "cqrs" ? "CQRS Commands & Queries" : "Application Services"}
                  </span>
                </div>
                <div className="pl-4 text-cyan-400">
                  ├── 📁 Infrastructure/{" "}
                  <span className="text-zinc-500 text-[10px]">// EF Core / Dapper Repositories</span>
                </div>
                <div className="pl-4 text-amber-400">
                  ├── 📁 API/{" "}
                  <span className="text-zinc-500 text-[10px]">// Controllers & OpenAPI Specs</span>
                </div>
                <div className="pl-4 text-purple-400">
                  └── 📁 Frontend/{" "}
                  <span className="text-zinc-500 text-[10px]">
                    // {frontendFramework === "react" ? "React + Zustand + UI" : "Angular + NgRx + UI"}
                  </span>
                </div>
              </div>
            </div>

            {/* Architecture Awareness Rules Card */}
            <div className="rounded-2xl border border-zinc-800/90 bg-[#0d0f17] p-5 shadow-2xl space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-zinc-200 border-b border-zinc-800 pb-3">
                <Settings2 className="h-4 w-4 text-indigo-400" />
                <span>Architecture-Aware Adaptation</span>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                Features automatically inspect your project's <code className="text-indigo-300 font-mono">.fullstack-app.json</code> manifest and generate code matching your exact architectural decisions:
              </p>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex items-center justify-between rounded-xl bg-zinc-900/60 p-3 border border-zinc-800">
                  <span className="text-zinc-400">Backend Pattern:</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setBackendPattern("cqrs")}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                        backendPattern === "cqrs"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      CQRS + MediatR
                    </button>
                    <button
                      onClick={() => setBackendPattern("services")}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                        backendPattern === "services"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      Services
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-zinc-900/60 p-3 border border-zinc-800">
                  <span className="text-zinc-400">Frontend Stack:</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setFrontendFramework("react")}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                        frontendFramework === "react"
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                          : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      React
                    </button>
                    <button
                      onClick={() => setFrontendFramework("angular")}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                        frontendFramework === "angular"
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                          : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      Angular
                    </button>
                  </div>
                </div>

                <div className="rounded-xl bg-zinc-900/60 p-3 border border-zinc-800 space-y-1.5 text-[11px]">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Configured ORM (EF Core / Dapper)</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Authentication setup (JWT / Identity)</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Configured State (Zustand / Redux / NgRx)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Code & Architecture Preview Tabs */}
          <div className="space-y-4 lg:col-span-7">
            <div className="rounded-2xl border border-zinc-800/90 bg-[#0d0f17] p-6 shadow-2xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-emerald-400" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    Generated Code Preview
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <Badge variant="emerald" size="sm">
                    {backendPattern === "cqrs" ? "CQRS Handlers" : "Services"}
                  </Badge>
                  <Badge variant="indigo" size="sm">
                    {frontendFramework === "react" ? "React Services" : "Angular Services"}
                  </Badge>
                </div>
              </div>

              {/* Backend Generated Code */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <Server className="h-3.5 w-3.5" />
                    Backend: {backendPattern === "cqrs" ? "CQRS Command Handler" : "Application Service"}
                  </span>
                </div>

                <CodeBlock
                  code={backendPattern === "cqrs" ? backendCqrsCode : backendServiceCode}
                  language="csharp"
                  filename={backendPattern === "cqrs" ? "CreateProductCommand.cs" : "ProductService.cs"}
                  showLineNumbers
                />
              </div>

              {/* Frontend Generated Code */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5 text-purple-400 font-semibold">
                    <Layout className="h-3.5 w-3.5" />
                    Frontend: {frontendFramework === "react" ? "React Axios Client" : "Angular HttpClient Service"}
                  </span>
                </div>

                <CodeBlock
                  code={frontendFramework === "react" ? frontendReactCode : frontendAngularCode}
                  language="typescript"
                  filename="product.service.ts"
                  showLineNumbers
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
