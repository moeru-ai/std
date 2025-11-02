import type { Result } from '../core'

import { isResult } from './is'

/** @experimental */
export const wrap = <T, E>(cb: () => Result<T, E>): Result<T, E> => {
  try {
    return cb()
  }
  catch (error) {
    if (isResult(error))
      return error as Result<T, E>
    else
      throw error
  }
}

/** @experimental */
export const wrapAsync = async <T, E>(cb: () => Promise<Result<T, E>>): Promise<Result<T, E>> => {
  try {
    return await cb()
  }
  catch (error) {
    if (isResult(error))
      return error as Result<T, E>
    else
      throw error
  }
}
