import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000
  },
  define: {
    'import.meta.env.VITE_APP_BASE_URL': JSON.stringify(process.env.VITE_APP_BASE_URL)
  }
})