import { describe, expect, it } from 'vitest'

import { none, some } from '../core'
import { unwrap, unwrapOr, unwrapOrElse } from './unwrap'

describe('@moeru/results', () => {
  // https://doc.rust-lang.org/std/option/enum.Option.html#examples-9
  it('option.unwrap', () => {
    expect(unwrap(some('air'))).toBe('air')
    expect(() => unwrap(none)).toThrowErrorMatchingSnapshot()
  })

  // https://doc.rust-lang.org/std/option/enum.Option.html#examples-10
  it('option.unwrapOr', () => {
    expect(unwrapOr(some('car'), 'bike')).toBe('car')
    expect(unwrapOr(none, 'bike')).toBe('bike')
  })

  // https://doc.rust-lang.org/std/option/enum.Option.html#examples-11
  it('option.unwrapOrElse', () => {
    expect(unwrapOrElse(some(4), () => 20)).toBe(4)
    expect(unwrapOrElse(none, () => 20)).toBe(20)
  })
})
