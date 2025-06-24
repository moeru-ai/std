import type { TypedFlatConfigItem } from '@antfu/eslint-config'

import preferArrowPlugin from 'eslint-plugin-prefer-arrow'

export const preferArrow = (): TypedFlatConfigItem => ({
  name: 'moeru/prefer-arrow/setup',
  plugins: {
    'prefer-arrow': preferArrowPlugin,
  },
  // https://github.com/TristonJ/eslint-plugin-prefer-arrow#installation
  rules: {
    'antfu/top-level-function': 'off',
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        classPropertiesAllowed: false,
        disallowPrototype: true,
        singleReturnOnly: false,
      },
    ],
  },
})
