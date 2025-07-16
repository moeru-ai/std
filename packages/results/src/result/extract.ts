import type { Result } from '../core'

import { isOk } from './is'

/** @experimental */
export const extract = <T, E>(r: Result<T, E>): E | T =>
  isOk(r)
    ? r.value
    : r.error
