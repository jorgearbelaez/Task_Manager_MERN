import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // to be able to run it as a container
  server: {
    host: true,
  },
  plugins: [react()]
})
