import type { Result } from '../core'

import { isOk } from './is'

export const and = <T1, T2, E>(r: Result<T1, E>, res: Result<T2, E>): Result<T1 | T2, E> =>
  isOk(r)
    ? res
    : r

export const andThen = <T1, T2, E>(r: Result<T1, E>, onOk: (o: T1) => Result<T2, E>): Result<T2, E> =>
  isOk(r)
    ? onOk(r.value)
    : r

// eslint-disable-next-line sonarjs/no-identical-functions
export const andThenAsync = async <T1, T2, E>(r: Result<T1, E>, onOk: (o: T1) => Promise<Result<T2, E>>): Promise<Result<T2, E>> =>
  isOk(r)
    ? onOk(r.value)
    : r
