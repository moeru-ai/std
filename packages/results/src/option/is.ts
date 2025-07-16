/* eslint-disable sonarjs/no-identical-functions */
import type { None, Option, Some } from '../core'

export const isOption = <T>(r: unknown): r is Option<T> =>
  r != null && typeof r === 'object' && '__type__' in r && typeof r.__type__ === 'string' && ['none', 'some'].includes(r.__type__)

export const isNone = <T>(o: Option<T>): o is None =>
  o.__type__ === 'none'

export const isNoneOr = <T>(o: Option<T>, onSomeValue: (v: T) => boolean): boolean =>
  isNone(o)
    ? true
    : onSomeValue(o.value)

export const isNoneOrAsync = async <T>(o: Option<T>, onSomeValue: (v: T) => Promise<boolean>): Promise<boolean> =>
  isNone(o)
    ? true
    : onSomeValue(o.value)

export const isSome = <T>(o: Option<T>): o is Some<T> =>
  o.__type__ === 'some'

export const isSomeAnd = <T>(o: Option<T>, onSomeValue: (v: T) => boolean): boolean =>
  isSome(o)
    ? onSomeValue(o.value)
    : false

export const isSomeAndAsync = async <T>(o: Option<T>, onSomeValue: (v: T) => Promise<boolean>): Promise<boolean> =>
  isSome(o)
    ? onSomeValue(o.value)
    : false
