import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isAnalyze = mode === 'analyze';
  const needSourcemap = mode === 'localhost' || mode === 'dev' || mode === 'development';

  return {
    plugins: [
      react(),
      tailwindcss(),
      // Bundle analyzer (only in analyze mode)
      ...(isAnalyze
        ? [
            visualizer({
              filename: 'dist/stats.html',
              open: true,
              gzipSize: true,
              brotliSize: true,
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    esbuild: {
      target: 'es2020',
      supported: {
        'top-level-await': false, // ESM top-level await compatibility
      },
    },
    build: {
      target: 'es2020',
      sourcemap: needSourcemap,
      minify: mode === 'prod' || mode === 'production' ? 'terser' : 'esbuild',
      terserOptions:
        mode === 'prod' || mode === 'production'
          ? {
              compress: {
                drop_console: true,
                drop_debugger: true,
              },
              mangle: {
                safari10: true,
              },
            }
          : undefined,
      chunkSizeWarningLimit: 1000,
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'VoyageDesignSystem',
        fileName: (format, entryName) => {
          if (format === 'es') return `${entryName}.mjs`;
          if (format === 'cjs') return `${entryName}.js`;
          return `${entryName}.${format}.js`;
        },
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'jsxRuntime',
          },
          // Preserve CSS as separate file
          assetFileNames: assetInfo => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'voyage-design-system.css';
            }
            return assetInfo.name || 'asset';
          },
        },
      },
      // CSS code splitting
      cssCodeSplit: false,
      // Emit manifest for better debugging
      manifest: isAnalyze,
    },
  };
});
