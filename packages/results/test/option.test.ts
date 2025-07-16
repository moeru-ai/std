import { describe, expect, it } from 'vitest'

import type { Option } from '../src'

import { none, some } from '../src'
import { match, unwrap } from '../src/option'

describe('@moeru/results/option', () => {
  it('basic', () => {
    const checkedDivision = (dividend: number, divisor: number): Option<number> =>
      divisor === 0
        ? none
        : some(dividend / divisor)

    const tryDivision = (dividend: number, divisor: number) =>
      match(
        checkedDivision(dividend, divisor),
        quotient => `${dividend} / ${divisor} = ${quotient}`,
        () => { throw new Error(`${dividend} / ${divisor} failed!`) },
      )

    expect(tryDivision(4, 2)).toBe('4 / 2 = 2')
    expect(() => tryDivision(1, 0)).toThrowErrorMatchingSnapshot()

    const optionalFloat = some(0)
    expect(unwrap(optionalFloat)).toBe(0)
    expect(() => unwrap(none)).toThrowErrorMatchingSnapshot()
  })
})
