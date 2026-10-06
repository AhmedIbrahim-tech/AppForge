# Flatron — Build your application stack.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/AhmedIbrahim-tech/flatron/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/v/flatron.svg)](https://www.npmjs.com/package/flatron)
[![.NET Version](https://img.shields.io/badge/.NET-10-purple.svg)](https://dotnet.microsoft.com/)
[![React Version](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg)](https://vitejs.dev/)

Flatron is the CLI and visual builder for scaffolding production-ready **Full Stack**, **Backend-Only**, or **Frontend-Only** applications built on Clean Architecture principles without runtime lock-in.

---

## Quick Start & Installation

### 1. Run with npx (Recommended)

Scaffold a new project directly without installing globally:

```bash
npx flatron MyApp
```

### 2. Install CLI Globally

```bash
npm install -g flatron
flatron MyApp
```

### 3. Declarative Flags Example

```bash
# .NET 10 + Clean Architecture + React + Tailwind
npx flatron MyApp --type fullstack --dotnet 10 --orm efcore --db postgresql
```

---

## Visual Builder

Configure your stack interactively in the browser and inspect the generated directory tree, `.fullstack-app.json` manifest, and CLI commands in real time.

---

## Technical Stack & Compatibility

| Layer | Supported Technologies & Choices | Default Choice |
| :--- | :--- | :--- |
| **Backend Runtime** | .NET 10, .NET 9, .NET 8 | **.NET 10** |
| **Backend Pattern** | Clean Architecture (CQRS + MediatR) | **CQRS + MediatR** |
| **Data Access & ORM** | EF Core, Dapper | **EF Core** |
| **Database** | PostgreSQL, SQL Server, SQLite | **PostgreSQL** |
| **Authentication** | ASP.NET Core Identity + JWT Bearer Tokens | **Identity + JWT** |
| **Frontend Framework** | React 19, Angular CLI | **React 19** |
| **Frontend Tooling** | Vite, Next.js, Angular CLI | **Vite** |
| **State Management** | Zustand, Redux Toolkit, NgRx, None | **Zustand** |
| **UI Component System** | shadcn/ui, Material UI, Angular Material | **shadcn/ui** |
| **Styling** | Tailwind CSS, Bootstrap | **Tailwind CSS** |

---

## Local Development

To run the Flatron web builder locally:

```bash
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

- 📦 **npm Package**: [flatron](https://www.npmjs.com/package/flatron)
- 🐙 **GitHub Repository**: [flatron](https://github.com/AhmedIbrahim-tech/flatron)
- 👤 **Author**: [Ahmed Ibrahim](https://www.linkedin.com/in/ahmedeprahim/)
- 📄 **License**: [MIT License](https://github.com/AhmedIbrahim-tech/flatron/blob/main/LICENSE)

