import type { Option } from '../option/core'
import type { Result } from './core'

import { none, some } from '../option/core'
import { isErr, isOk } from './is'

// Originally Result.ok(), renamed optionOk due to naming conflict
export const optionOk = <T, E>(r: Result<T, E>): Option<T> =>
  isOk(r)
    ? some(r.value)
    : none

// Originally Result.err(), renamed optionErr due to naming conflict
export const optionErr = <T, E>(r: Result<T, E>): Option<E> =>
  isErr(r)
    ? some(r.error)
    : none
