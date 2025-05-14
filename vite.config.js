import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@fortawesome': path.resolve(__dirname, 'node_modules/@fortawesome'),
    },
  },
  server: {
    fs: {
      allow: ['..', 'node_modules/@fortawesome'],
    },
  },
});
