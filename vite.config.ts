import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  base: "/timer/",
  plugins: [tailwindcss(), vue()],
  test: {
    environment: 'jsdom', // Simula o DOM para testes de componentes e composables
    globals: true,        // Permite usar describe, it, expect sem importar sempre
  }
});
