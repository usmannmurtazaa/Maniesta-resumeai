import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@netlify': path.resolve(__dirname, './netlify'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts',
    alias: {
      'firebase-admin': path.resolve(__dirname, './tests/__mocks__/firebase-admin.ts'),
      '@netlify/functions': path.resolve(__dirname, './tests/__mocks__/@netlify/functions.ts'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Only split large, well-defined packages
          if (id.includes('node_modules/firebase')) return 'firebase-vendor';
          if (id.includes('node_modules/@firebase')) return 'firebase-vendor';
          if (id.includes('node_modules/react-router')) return 'react-router-vendor';
          if (id.includes('node_modules/framer-motion')) return 'motion-vendor';
          if (
            id.includes('node_modules/zod') ||
            id.includes('node_modules/react-hook-form') ||
            id.includes('node_modules/@hookform')
          )
            return 'form-vendor';
          // Do not create a generic 'vendor' chunk to avoid cycles
        },
      },
    },
  },
  server: {
  port: 5173,
  strictPort: true,
},
});
