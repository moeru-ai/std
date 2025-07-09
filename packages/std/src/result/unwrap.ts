import type { Result } from './core'

import { isOk, isErr } from './is'

export const unwrap = <T, E>(r: Result<T, E>): T => {
  if (isOk(r))
    return r.value
  else
    throw r.error
}

export const unwrapErr = <T, E>(r: Result<T, E>): E => {
  if (isErr(r))
    return r.error
  else
    throw new Error('called `result.unwrapErr()` on a `Ok` value', { cause: r.value })
}

export const unwrapOr = <T, E>(r: Result<T, E>, fallback: T): T =>
  isOk(r)
    ? r.value
    : fallback

export const unwrapOrElse = <T, E>(r: Result<T, E>, onErrValue: (e: E) => T): T =>
  isOk(r)
    ? r.value
    : onErrValue(r.error)

export const unwrapOrElseAsync = async <T, E>(r: Result<T, E>, onErrValue: (e: E) => Promise<T>): Promise<T> =>
  isOk(r)
    ? r.value
    : await onErrValue(r.error)
