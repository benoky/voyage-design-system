import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const needSourcemap = mode === 'localhost' || mode === 'dev';
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      sourcemap: needSourcemap,
      minify: mode === 'prod' ? 'terser' : 'esbuild',
      terserOptions:
        mode === 'prod'
          ? {
              compress: {
                drop_console: true,
                drop_debugger: true,
              },
            }
          : undefined,
      chunkSizeWarningLimit: 1000,
    }
  };
});
