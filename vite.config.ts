import * as path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  plugins: [svgr(), react(), libInjectCss()],
  build: {
    lib: { entry: path.resolve(__dirname, 'src/index.ts'), formats: ['es'] },
    outDir: 'dist',
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
    },
  },
});
