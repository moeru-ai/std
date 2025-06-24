import type { TypedFlatConfigItem } from '@antfu/eslint-config'

import preferLetPlugin from 'eslint-plugin-prefer-let'

export const preferLet = (): TypedFlatConfigItem => ({
  name: 'moeru/prefer-let/setup',
  plugins: {
    'prefer-let': preferLetPlugin,
  },
  // https://github.com/thefrontside/javascript/tree/v3/packages/eslint-plugin-prefer-let#usage
  rules: {
    'prefer-const': 'off',
    'prefer-let/prefer-let': 2,
  },
})
