import { describe, expect, it } from 'vitest'

import type { Result } from '../core'

import { err, ok } from '../core'
import { okOr } from '../option'
import { from } from '../option/from'
import { and, andThen } from './and'

describe('@moeru/results', () => {
  // https://doc.rust-lang.org/std/result/enum.Result.html#examples-25
  it('result.and', () => {
    expect(and(ok(2), err('late error'))).toStrictEqual(err('late error'))
    expect(and(err('early error'), ok('foo'))).toStrictEqual(err('early error'))
    expect(and(err('not a 2'), err('late error'))).toStrictEqual(err('not a 2'))
    expect(and(ok(2), ok('different result type'))).toStrictEqual(ok('different result type'))
  })

  // https://doc.rust-lang.org/std/result/enum.Result.html#examples-26
  it('result.andThen', () => {
    let arr2D = [['A0', 'A1'], ['B0', 'B1']]
    let getArr2D = (index: number): Result<string[], string> => arr2D.at(index)
      ? ok(arr2D[index])
      : err('not found')

    let item01 = andThen(getArr2D(0), row => okOr(from(row.at(1)), 'not found'))
    expect(item01).toStrictEqual(ok('A1'))

    let item20 = andThen(getArr2D(2), row => okOr(from(row.at(0)), 'not found'))
    expect(item20).toStrictEqual(err('not found'))
  })
})
