import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: { outDir: "../static/dist", emptyOutDir: true, assetsDir: "assets" },
  server: { proxy: { "/api": "http://127.0.0.1:8710", "/static": "http://127.0.0.1:8710" } },
});
