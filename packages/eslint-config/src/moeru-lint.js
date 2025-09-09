#!/usr/bin/env node

import { spawn } from 'node:child_process'
import { parseArgs } from 'node:util'

import { version } from '../package.json' with { type: 'json' }

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
  console.info(version)
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
  const flag = values.flag?.map(flag => `--flag ${flag}`).join(' ') ?? ''

  const oxcArgs = [fix, fixDangerously, fixSuggestions, path]
  // eslint-disable-next-line sonarjs/no-nested-template-literals
  console.info(`moeru-lint: executing oxlint... ${values.debug ? `(${oxcArgs.join(' ')})` : ''}\n`)
  const oxlint = spawn('oxlint', oxcArgs, { stdio: 'inherit' })

  oxlint.on('close', () => {
    const eslintArgs = [cache, fix, flag, path]
    // eslint-disable-next-line sonarjs/no-nested-template-literals
    console.info(`\nmoeru-lint: executing eslint... ${values.debug ? `(${eslintArgs.join(' ')})` : ''}\n`)
    spawn('eslint', [eslintArgs.join(' ')], { stdio: 'inherit' })
  })
}
