export type DotnetVersion = "10";

export interface DotnetVersionInfo {
  version: DotnetVersion;
  display: string;
  targetFramework: string;
  label: string;
  description: string;
  isDefault: boolean;
}

export const DOTNET_VERSIONS: Record<DotnetVersion, DotnetVersionInfo> = {
  "10": {
    version: "10",
    display: ".NET 10",
    targetFramework: "net10.0",
    label: ".NET 10 · Latest Stable",
    description: ".NET 10 runtime release (LTS).",
    isDefault: true,
  },
};

export const DEFAULT_DOTNET_VERSION: DotnetVersion = "10";
export const SUPPORTED_DOTNET_VERSIONS: DotnetVersion[] = ["10"];

/**
 * Returns the human-readable display string for a .NET version (e.g. ".NET 10")
 */
export function getDotnetDisplay(): string {
  return ".NET 10";
}

/**
 * Returns the target framework moniker for project files (e.g. "net10.0")
 */
export function getDotnetTargetFramework(): string {
  return "net10.0";
}

/**
 * Validates if a version string is a supported .NET version
 */
export function isValidDotnetVersion(version: string): version is DotnetVersion {
  return version === "10";
}
