#!/usr/bin/env node

import { env } from 'node:process'
import { parseArgs } from 'node:util'

import { x } from 'tinyexec'

import pkg from '../package.json' with { type: 'json' }

const { positionals, values } = parseArgs({
  allowPositionals: true,
  options: {
    'debug': {
      default: false,
      short: 'd',
      type: 'boolean',
    },
    'fix': {
      default: false,
      short: 'f',
      type: 'boolean',
    },
    'fix-dangerously': {
      default: false,
      type: 'boolean',
    },
    'fix-suggestions': {
      default: false,
      type: 'boolean',
    },
    'flag': {
      multiple: true,
      type: 'string',
    },
    'help': {
      default: false,
      short: 'h',
      type: 'boolean',
    },
    'no-cache': {
      default: false,
      type: 'boolean',
    },
    'version': {
      default: false,
      short: 'v',
      type: 'boolean',
    },
  },
})

if (values.version) {
  console.info(pkg.version)
}
else if (values.help) {
  console.info('Usage: moeru-lint [--fix] [--flag <flag>]')
}
else {
  const path = positionals.at(0) ?? '.'

  const fix = values.fix ? '--fix' : ''
  const fixDangerously = values['fix-dangerously'] ? '--fix-dangerously' : ''
  const fixSuggestions = values['fix-suggestions'] ? '--fix-suggestions' : ''
  const cache = values['no-cache'] ? '' : '--cache'

  const oxcArgs = [fix, fixDangerously, fixSuggestions, path].filter(v => v.length > 0)
  const eslintArgs = [fix, cache, path].filter(v => v.length > 0)
  const eslintFlags = values.flag?.join(',')

  if (values.debug) {
    console.debug(`moeru-lint: v${pkg.version}`)
    console.debug(`oxlint args: ${oxcArgs.join(' ')}`)
    console.debug(`eslint args: ${eslintArgs.join(' ')}`)
    console.debug(`eslint flags: ${eslintFlags}`)
    console.debug('')
  }

  await x('oxlint', oxcArgs, { nodeOptions: { stdio: 'inherit' } })
    .pipe('eslint', eslintArgs, {
      nodeOptions: {
        stdio: 'inherit',
        env: {
          ...env,
          ESLINT_FLAGS: eslintFlags,
        }
      }
    })
}
