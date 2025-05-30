import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/__tests__/setup.ts",
    globals: true,
    include: ["src/__tests__/**/*.{test,spec}.{ts,tsx}"], 
  },
});
