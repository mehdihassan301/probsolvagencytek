import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  const isProduction = mode === 'production'

  return {
    // Works both in root deployment and GitHub–Vercel preview URLs
    base: './',

    plugins: [react()],

    server: {
      port: 3000,
      host: '0.0.0.0',
    },

    // Tailwind & PostCSS auto-detected — no config needed here

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./', import.meta.url)),
      }
    },

    define: {
      // IMPORTANT:
      // Vite replaces "import.meta.env" automatically. Do not use process.env.
      'import.meta.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },

    build: {
      // Production optimizations
      minify: isProduction ? 'terser' : false,
      terserOptions: isProduction
        ? {
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
            mangle: true,
          }
        : undefined,

      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['framer-motion'],
          },
        },
      },
    }
  }
})
