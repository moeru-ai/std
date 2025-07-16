import { describe, expect, it } from 'vitest'

import { err } from '../core'
import { from } from './from'
import { inspect, inspectErr } from './inspect'
import { map } from './map'

describe('@moeru/results', () => {
  // https://doc.rust-lang.org/std/result/enum.Result.html#examples-12
  it('result.inspect', () => {
    let inspected = false
    let number = 0

    inspect(
      map(
        from(() => Number.parseInt('4')),
        num => num ** 3,
      ),
      (num) => {
        inspected = true
        number = num
      },
    )

    expect(inspected).toBe(true)
    expect(number).toBe(64)
  })

  it('result.inspectErr', () => {
    let inspected = false
    let message = 'failed: '

    inspectErr(
      err('foo'),
      (e) => {
        inspected = true
        message += e
      },
    )

    expect(inspected).toBe(true)
    expect(message).toBe('failed: foo')
  })
})
