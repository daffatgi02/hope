import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use relative paths in the built index.html/assets so it can be opened from file:// or any subpath
  base: './',
})
