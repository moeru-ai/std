import type { OptionsConfig as AntfuOptions, Awaitable, TypedFlatConfigItem } from '@antfu/eslint-config'

import antfu, { isPackageInScope } from '@antfu/eslint-config'

import { merge } from '@moeru/std/merge'

import { deMorgan } from './configs/de-morgan'
import { depend } from './configs/depend'
import { ignores } from './configs/ignores'
import { masknet } from './configs/masknet'
import { oxlint } from './configs/oxlint'
import { perfectionist } from './configs/perfectionist'
import { preferArrow } from './configs/prefer-arrow'
import { sonarjs } from './configs/sonarjs'
import { sortPackageJsonWithScripts } from './configs/sort'

export interface MoeruOptions extends AntfuOptions {
  masknet: boolean
  oxlint: boolean | { oxlintrcPath: string }
  perfectionist: boolean
  preferArrow: boolean
  sonarjs: boolean
  sortPackageJsonScripts: boolean
}

const defaults: MoeruOptions = {
  masknet: true,
  oxlint: isPackageInScope('oxlint'),
  perfectionist: true,
  preferArrow: true,
  sonarjs: true,
  sortPackageJsonScripts: true,
  typescript: { tsconfigPath: './tsconfig.json' },
}

export const moeru = (userOptions: Partial<MoeruOptions> = {}): Awaitable<TypedFlatConfigItem[]>[] => {
  const options: MoeruOptions = merge(defaults, userOptions)

  const results: Awaitable<TypedFlatConfigItem[]>[] = [
    deMorgan(),
    depend(),
    ignores(),
  ]

  if (options.jsonc !== false && options.sortPackageJsonScripts !== false)
    results.push(sortPackageJsonWithScripts())

  if (options.masknet)
    results.push(masknet(options))

  if (options.sonarjs)
    results.push(sonarjs())

  if (options.perfectionist)
    results.push(perfectionist())

  if (options.preferArrow)
    results.push(preferArrow())

  if (options.oxlint !== false)
    results.push(oxlint(options.oxlint))

  return results
}

// eslint-disable-next-line ts/promise-function-async
export const defineConfig = (userOptions: Partial<MoeruOptions> = {}, ...userConfigs: Array<Parameters<typeof antfu>[1]>): ReturnType<typeof antfu> => {
  const options: MoeruOptions = merge(defaults, userOptions)

  return antfu(options, ...moeru(options), ...userConfigs ?? [])
}

export default defineConfig()
