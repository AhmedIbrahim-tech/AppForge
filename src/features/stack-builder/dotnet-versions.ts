export type DotnetVersion = "10" | "9" | "8";

export interface DotnetVersionInfo {
  version: DotnetVersion;
  display: string;
  targetFramework: string;
  label: string;
  description: string;
  isDefault?: boolean;
}

export const DOTNET_VERSIONS: Record<DotnetVersion, DotnetVersionInfo> = {
  "10": {
    version: "10",
    display: ".NET 10",
    targetFramework: "net10.0",
    label: ".NET 10",
    description: ".NET 10 runtime release.",
    isDefault: true,
  },
  "9": {
    version: "9",
    display: ".NET 9",
    targetFramework: "net9.0",
    label: ".NET 9",
    description: ".NET 9 runtime release.",
    isDefault: false,
  },
  "8": {
    version: "8",
    display: ".NET 8",
    targetFramework: "net8.0",
    label: ".NET 8",
    description: ".NET 8 runtime release.",
    isDefault: false,
  },
};

export const DEFAULT_DOTNET_VERSION: DotnetVersion = "10";
export const SUPPORTED_DOTNET_VERSIONS: DotnetVersion[] = ["10", "9", "8"];

/**
 * Returns the human-readable display string for a .NET version (e.g. ".NET 10")
 */
export function getDotnetDisplay(version: DotnetVersion): string {
  return DOTNET_VERSIONS[version]?.display ?? `.NET ${version}`;
}

/**
 * Returns the target framework moniker for project files (e.g. "net10.0")
 */
export function getDotnetTargetFramework(version: DotnetVersion): string {
  return DOTNET_VERSIONS[version]?.targetFramework ?? `net${version}.0`;
}

/**
 * Validates if a version string is a supported .NET version
 */
export function isValidDotnetVersion(version: string): version is DotnetVersion {
  return version === "10" || version === "9" || version === "8";
}
