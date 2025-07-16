import { describe, expect, it } from 'vitest'

import { none, some } from '../core'
import { isNone, isNoneOr, isSome, isSomeAnd } from './is'

describe('@moeru/results', () => {
  // https://doc.rust-lang.org/std/option/enum.Option.html#examples-2
  it('option.isNone', () => {
    expect(isNone(some(2))).toBe(false)
    expect(isNone(none)).toBe(true)
  })

  // https://doc.rust-lang.org/std/option/enum.Option.html#examples-3
  it('option.isNoneOr', () => {
    expect(isNoneOr(some(2), x => x > 1)).toBe(true)
    expect(isNoneOr(some(0), x => x > 1)).toBe(false)
    expect(isNoneOr(none, x => x > 1)).toBe(true)
    expect(isNoneOr(some('foo'), x => x.length > 1)).toBe(true)
  })

  // https://doc.rust-lang.org/std/option/enum.Option.html#examples
  it('option.isSome', () => {
    expect(isSome(some(2))).toBe(true)
    expect(isSome(none)).toBe(false)
  })

  // https://doc.rust-lang.org/std/option/enum.Option.html#examples-1
  it('option.isSomeAnd', () => {
    expect(isSomeAnd(some(2), x => x > 1)).toBe(true)
    expect(isSomeAnd(some(0), x => x > 1)).toBe(false)
    expect(isSomeAnd(none, x => x > 1)).toBe(false)
    expect(isSomeAnd(some('foo'), x => x.length > 1)).toBe(true)
  })
})
