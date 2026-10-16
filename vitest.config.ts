import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // Same "@/..." alias as tsconfig.json, so component tests can import components.
  resolve: { alias: { "@": fileURLToPath(new URL(".", import.meta.url)) } },
});
