import type { None, Option, Some } from './core'

export const isNone = <T>(o: Option<T>): o is None =>
  o.__mo === 'none'

export const isNoneOr = <T>(o: Option<T>, onSomeValue: (v: T) => boolean): boolean =>
  isNone(o)
    ? true
    : onSomeValue(o.value)

export const isNoneOrAsync = async <T>(o: Option<T>, onSomeValue: (v: T) => Promise<boolean>): Promise<boolean> =>
  isNone(o)
    ? true
    : await onSomeValue(o.value)

export const isSome = <T>(o: Option<T>): o is Some<T> =>
  o.__mo === 'some'

export const isSomeAnd = <T>(o: Option<T>, onSomeValue: (v: T) => boolean): boolean =>
  isSome(o)
    ? onSomeValue(o.value)
    : false

export const isSomeAndAsync = async <T>(o: Option<T>, onSomeValue: (v: T) => Promise<boolean>): Promise<boolean> =>
  isSome(o)
    ? await onSomeValue(o.value)
    : false

