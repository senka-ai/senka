import tailwindcss from '@tailwindcss/vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  server: {
    port: 6006,
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'SenkaUI',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['svelte', 'svelte/internal'],
    },
  },
  // @ts-expect-error - Vitest config in Vite config file
  test: {
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,ts}'],
    exclude: ['src/**/*.svelte.{test,spec}.{js,ts}', 'tests/visual/**'],
  },
})
