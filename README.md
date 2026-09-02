# AppForge — Production-Ready Apps. Your Stack. Your Architecture.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/AhmedIbrahim-tech/generate-fullstack-app/blob/main/LICENSE)
[![.NET Version](https://img.shields.io/badge/.NET-10-purple.svg)](https://dotnet.microsoft.com/)
[![React Version](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg)](https://vitejs.dev/)

AppForge is the web platform and developer-facing studio for the [`generate-fullstack-app`](https://github.com/AhmedIbrahim-tech/generate-fullstack-app) ecosystem. It empowers developers to configure, scaffold, and evolve production-grade **Full Stack**, **Backend-Only**, or **Frontend-Only** applications built on Clean Architecture principles without runtime lock-in.

---

![AppForge Hero](./public/hero.png)

---

## Key Features

- 🏗️ **Configurable Clean Architecture**: Generates layered solutions with strict separation between Domain, Application, Infrastructure, API, and Client layers.
- 🎯 **Architecture-Aware Scaffolding**: Automatically adjusts project layout based on selected ORM (EF Core / Dapper), state management (Zustand / Redux / NgRx), and UI systems (shadcn/ui / Material UI / Ant Design).
- 📜 **Manifest-Driven Source of Truth**: Includes a canonical `.fullstack-app.json` configuration manifest that records project choices for ongoing CLI scaffolding.
- 🚀 **Full-Stack Feature Generator**: Scaffold complete vertical feature slices (`create-fullstack-feature Product`) on demand as your product evolves.
- ⚡ **Zero Runtime Lock-In**: Emits idiomatic, human-readable C# (.NET 10) and modern TypeScript code that you own completely.

---

## Interactive Stack Builder Studio

Configure your architecture interactively in the browser and inspect the generated directory tree, `.fullstack-app.json` manifest, and CLI execution commands in real time.

![AppForge Stack Builder Studio](./public/Builder.png)

---

## Quick Start & Installation

### 1. Install CLI Globally

Install the official AppForge CLI globally via npm directly from GitHub:

```bash
npm install -g github:AhmedIbrahim-tech/generate-fullstack-app
```

### 2. Scaffold a New Project

Initialize a new full-stack application interactively or via CLI flags:

```bash
# Interactive mode
generate-fullstack-app MyEcommerceApp

# Declarative flag mode (.NET 10 + Clean Architecture + React + Tailwind)
npx generate-fullstack-app MyEcommerceApp --type fullstack --dotnet 10 --orm efcore --db postgresql
```

### 3. Generate Vertical Features On-Demand

Scaffold complete vertical feature slices end-to-end as your project grows:

```bash
cd MyEcommerceApp
create-fullstack-feature Product
```

**Generated Feature Output:**
```
Product/
├── Domain/           # Product.cs, ProductStatus.cs, DomainEvents
├── Application/      # CreateProductCommand.cs, GetProductsQuery.cs (MediatR/CQRS)
├── Infrastructure/   # ProductConfiguration.cs (EF Core / Dapper)
├── API/              # ProductsController.cs (REST Endpoints)
└── Frontend/         # product.types.ts, product.service.ts, ProductsPage.tsx
```

---

## Technical Stack & Compatibility Matrix

| Layer | Supported Technologies & Choices | Default Choice |
| :--- | :--- | :--- |
| **Backend Runtime** | .NET 10, .NET 9, .NET 8 | **.NET 10** |
| **Backend Pattern** | Clean Architecture (CQRS + MediatR / Application Services) | **CQRS + MediatR** |
| **Data Access & ORM** | EF Core, Dapper | **EF Core** |
| **Database** | PostgreSQL, SQL Server, SQLite | **PostgreSQL** |
| **Authentication** | ASP.NET Core Identity + JWT Bearer Tokens | **Identity + JWT** |
| **Frontend Framework** | React 19, Angular CLI | **React 19** |
| **Frontend Tooling** | Vite, Next.js, Angular CLI | **Vite** |
| **State Management** | Zustand, Redux Toolkit, NgRx, None | **Zustand** |
| **UI Component System** | shadcn/ui, Material UI, Ant Design, Angular Material | **shadcn/ui** |
| **Styling** | Tailwind CSS, Bootstrap | **Tailwind CSS** |

---

## Local Development & Contribution

To run the AppForge web platform locally:

```bash
# Clone repository
git clone https://github.com/AhmedIbrahim-tech/AppForge.git
cd AppForge

# Install dependencies
npm install

# Start local development server
npm run dev

# Run unit test suite
npm test

# Build production bundle
npm run build
```

---

## Ecosystem & Links

- 🐙 **GitHub Repository**: [generate-fullstack-app](https://github.com/AhmedIbrahim-tech/generate-fullstack-app)
- 👤 **Author**: [Ahmed Ibrahim](https://www.linkedin.com/in/ahmedeprahim/)
- 📄 **License**: [MIT License](https://github.com/AhmedIbrahim-tech/generate-fullstack-app/blob/main/LICENSE)
