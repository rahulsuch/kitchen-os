import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  // 1. Set the root to the frontend folder
  root: "frontend",
  
  plugins: [tailwindcss(), react()],

  resolve: {
    alias: {
      // 2. Add an alias so you can import shared files easily
      "@shared": path.resolve(__dirname, "./shared"),
      "@": path.resolve(__dirname, "./frontend/src"),
    },
  },

  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 5173,
    },
    // 3. ALLOW Vite to access the 'shared' folder outside of 'frontend'
    fs: {
      allow: [".."], 
    },
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },

  build: {
    // 4. Send the build output to the root 'dist' folder
    outDir: "../dist",
    emptyOutDir: true,
  },
});