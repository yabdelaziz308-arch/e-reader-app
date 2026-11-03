import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev
export default defineConfig({
  base: './',
  plugins: [react()]
})
