import { readdir, readFile, writeFile } from 'node:fs/promises'

const entries = await readdir('./src', { withFileTypes: true })

const exports: string[] = []

for (let entry of entries) {
  if (entry.isDirectory())
    exports.push(entry.name)
}

const packageJson = JSON.parse(await readFile('./package.json', 'utf8')) as Record<string, unknown>

packageJson.exports = Object.fromEntries(
  exports.map(e => [`./${e}`, `./src/${e}/index.ts`]),
)

packageJson.publishConfig = {
  exports: Object.fromEntries([
    ...exports.map(e => [`./${e}`, {
      types: `./dist/${e}/index.d.ts`,
      // eslint-disable-next-line perfectionist/sort-objects
      default: `./dist/${e}/index.js`,
    }]),
    ['./package.json', './package.json'],
  ]),
} satisfies Record<string, unknown>

await writeFile('./package.json', `${JSON.stringify(packageJson, null, 2)}\n`)
console.log('Updated: ./package.json')
