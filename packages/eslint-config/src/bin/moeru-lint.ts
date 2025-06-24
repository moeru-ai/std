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
  let fix = values.fix ? '--fix' : ''
  let fixDangerously = values['fix-dangerously'] ? '--fix-dangerously' : ''
  let fixSuggestions = values['fix-suggestions'] ? '--fix-suggestions' : ''
  let cache = values['no-cache'] ? '' : '--cache'
  let flag = values.flag?.map(flag => `--flag ${flag}`).join(' ') ?? ''

  console.info('moeru-lint: executing oxlint...\n')
  let oxlint = spawn('oxlint', [fix, fixDangerously, fixSuggestions], { stdio: 'inherit' })

  oxlint.on('close', () => {
    console.info('\nmoeru-lint: executing eslint...\n')
    spawn('eslint', [cache, flag, fix, '.'], { stdio: 'inherit' })
  })
}
