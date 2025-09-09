import type { TypedFlatConfigItem } from '@antfu/eslint-config'

import dependPlugin from 'eslint-plugin-depend'

export const depend = (): TypedFlatConfigItem[] => [{
  name: 'moeru/depend/setup',
  plugins: { depend: dependPlugin },
  rules: {
    'depend/ban-dependencies': 'error',
  },
}]
