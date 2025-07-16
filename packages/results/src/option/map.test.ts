import { describe, expect, it } from 'vitest'

import { none, some } from '../core'
import { map, mapOr, mapOrElse } from './map'

describe('@moeru/results', () => {
  // https://doc.rust-lang.org/std/option/enum.Option.html#examples-14
  it('option.map', () => {
    expect(map(some('Hello, World!'), s => s.length)).toStrictEqual(some(13))
    expect(map<string, number>(none, s => s.length)).toStrictEqual(none)
  })

  // https://doc.rust-lang.org/std/option/enum.Option.html#examples-16
  it('option.mapOr', () => {
    expect(mapOr(some('foo'), s => s.length, 42)).toBe(3)
    expect(mapOr<string, number>(none, s => s.length, 42)).toBe(42)
  })

  // https://doc.rust-lang.org/std/option/enum.Option.html#basic-examples
  it('option.mapOrElse', () => {
    expect(mapOrElse(some('foo'), s => s.length, () => 42)).toBe(3)
    expect(mapOrElse<string, number>(none, s => s.length, () => 42)).toBe(42)
  })
})
