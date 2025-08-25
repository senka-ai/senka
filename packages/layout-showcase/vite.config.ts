import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      '@senka-ai/ui': path.resolve(__dirname, '../ui/src/lib'),
      '@senka-ai/layout-engine': path.resolve(__dirname, '../layout-engine/src/lib'),
    },
  },
})
