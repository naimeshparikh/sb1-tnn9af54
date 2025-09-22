import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'], // 
  },
  build: {
    rollupOptions: {
      input: './index.html',  // 👈 ensures Netlify knows entry point
    },
    outDir: 'dist',            // 
  server: {
    port: 3000,
    open: true
  },
  base: '/', // needed so /emi, /sip, etc. resolve correctly
})