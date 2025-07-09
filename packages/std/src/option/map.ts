import type { Option } from './core'

import { some } from './core'
import { isSome } from './is'

export const map = <T1, T2>(o: Option<T1>, onSomeValue: (v: T1) => T2): Option<T2> =>
  isSome(o)
    ? some(onSomeValue(o.value))
    : o

export const mapAsync = async <T1, T2>(o: Option<T1>, onSomeValue: (v: T1) => Promise<T2>): Promise<Option<T2>> =>
  isSome(o)
    ? some(await onSomeValue(o.value))
    : o

export const mapOr = <T1, T2>(o: Option<T1>, onSomeValue: (v: T1) => T2, fallback: T2): T2 =>
    isSome(o)
      ? onSomeValue(o.value)
      : fallback

export const mapOrAsync = async <T1, T2>(o: Option<T1>, onSomeValue: (v: T1) => Promise<T2>, fallback: T2): Promise<T2> =>
    isSome(o)
      ? await onSomeValue(o.value)
      : fallback

export const mapOrElse = <T1, T2>(o: Option<T1>, onSomeValue: (v: T1) => T2, onNone: () => T2): T2 =>
  isSome(o)
    ? onSomeValue(o.value)
    : onNone()

export const mapOrElseAsync = async <T1, T2>(o: Option<T1>, onSomeValue: (v: T1) => Promise<T2>, onNone: () => Promise<T2>): Promise<T2> =>
  isSome(o)
    ? await onSomeValue(o.value)
    : await onNone()
