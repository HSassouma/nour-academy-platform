import { resolve } from 'path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [tailwindcss()],
  appType: 'mpa',
  server: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/dashboard$/, to: '/dashboard/index.html' },
        { from: /^\/dashboard\/$/, to: '/dashboard/index.html' },
      ],
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        dashboard: resolve(__dirname, 'dashboard/index.html'),
      },
    },
  },
})