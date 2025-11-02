import type { Result } from '../core'

import { err, ok } from '../core'

/** @experimental */
export const from = <T, E = Error>(cb: () => T): Result<T, E> => {
  try {
    return ok(cb())
  }
  catch (e) {
    return err(e) as Result<T, E>
  }
}
