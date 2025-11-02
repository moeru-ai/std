import type { Option } from '../core'

import { describe, expect, it } from 'vitest'

import { none, some } from '../core'
import { and, andThen } from './and'
import { from } from './from'

describe('@moeru/results', () => {
  // https://doc.rust-lang.org/std/option/enum.Option.html#examples-23
  it('option.and', () => {
    const a = some(2)
    const b: Option<string> = none
    expect(and(a, b)).toStrictEqual(none)

    const c: Option<number> = none
    const d = some('foo')
    expect(and(c, d)).toStrictEqual(none)

    const e = some(2)
    const f = some('foo')
    expect(and(e, f)).toStrictEqual(some('foo'))

    const g: Option<number> = none
    const h: Option<string> = none
    expect(and(g, h)).toStrictEqual(none)
  })

  // https://doc.rust-lang.org/std/option/enum.Option.html#examples-24
  it('option.andThen', () => {
    const arr2D = [['A0', 'A1'], ['B0', 'B1']]
    const getArr2D = (index: number) => arr2D.at(index)
      ? some(arr2D[index])
      : none

    const item01 = andThen(getArr2D(0), row => from(row.at(1)))
    expect(item01).toStrictEqual(some('A1'))

    const item20 = andThen(getArr2D(2), row => from(row.at(0)))
    expect(item20).toStrictEqual(none)
  })
})
