import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    alias: {
      '@senka-ai/ui': resolve(__dirname, '../ui/src/lib'),
      '@components': resolve(__dirname, '../ui/src/lib/components'),
      '@icons': resolve(__dirname, '../ui/src/lib/icons'),
      '@utils': resolve(__dirname, '../ui/src/lib/utils'),
      '@type': resolve(__dirname, '../ui/src/lib/type'),
      '@styles': resolve(__dirname, '../ui/src/styles'),
    },
  },
}

export default config
