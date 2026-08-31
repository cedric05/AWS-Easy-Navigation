import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

export default defineConfig({
  plugins: [
    svelte({
      preprocess: [sveltePreprocess()],
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: 'src/popup.ts',
      output: {
        entryFileNames: 'popup.js',
        dir: 'dist',
        format: 'iife',
      },
    },
  },
});
