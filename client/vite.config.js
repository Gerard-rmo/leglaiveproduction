import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.PNG", "**/*.png"],
  base: "./",
  build: {
    outDir: 'dist'
  },
  server: {
    open: true, // Automatically open the browser on startup
  },
  resolve: {
    alias: {
      "@": "/src", // Alias for the src directory
      "@assets": "/src/assets", // Alias for the assets directory
    },
  }
});
