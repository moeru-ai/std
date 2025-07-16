import { describe, expect, it } from 'vitest'

import type { Result } from '../src'

import { err, match, ok, unwrap, wrap } from '../src/result'

describe('@moeru/results/result', () => {
  enum MathError {
    DivisionByZero = 'DivisionByZero',
    NegativeSquareRoot = 'NegativeSquareRoot',
    NonPositiveLogarithm = 'NonPositiveLogarithm',
  }

  type MathResult = Result<number, MathError>

  let div = (x: number, y: number): MathResult =>
    y === 0
      ? err(MathError.DivisionByZero)
      : ok(x / y)

  let sqrt = (x: number): MathResult =>
    x < 0
      ? err(MathError.NegativeSquareRoot)
      : ok(Math.sqrt(x))

  let ln = (x: number): MathResult =>
    x <= 0
      ? err(MathError.NonPositiveLogarithm)
      : ok(Math.log(x))

  // https://doc.rust-lang.org/rust-by-example/std/result.html
  it('basic', () => {
    let op = (x: number, y: number): number =>
      match(
        div(x, y),
        radio => match(
          ln(radio),
          // eslint-disable-next-line sonarjs/no-nested-functions
          ln => match(
            sqrt(ln),
            sqrt => sqrt,
            (err) => { throw err },
          ),
          // eslint-disable-next-line sonarjs/no-nested-functions
          (err) => { throw err },
        ),
        (err) => { throw err },
      )

    expect(() => op(1, 10)).toThrowErrorMatchingSnapshot()
    expect(() => op(1, 0)).toThrowErrorMatchingSnapshot()
  })

  // https://doc.rust-lang.org/rust-by-example/std/result/question_mark.html
  it('wrap', () => {
    let op = (x: number, y: number): number => match(
      wrap(() => {
        let ratio = unwrap(div(x, y))
        let _ln = unwrap(ln(ratio))
        return sqrt(_ln)
      }),
      value => value,
      (err) => { throw err },
    )

    expect(() => op(1, 10)).toThrowErrorMatchingSnapshot()
    expect(() => op(1, 0)).toThrowErrorMatchingSnapshot()
  })
})
