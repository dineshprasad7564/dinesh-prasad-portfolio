import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// On GitHub Pages the site lives at /dinesh-prasad-portfolio/ — keep local dev at '/'
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/dinesh-prasad-portfolio/' : '/',
}))
