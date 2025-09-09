import { defineConfig } from '@moeru/eslint-config'

export default defineConfig({
  pnpm: true,
}, {
  ignores: ['packages/eslint-config/src/moeru-lint.js'],
})
