import type { TypedFlatConfigItem } from '@antfu/eslint-config'

import sonarjsPlugin from 'eslint-plugin-sonarjs'

export const sonarjs = (): TypedFlatConfigItem => ({
  name: 'moeru/sonarjs/setup',
  plugins: {
    sonarjs: sonarjsPlugin,
  },
  rules: {
    ...sonarjsPlugin.configs.recommended.rules,
    'sonarjs/fixme-tag': 'warn',
    'sonarjs/todo-tag': 'warn',
  },
})
