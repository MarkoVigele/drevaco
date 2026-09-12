import { defineConfig } from "vite";

export default defineConfig({
  base: "/drevaco/",
  server: {
    host: true,
    port: 5173,
    open: "/drevaco/",
  },
  preview: {
    host: true,
    port: 4173,
  },
});
