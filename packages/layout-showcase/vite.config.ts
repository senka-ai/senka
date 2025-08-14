import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  resolve: {
    alias: {
      '@senka-ai/ui/styles': path.resolve(__dirname, '../ui/dist/styles.css'),
      '@senka-ai/ui/styles.css': path.resolve(__dirname, '../ui/dist/styles.css'),
      '@senka-ai/ui': path.resolve(__dirname, '../ui/dist'),
      '@senka-ai/ui/icons': path.resolve(__dirname, '../ui/dist/icons'),
      '@senka-ai/layout-engine': path.resolve(__dirname, '../layout-engine/dist'),
    },
  },
})
