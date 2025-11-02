import type { Option } from '../core'

import { isOption } from './is'

/** @experimental */
export const wrap = <T>(cb: () => Option<T>): Option<T> => {
  try {
    return cb()
  }
  catch (error) {
    if (isOption(error))
      return error as Option<T>
    else
      throw error
  }
}

/** @experimental */
export const wrapAsync = async <T>(cb: () => Promise<Option<T>>): Promise<Option<T>> => {
  try {
    return await cb()
  }
  catch (error) {
    if (isOption(error))
      return error as Option<T>
    else
      throw error
  }
}
