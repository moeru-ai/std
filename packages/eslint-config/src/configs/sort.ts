import type { TypedFlatConfigItem } from '@antfu/eslint-config'

/**
 * Sort package.json with scripts
 *
 * Requires `jsonc` config
 */
export const sortPackageJsonWithScripts = (): TypedFlatConfigItem => ({
  files: ['**/package.json'],
  name: 'moeru/sort/package-json-scripts',
  rules: {
    'jsonc/sort-keys': [
      'error',
      {
        order: { type: 'asc' },
        pathPattern: '^scripts$',
      },
      // https://github.com/antfu/eslint-config/blob/ca5646466d58e69334d4ca20f105a3ac7344032b/src/configs/sort.ts#L23-L105
      {
        order: [
          'publisher',
          'name',
          'displayName',
          'type',
          'version',
          'private',
          'packageManager',
          'description',
          'author',
          'contributors',
          'license',
          'funding',
          'homepage',
          'repository',
          'bugs',
          'keywords',
          'categories',
          'sideEffects',
          'imports',
          'exports',
          'main',
          'module',
          'unpkg',
          'jsdelivr',
          'types',
          'typesVersions',
          'bin',
          'icon',
          'files',
          'engines',
          'activationEvents',
          'contributes',
          'scripts',
          'peerDependencies',
          'peerDependenciesMeta',
          'dependencies',
          'optionalDependencies',
          'devDependencies',
          'pnpm',
          'overrides',
          'resolutions',
          'husky',
          'simple-git-hooks',
          'lint-staged',
          'eslintConfig',
        ],
        pathPattern: '^$',
      },
      {
        order: { type: 'asc' },
        pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$',
      },
      {
        order: { type: 'asc' },
        pathPattern: '^(?:resolutions|overrides|pnpm.overrides)$',
      },
      {
        order: [
          'types',
          'import',
          'require',
          'default',
        ],
        pathPattern: '^exports.*$',
      },
      {
        order: [
          // client hooks only
          'pre-commit',
          'prepare-commit-msg',
          'commit-msg',
          'post-commit',
          'pre-rebase',
          'post-rewrite',
          'post-checkout',
          'post-merge',
          'pre-push',
          'pre-auto-gc',
        ],
        pathPattern: '^(?:gitHooks|husky|simple-git-hooks)$',
      },
    ],
  },
})
