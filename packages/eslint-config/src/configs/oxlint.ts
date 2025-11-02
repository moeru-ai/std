import type { TypedFlatConfigItem } from '@antfu/eslint-config'

import type { MoeruOptions } from '..'

import { ensurePackages, interopDefault } from '@antfu/eslint-config'

export const oxlint = async (options: MoeruOptions['oxlint']): Promise<TypedFlatConfigItem[]> => {
  await ensurePackages(['eslint-plugin-oxlint'])

  const oxlintPlugin = await interopDefault(import('eslint-plugin-oxlint'))

  return typeof options === 'object' && options.oxlintrcPath
    ? oxlintPlugin.buildFromOxlintConfigFile(options.oxlintrcPath) as TypedFlatConfigItem[]
    : oxlintPlugin.configs['flat/recommended'] as TypedFlatConfigItem[]
}
