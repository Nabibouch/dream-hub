import { defineConfig } from "vitest/config";

console.log("ENV LOADED", process.env.DATABASE_URL);
export default defineConfig({
  test: {
    setupFiles: ["vitest.setup.ts"],
  },
});
