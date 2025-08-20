import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      '@senka-ai/ui/styles': path.resolve(__dirname, '../ui/dist/styles.css'),
      '@senka-ai/ui/styles.css': path.resolve(__dirname, '../ui/dist/styles.css'),
      '@senka-ai/ui': path.resolve(__dirname, '../ui/dist'),
      '@senka-ai/ui/icons': path.resolve(__dirname, '../ui/dist/icons'),
      '@senka-ai/layout-engine': path.resolve(__dirname, '../layout-engine/dist'),
    },
  },
  optimizeDeps: {
    include: ['@senka-ai/ui', '@senka-ai/ui/icons', '@senka-ai/layout-engine'], // Force pre-bundling even for local package
  },
})
