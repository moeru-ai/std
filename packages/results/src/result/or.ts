import type { Result } from './core'

import { isOk } from './is'

export const or = <T, E>(r: Result<T, E>, fallback: Result<T, E>): Result<T, E> =>
  isOk(r)
    ? r
    : fallback

export const orElse = <T, E>(r: Result<T, E>, onErrValue: (e: E) => Result<T, E>): Result<T, E> =>
  isOk(r)
    ? r
    : onErrValue(r.error)

// eslint-disable-next-line sonarjs/no-identical-functions
export const orElseAsync = async <T, E>(r: Result<T, E>, onErrValue: (e: E) => Promise<Result<T, E>>): Promise<Result<T, E>> =>
  isOk(r)
    ? r
    : onErrValue(r.error)
