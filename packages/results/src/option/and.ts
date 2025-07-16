import type { Option } from '../core'

import { isSome } from './is'

export const and = <T1, T2>(o: Option<T1>, res: Option<T2>): Option<T2> =>
  isSome(o)
    ? res
    : o

export const andThen = <T1, T2>(o: Option<T1>, onSome: (s: T1) => Option<T2>): Option<T2> =>
  isSome(o)
    ? onSome(o.value)
    : o

// eslint-disable-next-line sonarjs/no-identical-functions
export const andThenAsync = async <T1, T2>(o: Option<T1>, onSome: (s: T1) => Promise<Option<T2>>): Promise<Option<T2>> =>
  isSome(o)
    ? onSome(o.value)
    : o
