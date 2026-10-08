import { describe, it, expect, vi, beforeEach } from "vitest";

describe("Scroll Navigation & Controls Logic", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("calculates threshold visibility correctly for UP button", () => {
    const isUpVisible = (scrollY: number) => scrollY > 280;

    expect(isUpVisible(0)).toBe(false);
    expect(isUpVisible(100)).toBe(false);
    expect(isUpVisible(280)).toBe(false);
    expect(isUpVisible(281)).toBe(true);
    expect(isUpVisible(600)).toBe(true);
  });

  it("calculates threshold visibility correctly for DOWN button", () => {
    const isDownVisible = (
      scrollY: number,
      windowHeight: number,
      scrollHeight: number,
    ) => {
      const isLongDocument = scrollHeight > windowHeight + 350;
      const isNearBottom = scrollY + windowHeight >= scrollHeight - 200;
      return isLongDocument && !isNearBottom;
    };

    // Short page: never show down button
    expect(isDownVisible(0, 800, 900)).toBe(false);

    // Long page at top: show down button
    expect(isDownVisible(0, 800, 3000)).toBe(true);

    // Long page near bottom: hide down button
    expect(isDownVisible(2100, 800, 3000)).toBe(false);
  });
});
