import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Must match the URL path where the site is served (leading + trailing slash).
// Domain root: use '/'. Subfolder like sandyzie.in/portfolio: use '/portfolio/'.
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
})
