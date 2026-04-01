import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:4173',
    supportFile: false,
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
