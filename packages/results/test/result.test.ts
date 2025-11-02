import type { Result } from '../src'

import { describe, expect, it } from 'vitest'

import { err, ok } from '../src'
import { match, unwrap, wrap } from '../src/result'

describe('@moeru/results/result', () => {
  // @ts-expect-error vitest supports enum
  enum MathError {
    DivisionByZero = 'DivisionByZero',
    NegativeSquareRoot = 'NegativeSquareRoot',
    NonPositiveLogarithm = 'NonPositiveLogarithm',
  }

  type MathResult = Result<number, MathError>

  const div = (x: number, y: number): MathResult =>
    y === 0
      ? err(MathError.DivisionByZero)
      : ok(x / y)

  const sqrt = (x: number): MathResult =>
    x < 0
      ? err(MathError.NegativeSquareRoot)
      : ok(Math.sqrt(x))

  const ln = (x: number): MathResult =>
    x <= 0
      ? err(MathError.NonPositiveLogarithm)
      : ok(Math.log(x))

  // https://doc.rust-lang.org/rust-by-example/std/result.html
  it('basic', () => {
    const op = (x: number, y: number): number =>
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
    const op = (x: number, y: number): number => match(
      wrap(() => {
        const _ratio = unwrap(div(x, y))
        const _ln = unwrap(ln(_ratio))
        return sqrt(_ln)
      }),
      value => value,
      (err) => { throw err },
    )

    expect(() => op(1, 10)).toThrowErrorMatchingSnapshot()
    expect(() => op(1, 0)).toThrowErrorMatchingSnapshot()
  })
})
