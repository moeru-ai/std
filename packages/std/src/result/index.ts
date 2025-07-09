import type { Option } from '../option'

import { none, some } from '../option'

export interface Err<E> {
  __mr: 'err'
  error: E
}

export interface Ok<T> {
  __mr: 'ok'
  value: T
}

export type Result<T, E> = Err<E> | Ok<T>

export const err = <T, E>(error: E): Result<T, E> => ({
  __mr: 'err',
  error,
})

export const ok = <T, E>(value: T): Result<T, E> => ({
  __mr: 'ok',
  value,
})

export const isOk = <T, E>(r: Result<T, E>): r is Ok<T> =>
  r.__mr === 'ok'

export const isErr = <T, E>(r: Result<T, E>): r is Err<E> =>
  r.__mr === 'err'

export const or = <T, E>(r: Result<T, E>, fallback: Result<T, E>): Result<T, E> =>
  isOk(r)
    ? r
    : fallback

export const andThen = <T1, T2, E>(r: Result<T1, E>, onOk: (o: Ok<T1>) => Result<T2, E>): Result<T2, E> =>
  isOk(r)
    ? onOk(r)
    : r

// eslint-disable-next-line sonarjs/no-identical-functions
export const andThenAsync = async <T1, T2, E>(r: Result<T1, E>, onOk: (o: Ok<T1>) => Promise<Result<T2, E>>): Promise<Result<T2, E>> =>
  isOk(r)
    ? onOk(r)
    : r

export const map = <T1, T2, E>(r: Result<T1, E>, onOkValue: (v: T1) => T2): Result<T2, E> =>
  isOk(r)
    ? ok(onOkValue(r.value))
    : r

export const mapAsync = async <T1, T2, E>(r: Result<T1, E>, onOkValue: (v: T1) => Promise<T2>): Promise<Result<T2, E>> =>
  isOk(r)
    ? ok(await onOkValue(r.value))
    : r

export const mapErr = <T, E1, E2>(r: Result<T, E1>, onErrValue: (v: E1) => E2): Result<T, E2> =>
  isErr(r)
    ? err(onErrValue(r.error))
    : r

export const mapErrAsync = async <T, E1, E2>(r: Result<T, E1>, onErrValue: (v: E1) => Promise<E2>): Promise<Result<T, E2>> =>
  isErr(r)
    ? err(await onErrValue(r.error))
    : r

export const expect = <T, E>(r: Result<T, E>, msg: string): T => {
  if (isOk(r))
    return r.value
  else
    throw new Error(msg, { cause: r.error })
}

export const unwrap = <T, E>(r: Result<T, E>): T => {
  if (isOk(r))
    return r.value
  else
    throw r.error
}

export const unwrapOr = <T, E>(r: Result<T, E>, fallback: T): T =>
  isOk(r)
    ? r.value
    : fallback

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

/** @experimental */
export const extract = <T, E>(r: Result<T, E>): E | T =>
  isOk(r)
    ? r.value
    : r.error
