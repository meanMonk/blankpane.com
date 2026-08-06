import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://fullscreencolor.example.com',
  output: 'static',
  build: { format: 'directory' }
});
