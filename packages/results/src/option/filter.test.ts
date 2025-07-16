import { describe, expect, it } from 'vitest'

import { none, some } from '../core'
import { filter } from './filter'

describe('@moeru/results', () => {
  // https://doc.rust-lang.org/std/option/enum.Option.html#examples-25
  it('option.filter', () => {
    let isEven = (n: number) => n % 2 === 0

    expect(filter(none, isEven)).toStrictEqual(none)
    expect(filter(some(3), isEven)).toStrictEqual(none)
    expect(filter(some(4), isEven)).toStrictEqual(some(4))
  })
})
