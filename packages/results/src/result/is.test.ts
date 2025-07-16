import { describe, expect, it } from 'vitest'

import { err, ok } from '../core'
import { isErr, isErrAnd, isOk, isOkAnd } from './is'

describe('@moeru/results', () => {
  // https://doc.rust-lang.org/std/result/enum.Result.html#examples-2
  it('result.isErr', () => {
    expect(isErr(ok(-3))).toBe(false)
    expect(isErr(err('Some error message'))).toBe(true)
  })

  // https://doc.rust-lang.org/std/result/enum.Result.html#examples-3
  it('result.isErrAnd', () => {
    enum ErrorKind {
      NotFound = 'NotFound',
      PermissionDenied = 'PermissionDenied',
    }

    expect(isErrAnd(err(ErrorKind.NotFound), e => e === ErrorKind.NotFound)).toBe(true)
    expect(isErrAnd(err(ErrorKind.PermissionDenied), e => e === ErrorKind.NotFound)).toBe(false)
    expect(isErrAnd(ok(123), e => e === ErrorKind.NotFound)).toBe(false)
    expect(isErrAnd(err('foo'), e => e.length > 1)).toBe(true)
  })

  // https://doc.rust-lang.org/std/result/enum.Result.html#examples
  it('result.isOk', () => {
    expect(isOk(ok(-3))).toBe(true)
    expect(isOk(err('Some error message'))).toBe(false)
  })

  // https://doc.rust-lang.org/std/result/enum.Result.html#examples-1
  it('result.isOkAnd', () => {
    expect(isOkAnd(ok(2), x => x > 1)).toBe(true)
    expect(isOkAnd(ok(0), x => x > 1)).toBe(false)
    expect(isOkAnd<number, string>(err('hey'), x => x > 1)).toBe(false)
    expect(isOkAnd(ok('foo'), x => x.length > 1)).toBe(true)
  })
})
