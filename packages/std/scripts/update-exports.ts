import { readdir, readFile, writeFile } from 'node:fs/promises'

const entries = await readdir('./src', { withFileTypes: true })

const exports: string[] = []

for (const entry of entries) {
  if (entry.isDirectory())
    exports.push(entry.name)
}

const packageJson = JSON.parse(await readFile('./package.json', 'utf8')) as Record<string, unknown>

packageJson.exports = Object.fromEntries([
  ['.', './src/index.ts'],
  ...exports.map(e => [`./${e}`, `./src/${e}/index.ts`]),
])

packageJson.publishConfig = {
  exports: Object.fromEntries([
    ['.', {
      types: './dist/index.d.ts',
      // eslint-disable-next-line perfectionist/sort-objects
      default: './dist/index.js',
    }],
    ...exports.map(e => [`./${e}`, {
      types: `./dist/${e}/index.d.ts`,
      // eslint-disable-next-line perfectionist/sort-objects
      default: `./dist/${e}/index.js`,
    }]),
    ['./package.json', './package.json'],
  ]),
  main: './dist/index.js',
  types: './dist/index.d.ts',
} satisfies Record<string, unknown>

await writeFile('./package.json', `${JSON.stringify(packageJson, null, 2)}\n`)
console.log('Updated: ./package.json')

const indexTs = exports.map(e => `export * from './${e}'`).join('\n')

await writeFile('./src/index.ts', `${indexTs}\n`)
console.log('Updated: ./src/index.ts')
