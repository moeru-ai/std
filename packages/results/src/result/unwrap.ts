import type { Result } from './core'

import { isErr, isOk } from './is'

export const unwrap = <T, E>(r: Result<T, E>): T => {
  if (isOk(r))
    return r.value
  else if (r.error instanceof Error)
    throw r.error
  else
    throw new Error('called `result.unwrap()` on an `Err` value', { cause: r.error })
}

export const unwrapErr = <T, E>(r: Result<T, E>): E => {
  if (isErr(r))
    return r.error
  else
    throw new Error('called `result.unwrapErr()` on an `Ok` value', { cause: r.value })
}

export const unwrapOr = <T, E>(r: Result<T, E>, fallback: T): T =>
  isOk(r)
    ? r.value
    : fallback

export const unwrapOrElse = <T, E>(r: Result<T, E>, onErrValue: (e: E) => T): T =>
  isOk(r)
    ? r.value
    : onErrValue(r.error)

// eslint-disable-next-line sonarjs/no-identical-functions
export const unwrapOrElseAsync = async <T, E>(r: Result<T, E>, onErrValue: (e: E) => Promise<T>): Promise<T> =>
  isOk(r)
    ? r.value
    : onErrValue(r.error)
