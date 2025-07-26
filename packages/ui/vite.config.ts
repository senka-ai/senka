import tailwindcss from '@tailwindcss/vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tailwindcss(), svelte()],
  // @ts-expect-error - Vitest config in Vite config file
  test: {
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts}'],
    exclude: ['src/**/*.svelte.{test,spec}.{js,ts}', 'tests/visual/**'],
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
})
