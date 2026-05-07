import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Use absolute paths so deep routes like /event/theme work on direct access
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'form-utils': ['react-hook-form', 'zod', '@hookform/resolvers'],
          'icons': ['lucide-react'],
        },
      },
    },
  },
  server: {
    headers: {
      // Cache static assets for 1 year (using hash, safe for long-term caching)
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },
})

export const cacheControl = {
  // Immutable assets (with hash in filename)
  immutable: 'public, max-age=31536000, immutable',
  // Short-lived assets
  shortLived: 'public, max-age=3600, must-revalidate',
  // No cache for HTML
  noCache: 'public, max-age=0, must-revalidate',
  // Stale while revalidate
  staleWhileRevalidate: 'public, max-age=86400, stale-while-revalidate=604800',
}
