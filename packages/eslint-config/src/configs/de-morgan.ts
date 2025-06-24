import type { TypedFlatConfigItem } from '@antfu/eslint-config'

import deMorganPlugin from 'eslint-plugin-de-morgan'

export const deMorgan = (): TypedFlatConfigItem[] => [{
  ...deMorganPlugin.configs.recommended,
  name: 'moeru/de-morgan/setup',
}]
