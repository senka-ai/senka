import tailwindcss from '@tailwindcss/vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [tailwindcss(), svelte()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'SenkaUI',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['svelte', 'svelte/internal', 'tailwindcss'],
      output: {
        globals: {
          svelte: 'Svelte',
        },
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  // @ts-expect-error - Vitest config in Vite config file
  test: {
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts}'],
    exclude: ['src/**/*.svelte.{test,spec}.{js,ts}', 'tests/visual/**'],
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
})
