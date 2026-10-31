import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    restoreMocks: true,
    environment: 'jsdom',
    setupFiles: ['./config/test/setup.ts'],
    exclude: [...configDefaults.exclude, 'cypress/**', 'e2e/**'],
  },
});
