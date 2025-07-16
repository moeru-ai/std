import { describe, expect, it } from 'vitest'

import type { Result } from '../core'

import { err, ok } from '../core'
import { or, orElse } from './or'

describe('@moeru/results', () => {
  // https://doc.rust-lang.org/std/result/enum.Result.html#examples-27
  it('or', () => {
    expect(or(ok(2), err('late error'))).toStrictEqual(ok(2))
    expect(or(err('early error'), ok(2))).toStrictEqual(ok(2))
    expect(or(err('not a 2'), err('late error'))).toStrictEqual(err('late error'))
    expect(or(ok(2), ok(100))).toStrictEqual(ok(2))
  })

  // https://doc.rust-lang.org/std/result/enum.Result.html#examples-28
  it('orElse', () => {
    let sq = (x: number): Result<number, number> => ok(x * x)
    let er = (x: number): Result<number, number> => err(x)

    expect(orElse(orElse<number, number>(ok(2), sq), sq)).toStrictEqual(ok(2))
    expect(orElse(orElse<number, number>(ok(2), er), sq)).toStrictEqual(ok(2))
    expect(orElse(orElse<number, number>(err(3), sq), er)).toStrictEqual(ok(9))
    expect(orElse(orElse<number, number>(err(3), er), er)).toStrictEqual(err(3))
  })
})
