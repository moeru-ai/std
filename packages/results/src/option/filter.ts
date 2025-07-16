import type { Option } from '../core'

import { none } from '../core'
import { isSome } from './is'

export const filter = <T>(o: Option<T>, check: (v: T) => boolean): Option<T> =>
  isSome(o) && check(o.value)
    ? o
    : none

export const filterAsync = async <T>(o: Option<T>, check: (v: T) => Promise<boolean>): Promise<Option<T>> =>
  isSome(o) && await check(o.value)
    ? o
    : none
