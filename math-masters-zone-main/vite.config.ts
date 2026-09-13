import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  build: {
    // manualChunks é só para o bundle de cliente — no build --ssr, react/react-dom
    // ficam externos por omissão e o Rollup rejeita chunká-los manualmente.
    rollupOptions: isSsrBuild
      ? undefined
      : {
          output: {
            manualChunks: {
              "react-vendor": ["react", "react-dom", "react-router-dom"],
            },
          },
        },
  },
}));
