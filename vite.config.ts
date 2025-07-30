// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: './index.html'  // ✅ Όχι ./public/index.html
    },
  },
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
  },
  server: {
    port: 3000,
    open: true,
  }
});