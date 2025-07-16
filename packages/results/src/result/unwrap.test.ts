import { describe, expect, it } from 'vitest'

import { err, ok } from '../core'
import { unwrap, unwrapErr, unwrapOr, unwrapOrElse } from './unwrap'

describe('@moeru/results', () => {
  // https://doc.rust-lang.org/std/result/enum.Result.html#examples-19
  it('result.unwrap', () => {
    expect(unwrap(ok(2))).toBe(2)
    expect(() => unwrap(err('emergency failure'))).toThrowErrorMatchingSnapshot()
  })

  // https://doc.rust-lang.org/std/result/enum.Result.html#examples-22
  it('result.unwrapErr', () => {
    expect(() => unwrapErr(ok(2))).toThrowErrorMatchingSnapshot()
    expect(unwrapErr(err('emergency failure'))).toBe('emergency failure')
  })

  // https://doc.rust-lang.org/std/result/enum.Result.html#examples-29
  it('result.unwrapOr', () => {
    expect(unwrapOr(ok(9), 2)).toBe(9)
    expect(unwrapOr(err('error'), 2)).toBe(2)
  })

  // https://doc.rust-lang.org/std/result/enum.Result.html#examples-30
  it('result.unwrapOrElse', () => {
    let count = (x: string) => x.length

    expect(unwrapOrElse<number, string>(ok(2), count)).toBe(2)
    expect(unwrapOrElse(err('foo'), count)).toBe(3)
  })
})
