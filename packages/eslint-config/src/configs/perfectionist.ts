import type { TypedFlatConfigItem } from '@antfu/eslint-config'

import perfectionistPlugin from 'eslint-plugin-perfectionist'

export const perfectionist = (): TypedFlatConfigItem[] => [{
  name: 'moeru/perfectionist/rules',
  rules: perfectionistPlugin.configs['recommended-natural'].rules,
}]
