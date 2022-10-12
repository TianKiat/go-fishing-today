import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "tiankiat.github.io/go-fishing-app",
  plugins: [react()],
});
