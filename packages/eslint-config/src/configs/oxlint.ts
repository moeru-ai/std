import type { TypedFlatConfigItem } from '@antfu/eslint-config'

import { ensurePackages, interopDefault } from '@antfu/eslint-config'

import type { MoeruOptions } from '..'

export const oxlint = async (options: MoeruOptions['oxlint']): Promise<TypedFlatConfigItem> => {
  await ensurePackages(['eslint-plugin-oxlint'])

  let oxlintPlugin = await interopDefault(import('eslint-plugin-oxlint'))

  return {
    ...(
      typeof options === 'object' && options.oxlintrcPath
        ? oxlintPlugin.buildFromOxlintConfigFile(options.oxlintrcPath)
        : oxlintPlugin.configs['flat/recommended']
    ),
    name: 'moeru/oxlint/setup',
  }
}
