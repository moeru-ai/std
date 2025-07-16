# @moeru/eslint-config

> Small and tree-shakeable Result/Option implementation.

## Usage

### Result

> compare with [Rust by Example](https://doc.rust-lang.org/rust-by-example/std/option.html)

```ts
import type { Option } from '@moeru/results'

import { none, option as o, some } from '@moeru/results'

const checkedDivision = (dividend: number, divisor: number): Option<number> =>
  divisor === 0
    ? none
    : some(dividend / divisor)

const tryDivision = (dividend: number, divisor: number) =>
  o.match(
    checkedDivision(dividend, divisor),
    quotient => `${dividend} / ${divisor} = ${quotient}`,
    () => { throw new Error(`${dividend} / ${divisor} failed!`) },
  )

const main = () => {
  tryDivision(4, 2) // "4 / 2 = 2"
  tryDivision(1, 0) // throw error

  let optionalFloat = some(0)

  console.log(`${optionalFloat} unwraps to ${o.unwrap(optionalFloat)}`)
  console.log(`${none} unwraps to ${o.unwrap(none)}`) // throw error
}
```

### Result

> compare with [Rust by Example](https://doc.rust-lang.org/rust-by-example/std/result.html)

```ts
import type { Result } from '@moeru/results'

import { err, ok, result as r } from '@moeru/results'

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

const op = (x: number, y: number): number =>
  r.match(
    div(x, y),
    radio => r.match(
      ln(radio),
      ln => r.match(
        sqrt(ln),
        sqrt => sqrt,
        (err) => { throw err },
      ),
      (err) => { throw err },
    ),
    (err) => { throw err },
  )

const main = () =>
  console.log(op(1, 10))
```

#### Wrap

With the `wrap` method, you can achieve something like the question mark operator in Rust.

```diff
const op = (x: number, y: number): number =>
  r.match(
-   div(x, y),
-   radio => r.match(
-     ln(radio),
-     ln => r.match(
-       sqrt(ln),
-       sqrt => sqrt,
-       (err) => { throw err },
-     ),
-     (err) => { throw err },
-   ),
+   r.wrap(() => {
+     let _ratio = unwrap(div(x, y))
+     let _ln = unwrap(ln(_ratio))
+     return sqrt(_ln)
+   }),
+   (value) => value,
    (err) => { throw err },
  )
```

## License

[MIT](../../LICENSE.md)
