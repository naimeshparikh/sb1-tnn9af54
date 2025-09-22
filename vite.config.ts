import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'], // keep this exclusion
  },
  build: {
    rollupOptions: {
      input: './index.html',  // entry point
    },
    outDir: 'dist',           // default but explicit
  },
  server: {
    port: 3000,
    open: true,
  },
  base: '/', // needed so /emi, /sip, etc. resolve correctly
}) // ✅ only one closing bracket