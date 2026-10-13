import { describe, expect, it } from "vitest";
import nextConfig from "../next.config";

describe("next.config", () => {
  it("exports static HTML for Workers static assets", () => {
    expect(nextConfig.output).toBe("export");
  });

  it("turns off the image optimizer, which needs a server", () => {
    expect(nextConfig.images?.unoptimized).toBe(true);
  });
});
