import type { Ok, Result } from '../core'

import { isOk } from './is'

export const and = <T, E>(r: Result<T, E>, fallback: Result<T, E>): Result<T, E> =>
  isOk(r)
    ? r
    : fallback

export const andThen = <T1, T2, E>(r: Result<T1, E>, onOk: (o: Ok<T1>) => Result<T2, E>): Result<T2, E> =>
  isOk(r)
    ? onOk(r)
    : r

// eslint-disable-next-line sonarjs/no-identical-functions
export const andThenAsync = async <T1, T2, E>(r: Result<T1, E>, onOk: (o: Ok<T1>) => Promise<Result<T2, E>>): Promise<Result<T2, E>> =>
  isOk(r)
    ? onOk(r)
    : r
