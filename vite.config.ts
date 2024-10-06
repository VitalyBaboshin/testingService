import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      components: "/src/components",
      asets: "/src/asets",
      pages: "/src/pages",
      services: "/src/services",
      utils: "/src/utils",
      stores: "/src/stores",
      types: "/src/types",
    }
  }
})
