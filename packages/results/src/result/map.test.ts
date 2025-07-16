import { describe, expect, it } from 'vitest'

import { err, ok } from '../core'
import { map, mapErr, mapOr, mapOrElse } from './map'

describe('@moeru/results', () => {
  // https://doc.rust-lang.org/std/result/enum.Result.html#examples-8
  it('result.map', () => {
    expect(map(ok('114514'), num => Number.parseInt(num) * 2)).toStrictEqual(ok(229028))
  })

  // https://doc.rust-lang.org/std/result/enum.Result.html#examples-9
  it('result.mapOr', () => {
    expect(mapOr(ok('foo'), x => x.length, 3)).toBe(3)
    expect(mapOr<string, number, string>(err('bar'), x => x.length, 42)).toBe(42)
  })

  // https://doc.rust-lang.org/std/result/enum.Result.html#examples-10
  it('result.mapOrElse', () => {
    expect(mapOrElse(ok('foo'), x => x.length, () => 42)).toBe(3)
    expect(mapOrElse<string, number, string>(err('bar'), x => x.length, () => 42)).toBe(42)
  })

  // https://doc.rust-lang.org/std/result/enum.Result.html#examples-11
  it('result.mapErr', () => {
    const stringify = (str: number | string) => `error code: ${str}`

    expect(mapErr<number, string, string>(ok(2), stringify)).toStrictEqual(ok(2))
    expect(mapErr<number, number, string>(err(13), stringify)).toStrictEqual(err('error code: 13'))
  })
})
