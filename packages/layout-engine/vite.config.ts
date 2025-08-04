import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'

export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'SenkaLayoutEngine',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['svelte', 'svelte/store', 'svelte/internal'],
      output: {
        globals: {
          svelte: 'Svelte',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      $lib: resolve(__dirname, './src/lib'),
    },
  },
})
