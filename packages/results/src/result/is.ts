/* eslint-disable sonarjs/no-identical-functions */
import type { Err, Ok, Result } from '../core'

export const isResult = <T, E>(r: unknown): r is Result<T, E> =>
  r != null && typeof r === 'object' && '__type__' in r && typeof r.__type__ === 'string' && ['err', 'ok'].includes(r.__type__)

export const isOk = <T, E>(r: Result<T, E>): r is Ok<T> =>
  r.__type__ === 'ok'

export const isOkAnd = <T, E>(r: Result<T, E>, onOk: (v: T) => boolean): boolean =>
  isOk(r)
    ? onOk(r.value)
    : false

export const isOkAndAsync = async <T, E>(r: Result<T, E>, onOk: (v: T) => Promise<boolean>): Promise<boolean> =>
  isOk(r)
    ? onOk(r.value)
    : false

export const isErr = <T, E>(r: Result<T, E>): r is Err<E> =>
  r.__type__ === 'err'

export const isErrAnd = <T, E>(r: Result<T, E>, onErr: (e: E) => boolean): boolean =>
  isErr(r)
    ? onErr(r.error)
    : false

export const isErrAndAsync = async <T, E>(r: Result<T, E>, onErr: (e: E) => Promise<boolean>): Promise<boolean> =>
  isErr(r)
    ? onErr(r.error)
    : false
