import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    test: {
      environment: 'happy-dom',
      globals: true,
      setupFiles: './src/tests/setupTests.ts',
      css: false,
      alias: {
        // Swap out the real Framer Motion library for a lightweight stub.
        // This prevents motion components from polling the DOM in a headless
        // environment, which causes Vitest to hang indefinitely.
        'motion/react': path.resolve(__dirname, './src/tests/__mocks__/motion-react.tsx'),
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
    },
  };
});