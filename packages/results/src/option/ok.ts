import type { Option, Result } from '../core'

import { err, ok } from '../core'
import { isSome } from './is'

export const okOr = <T, E>(o: Option<T>, error: E): Result<T, E> =>
  isSome(o)
    ? ok(o.value)
    : err(error)

export const okOrElse = <T, E>(o: Option<T>, onNone: () => E): Result<T, E> =>
  isSome(o)
    ? ok(o.value)
    : err(onNone())
