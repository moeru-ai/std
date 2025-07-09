import type { Err, Ok, Result } from './core'

export const isOk = <T, E>(r: Result<T, E>): r is Ok<T> =>
  r.__mr === 'ok'

export const isOkAnd = <T, E>(r: Result<T, E>, onOk: (v: T) => boolean): boolean =>
  isOk(r)
    ? onOk(r.value)
    : false

export const isOkAndAsync = async <T, E>(r: Result<T, E>, onOk: (v: T) => Promise<boolean>): Promise<boolean> =>
  isOk(r)
    ? await onOk(r.value)
    : false

export const isErr = <T, E>(r: Result<T, E>): r is Err<E> =>
  r.__mr === 'err'

export const isErrAnd = <T, E>(r: Result<T, E>, onErr: (e: E) => boolean): boolean =>
  isErr(r)
    ? onErr(r.error)
    : false

export const isErrAndAsync = async <T, E>(r: Result<T, E>, onErr: (e: E) => Promise<boolean>): Promise<boolean> =>
  isErr(r)
    ? await onErr(r.error)
    : false

