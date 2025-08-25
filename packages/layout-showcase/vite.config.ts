import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      '@senka-ai/ui/styles': path.resolve(__dirname, '../ui/src/styles/index.css'),
      '@senka-ai/ui/styles.css': path.resolve(__dirname, '../ui/src/styles/index.css'),
      '@senka-ai/ui': path.resolve(__dirname, '../ui/src/lib'),
      '@senka-ai/ui/icons': path.resolve(__dirname, '../ui/src/lib/icons'),
      '@senka-ai/layout-engine': path.resolve(__dirname, '../layout-engine/dist'),
    },
  },
})
