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
      '@ui': resolve(__dirname, '../ui/src/lib'),
      '@senka-ai/layout-engine': resolve(__dirname, '../layout-engine/src/lib'),
      '@layout-engine': resolve(__dirname, '../layout-engine/src/lib'),
    },
  },
}

export default config
