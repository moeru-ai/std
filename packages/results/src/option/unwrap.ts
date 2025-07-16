import type { Option } from '../core'

import { isSome } from './is'

export const unwrap = <T>(o: Option<T>): T => {
  if (isSome(o))
    return o.value
  else
    throw new Error('called `option.unwrap()` on a `None` value')
}

export const unwrapOr = <T>(o: Option<T>, fallback: T): T =>
  isSome(o)
    ? o.value
    : fallback

export const unwrapOrElse = <T>(o: Option<T>, onNone: () => T): T =>
  isSome(o)
    ? o.value
    : onNone()

// eslint-disable-next-line sonarjs/no-identical-functions
export const unwrapOrElseAsync = async <T>(o: Option<T>, onNone: () => Promise<T>): Promise<T> =>
  isSome(o)
    ? o.value
    : onNone()
