import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 3000
    },
    define: {
      'import.meta.env.VITE_APP_BASE_URL': JSON.stringify(env.VITE_APP_BASE_URL)
    }
  }
})