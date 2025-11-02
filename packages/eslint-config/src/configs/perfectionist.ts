import type { TypedFlatConfigItem } from '@antfu/eslint-config'

import perfectionistPlugin from 'eslint-plugin-perfectionist'

export const perfectionist = (): TypedFlatConfigItem[] => [{
  name: 'moeru/perfectionist/rules',
  rules: {
    ...perfectionistPlugin.configs['recommended-natural'].rules,
    'perfectionist/sort-imports': [
      'error',
      {
        fallbackSort: { type: 'line-length' },
        /** @see {@link https://perfectionist.dev/rules/sort-imports#groups} */
        groups: [
          'type-builtin',
          'type-import',
          'type-internal',
          ['type-parent', 'type-sibling', 'type-index'],
          'default-value-builtin',
          'named-value-builtin',
          'value-builtin',
          'default-value-external',
          'named-value-external',
          'value-external',
          'default-value-internal',
          'named-value-internal',
          'value-internal',
          ['default-value-parent', 'default-value-sibling', 'default-value-index'],
          ['named-value-parent', 'named-value-sibling', 'named-value-index'],
          ['wildcard-value-parent', 'wildcard-value-sibling', 'wildcard-value-index'],
          ['value-parent', 'value-sibling', 'value-index'],
          'side-effect',
          'side-effect-style',
          'ts-equals-import',
          'unknown',
        ],
        newlinesBetween: 'always',
        partitionByComment: true,
        type: 'natural',
      },
    ],
  },
}]
