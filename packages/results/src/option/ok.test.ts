import { describe, expect, it } from 'vitest'

import { err, none, ok, some } from '../core'
import { okOr, okOrElse } from './ok'

describe('@moeru/results', () => {
  // https://doc.rust-lang.org/std/option/enum.Option.html#examples-17
  it('option.okOr', () => {
    expect(okOr(some('foo'), 0)).toStrictEqual(ok('foo'))
    expect(okOr(none, 0)).toStrictEqual(err(0))
  })

  // https://doc.rust-lang.org/std/option/enum.Option.html#examples-18
  it('option.okOrElse', () => {
    expect(okOrElse(some('foo'), () => 0)).toStrictEqual(ok('foo'))
    expect(okOrElse(none, () => 0)).toStrictEqual(err(0))
  })
})
