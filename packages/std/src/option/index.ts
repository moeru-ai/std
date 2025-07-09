export interface None {
  __mo: 'none'
}

export type Option<T> = None | Some<T>

export interface Some<T> {
  __mo: 'some'
  value: T
}

export const none: Option<never> = {
  __mo: 'none',
}

export const some = <T>(value: T): Option<T> => ({
  __mo: 'some',
  value,
})

export const isSome = <T>(o: Option<T>): o is Some<T> =>
  o.__mo === 'some'

export const isNone = <T>(o: Option<T>): o is None =>
  o.__mo === 'none'

export const or = <T>(o: Option<T>, fallback: Option<T>): Option<T> =>
  isSome(o)
    ? o
    : fallback

export const andThen = <T1, T2>(o: Option<T1>, onSome: (s: Some<T1>) => Option<T2>): Option<T2> =>
  isSome(o)
    ? onSome(o)
    : o

// eslint-disable-next-line sonarjs/no-identical-functions
export const andThenAsync = async <T1, T2>(o: Option<T1>, onSome: (s: Some<T1>) => Promise<Option<T2>>): Promise<Option<T2>> =>
  isSome(o)
    ? onSome(o)
    : o

export const map = <T1, T2>(o: Option<T1>, onSomeValue: (v: T1) => T2): Option<T2> =>
  isSome(o)
    ? some(onSomeValue(o.value))
    : o

export const mapAsync = async <T1, T2>(o: Option<T1>, onSomeValue: (v: T1) => Promise<T2>): Promise<Option<T2>> =>
  isSome(o)
    ? some(await onSomeValue(o.value))
    : o

export const match = <T1, T2>(o: Option<T1>, onSome: (s: Some<T1>) => T2, onNone: () => T2) =>
  isSome(o)
    ? onSome(o)
    : onNone()

/** @experimental */
export const extract = <T>(o: Option<T>): T | undefined =>
  isSome(o)
    ? o.value
    : undefined
