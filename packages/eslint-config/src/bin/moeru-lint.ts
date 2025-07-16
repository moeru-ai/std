#!/usr/bin/env node
/* eslint-disable sonarjs/no-os-command-from-path */
/* eslint-disable no-console */
/* eslint-disable @masknet/no-top-level */

import { spawn } from 'node:child_process'
import { parseArgs } from 'node:util'

import { version } from '../../package.json'

const { values } = parseArgs({
  options: {
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
  const fix = values.fix ? '--fix' : ''
  const fixDangerously = values['fix-dangerously'] ? '--fix-dangerously' : ''
  const fixSuggestions = values['fix-suggestions'] ? '--fix-suggestions' : ''
  const cache = values['no-cache'] ? '' : '--cache'
  const flag = values.flag?.map(flag => `--flag ${flag}`).join(' ') ?? ''

  console.info('moeru-lint: executing oxlint...\n')
  const oxlint = spawn('oxlint', [fix, fixDangerously, fixSuggestions], { stdio: 'inherit' })

  oxlint.on('close', () => {
    console.info('\nmoeru-lint: executing eslint...\n')
    spawn('eslint', [cache, flag, fix, '.'], { stdio: 'inherit' })
  })
}
