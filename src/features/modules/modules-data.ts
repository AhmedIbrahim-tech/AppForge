import type { ModuleDefinition, ModuleId, ModuleCategory } from "./types";

export const CLI_MODULES: Record<ModuleId, ModuleDefinition> = {
  auth: {
    id: "auth",
    name: "Authentication",
    category: "Security & Access",
    description: "Identity + JWT access tokens + HttpOnly refresh cookies",
    summary:
      "Adds authentication infrastructure with ASP.NET Identity, JWT access tokens, and HttpOnly refresh cookies.",
    includes: [
      "ASP.NET Identity (User & Role persistence with EF Core)",
      "Authentication services & JWT token generation",
      "HttpOnly refresh cookies & rotation support",
      "Current-user accessor & claims principal integration",
      "Login, registration, token refresh, and logout endpoints",
      "Client-side auth store, login/register forms, and route protection",
    ],
    requires: [],
    requiresBackend: true,
    requiresFrontend: false,
    requiresEfCore: true,
    changesDatabase: true,
    packages: {
      backend: [
        "Microsoft.AspNetCore.Identity.EntityFrameworkCore",
        "Microsoft.AspNetCore.Authentication.JwtBearer",
        "System.IdentityModel.Tokens.Jwt",
      ],
    },
  },
  users: {
    id: "users",
    name: "User Management",
    category: "Administration",
    description: "Admin user search, roles, enable/disable",
    summary:
      "Provides administrative user management capabilities, role assignments, and account status controls.",
    includes: [
      "User query & search endpoints (pagination, filtering, sorting)",
      "Account status toggling (enable / disable users)",
      "Role assignment & permission role mapping",
      "Frontend administrative user list, search filters, and edit modals",
    ],
    requires: ["auth"],
    requiresBackend: true,
    requiresFrontend: false,
    requiresEfCore: true,
    changesDatabase: true,
  },
  permissions: {
    id: "permissions",
    name: "Permissions",
    category: "Security & Access",
    description: "Permission-based authorization policies",
    summary:
      "Adds granular permission-based authorization, policy definitions, and role-permission mappings.",
    includes: [
      "Fine-grained permission definitions and constants",
      "Dynamic authorization policy provider & requirement handlers",
      "Role claims & permission seeders for default roles",
      "Permission-protected API endpoint attributes and policies",
    ],
    requires: ["auth"],
    requiresBackend: true,
    requiresFrontend: false,
    requiresEfCore: true,
    changesDatabase: true,
  },
  audit: {
    id: "audit",
    name: "Audit Trail",
    category: "Data & Audit",
    description: "Entity change audit logging with redaction",
    summary:
      "Automatically captures entity changes on save, with sensitive field redaction and audit log queries.",
    includes: [
      "AuditTrail & AuditEntry domain and persistence models",
      "Automatic DbContext SaveChanges audit interceptor",
      "Sensitive data redaction (passwords, tokens, keys)",
      "Audit log query endpoints & frontend audit history viewer",
    ],
    requires: [],
    requiresBackend: true,
    requiresFrontend: false,
    requiresEfCore: true,
    changesDatabase: true,
  },
  notifications: {
    id: "notifications",
    name: "Notifications",
    category: "UI & Foundation",
    description: "In-app user notifications",
    summary:
      "Provides in-app notification persistence, recipient dispatching, and UI notification center.",
    includes: [
      "Notification entity, repository, and persistence models",
      "In-app notification dispatch service (INotificationService)",
      "User notification query, mark-read, and dismiss endpoints",
      "Optional SignalR real-time notification push (when realtime is enabled)",
      "Frontend notification bell, unread badge, and notification center list",
    ],
    requires: ["auth"],
    requiresBackend: true,
    requiresFrontend: false,
    requiresEfCore: true,
    changesDatabase: true,
  },
  localization: {
    id: "localization",
    name: "Domain Localization",
    category: "Data & Audit",
    description: "Entity translation tables and language management",
    summary:
      "Supports multi-language entity translation storage and runtime culture resolution.",
    includes: [
      "Language entity & entity translation tables",
      "Localization query service & request culture provider",
      "Default language seeding (en, ar, etc.)",
      "Integration with frontend localization state",
    ],
    requires: [],
    requiresBackend: true,
    requiresFrontend: false,
    requiresEfCore: true,
    changesDatabase: true,
  },
  "rich-text": {
    id: "rich-text",
    name: "Rich Text",
    category: "Data & Audit",
    description: "Structured rich-text documents (Tiptap JSON)",
    summary:
      "Adds Tiptap-powered rich-text WYSIWYG editing, document schemas, and toolbar controls.",
    includes: [
      "Tiptap WYSIWYG editor component and formatting toolbar",
      "Structured JSON document schema and renderer",
      "Integration with feature generator rich-text fields",
    ],
    requires: [],
    requiresBackend: false,
    requiresFrontend: true,
    requiresEfCore: false,
    changesDatabase: false,
    packages: {
      react: ["@tiptap/react", "@tiptap/starter-kit", "@tiptap/extension-link"],
    },
  },
  dashboard: {
    id: "dashboard",
    name: "Dashboard Foundation",
    category: "UI & Foundation",
    description: "Shared dashboard shell, widgets, and CRUD UI",
    summary:
      "Provides a dashboard shell with sidebar navigation, statistic cards, and auto-registration container.",
    includes: [
      "Responsive dashboard layout with sidebar and user header",
      "Key metrics stat cards & recent activity widget",
      "Navigation registry for auto-registering generated features",
    ],
    requires: [],
    requiresBackend: false,
    requiresFrontend: true,
    requiresEfCore: false,
    changesDatabase: false,
  },
};

export const MODULE_LIST = Object.values(CLI_MODULES);

export const MODULE_CATEGORIES: ModuleCategory[] = [
  "Security & Access",
  "Administration",
  "Data & Audit",
  "UI & Foundation",
];
