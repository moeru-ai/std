import type { Result } from '../core'

import { describe, expect, it } from 'vitest'

import { err, ok } from '../core'
import { flatten } from './flatten'

describe('@moeru/results', () => {
  // https://doc.rust-lang.org/std/result/enum.Result.html#examples-38
  it('result.flatten', () => {
    expect(flatten(ok(ok('hello')))).toStrictEqual(ok('hello'))
    expect(flatten(ok(err(6)))).toStrictEqual(err(6))
    // eslint-disable-next-line ts/no-unnecessary-type-assertion
    expect(flatten(err(6) as Result<Result<unknown, number>, number>)).toStrictEqual(err(6))
  })
})
