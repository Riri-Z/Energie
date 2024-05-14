import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/assets/abstracts/_fonts.scss";
        @import "@/assets/abstracts/_breakpoints.scss";
        @import "@/assets/abstracts/_colors.scss";
        @import "@/assets/abstracts/_highCharts.scss";
        `,
      },
    },
  },
});
