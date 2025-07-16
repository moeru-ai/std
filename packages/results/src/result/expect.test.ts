import { describe, expect, it } from 'vitest'

import { err, ok } from '../core'
import { expectErr, expect as expectOk } from './expect'

describe('@moeru/results', () => {
  // https://doc.rust-lang.org/std/result/enum.Result.html#examples-18
  it('result.expect', () => {
    expect(() => expectOk(err('emergency failure'), 'Testing expect')).toThrowErrorMatchingSnapshot()
  })

  // https://doc.rust-lang.org/std/result/enum.Result.html#examples-21
  it('result.expectErr', () => {
    expect(() => expectErr(ok(10), 'Testing expectErr')).toThrowErrorMatchingSnapshot()
  })
})
