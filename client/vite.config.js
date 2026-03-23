import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/groundbreak-form/',
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/groundbreak-form/api': {
        target: 'http://localhost:3000',
        rewrite: (path) => path.replace(/^\/groundbreak-form/, ''),
      },
    },
  },
});
