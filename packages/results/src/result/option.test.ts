import { describe, expect, it } from 'vitest'

import { err, none, ok, some } from '../core'
import { optionErr, optionOk } from './option'

describe('@moeru/results', () => {
  // https://doc.rust-lang.org/std/result/enum.Result.html#examples-5
  it('result.optionErr', () => {
    expect(optionErr(ok(2))).toStrictEqual(none)
    expect(optionErr(err('Nothing here'))).toStrictEqual(some('Nothing here'))
  })

  // https://doc.rust-lang.org/std/result/enum.Result.html#examples-4
  it('result.optionOk', () => {
    expect(optionOk(ok(2))).toStrictEqual(some(2))
    expect(optionOk(err('Nothing here'))).toStrictEqual(none)
  })
})
