import type { TypedFlatConfigItem } from '@antfu/eslint-config'

export const ignores = (): TypedFlatConfigItem[] => [{
  ignores: [
    'cspell.config.yaml',
    'cspell.config.yml',
  ],
  name: 'moeru/ignores',
}]
