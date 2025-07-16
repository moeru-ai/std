import { describe, expect, it } from 'vitest'

import type { Option } from '../core'

import { none, some } from '../core'
import { and, andThen } from './and'
import { from } from './from'

describe('@moeru/results', () => {
  // https://doc.rust-lang.org/std/option/enum.Option.html#examples-23
  it('option.and', () => {
    let a = some(2)
    let b: Option<string> = none
    expect(and(a, b)).toStrictEqual(none)

    let c: Option<number> = none
    let d = some('foo')
    expect(and(c, d)).toStrictEqual(none)

    let e = some(2)
    let f = some('foo')
    expect(and(e, f)).toStrictEqual(some('foo'))

    let g: Option<number> = none
    let h: Option<string> = none
    expect(and(g, h)).toStrictEqual(none)
  })

  // https://doc.rust-lang.org/std/option/enum.Option.html#examples-24
  it('option.andThen', () => {
    let arr2D = [['A0', 'A1'], ['B0', 'B1']]
    let getArr2D = (index: number) => arr2D.at(index)
      ? some(arr2D[index])
      : none

    let item01 = andThen(getArr2D(0), row => from(row.at(1)))
    expect(item01).toStrictEqual(some('A1'))

    let item20 = andThen(getArr2D(2), row => from(row.at(0)))
    expect(item20).toStrictEqual(none)
  })
})
