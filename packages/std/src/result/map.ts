/* eslint-disable sonarjs/no-identical-functions */
import type { Result } from './core'

import { err, ok } from './core'
import { isErr, isOk } from './is'

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

export const mapOr = <T1, T2, E>(r: Result<T1, E>, onOkValue: (v: T1) => T2, fallback: T2): T2 =>
  isOk(r)
    ? onOkValue(r.value)
    : fallback

export const mapOrAsync = async <T1, T2, E>(r: Result<T1, E>, onOkValue: (v: T1) => Promise<T2>, fallback: T2): Promise<T2> =>
  isOk(r)
    ? onOkValue(r.value)
    : fallback

export const mapOrElse = <T1, T2, E>(r: Result<T1, E>, onOkValue: (v: T1) => T2, onErrValue: (e: E) => T2): T2 =>
  isOk(r)
    ? onOkValue(r.value)
    : onErrValue(r.error)

export const mapOrElseAsync = async <T1, T2, E>(r: Result<T1, E>, onOkValue: (v: T1) => Promise<T2>, onErrValue: (e: E) => Promise<T2>): Promise<T2> =>
  isOk(r)
    ? onOkValue(r.value)
    : onErrValue(r.error)
