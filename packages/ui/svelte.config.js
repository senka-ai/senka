import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    files: {
      lib: 'src/lib',
    },
    alias: {
      '@components': resolve(__dirname, 'src/lib/components'),
      '@icons': resolve(__dirname, 'src/lib/icons'),
      '@utils': resolve(__dirname, 'src/lib/utils'),
      '@type': resolve(__dirname, 'src/lib/type'),
      '@styles': resolve(__dirname, 'src/styles'),
    },
  },
}

export default config
