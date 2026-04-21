import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages project site: https://<user>.github.io/<repo>/
  base: process.env.NODE_ENV === 'production' ? '/oxfordgroup/' : '/',
  plugins: [react()],
})
