import tailwindcss from '@tailwindcss/vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  root: __dirname,
  plugins: [tailwindcss(), sveltekit()],
  server: {
    port: 3000,
  },
  logLevel: 'error',
  // @ts-expect-error - Vitest config in Vite config file
  test: {
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,ts}'],
    exclude: ['src/**/*.svelte.{test,spec}.{js,ts}', 'tests/visual/**'],
  },
})
