import { describe, it, expect } from "vitest";
import { CLI_MODULES, MODULE_LIST } from "./modules-data";

describe("Module Registry Data", () => {
  it("contains all 8 registered modules matching CLI registry", () => {
    expect(MODULE_LIST.length).toBe(8);
    const ids = MODULE_LIST.map((m) => m.id);
    expect(ids).toEqual([
      "auth",
      "users",
      "permissions",
      "audit",
      "notifications",
      "localization",
      "rich-text",
      "dashboard",
    ]);
  });

  it("enforces authentication dependencies correctly", () => {
    expect(CLI_MODULES.users.requires).toContain("auth");
    expect(CLI_MODULES.permissions.requires).toContain("auth");
    expect(CLI_MODULES.notifications.requires).toContain("auth");
    expect(CLI_MODULES.auth.requires).toHaveLength(0);
  });

  it("enforces layer and persistence requirements accurately", () => {
    expect(CLI_MODULES.auth.requiresBackend).toBe(true);
    expect(CLI_MODULES.auth.requiresEfCore).toBe(true);
    expect(CLI_MODULES["rich-text"].requiresFrontend).toBe(true);
    expect(CLI_MODULES["rich-text"].requiresBackend).toBe(false);
    expect(CLI_MODULES.dashboard.requiresFrontend).toBe(true);
  });
});
