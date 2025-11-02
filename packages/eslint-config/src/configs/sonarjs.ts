import type { TypedFlatConfigItem } from '@antfu/eslint-config'

import sonarjsPlugin from 'eslint-plugin-sonarjs'

export const sonarjs = (): TypedFlatConfigItem[] => [{
  name: 'moeru/sonarjs/setup',
  plugins: {
    sonarjs: sonarjsPlugin,
  },
  rules: {
    ...sonarjsPlugin.configs.recommended.rules,
    'sonarjs/fixme-tag': 'warn',
    'sonarjs/no-commented-code': 'warn',
    // allow nested conditional
    'sonarjs/no-nested-conditional': 'off',
    // allow nested functions
    'sonarjs/no-nested-functions': 'off',
    // allow nested template literals
    'sonarjs/no-nested-template-literals': 'off',
    // allow `'foo' | (string & {})` for autocompletion
    'sonarjs/no-useless-intersection': 'off',
    // allow pseudo random
    'sonarjs/pseudo-random': 'off',
    'sonarjs/todo-tag': 'warn',
    // allow void use
    'sonarjs/void-use': 'off',
  },
}]
