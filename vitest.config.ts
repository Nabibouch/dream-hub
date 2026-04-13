import { defineConfig } from "vitest/config";
import path from "path"

console.log("ENV LOADED", process.env.DATABASE_URL);
export default defineConfig({
  test: {
    setupFiles: ["vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
