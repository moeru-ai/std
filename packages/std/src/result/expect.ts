import type { Result } from './core'

import { isOk, isErr } from './is'

export const expect = <T, E>(r: Result<T, E>, msg: string): T => {
  if (isOk(r))
    return r.value
  else
    throw new Error(msg, { cause: r.error })
}

export const expectErr = <T, E>(r: Result<T, E>, msg: string): E => {
  if (isErr(r))
    return r.error
  else
    throw new Error(msg, { cause: r.value })
}

