import type { Option } from '../core'

import { isSome } from './is'

export const or = <T>(o: Option<T>, fallback: Option<T>): Option<T> =>
  isSome(o)
    ? o
    : fallback

export const orElse = <T>(o: Option<T>, onNone: () => Option<T>): Option<T> =>
  isSome(o)
    ? o
    : onNone()

// eslint-disable-next-line sonarjs/no-identical-functions
export const orElseAsync = async <T>(o: Option<T>, onNone: () => Promise<Option<T>>): Promise<Option<T>> =>
  isSome(o)
    ? o
    : onNone()
