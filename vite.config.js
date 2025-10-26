import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' 
    ? '/mmf-avantura-menu/'  // for GitHub Pages
    : '/',                   // for localhost and Vercel
})
