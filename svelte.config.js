import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      fallback: '404.html' // SPA fallback dla GitHub Pages
    }),
    paths: {
      base: '/business-intelligence-reporting-platform' // nazwa repo
    }
    // NIE wstawiaj `prerender.default`, w tej wersji SvelteKit to powoduje błąd
  }
};

export default config;