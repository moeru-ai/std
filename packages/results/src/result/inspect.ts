import type { Result } from '../core'

import { isErr, isOk } from './is'

export const inspect = <T, E>(r: Result<T, E>, onOk: (o: T) => unknown): Result<T, E> => {
  if (isOk(r))
    onOk(r.value)

  return r
}

export const inspectAsync = async <T, E>(r: Result<T, E>, onOk: (o: T) => Promise<unknown>): Promise<Result<T, E>> => {
  if (isOk(r))
    await onOk(r.value)

  return r
}

export const inspectErr = <T, E>(r: Result<T, E>, onErr: (e: E) => unknown): Result<T, E> => {
  if (isErr(r))
    onErr(r.error)

  return r
}

export const inspectErrAsync = async <T, E>(r: Result<T, E>, onErr: (e: E) => Promise<unknown>): Promise<Result<T, E>> => {
  if (isErr(r))
    await onErr(r.error)

  return r
}
