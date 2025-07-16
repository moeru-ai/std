export interface Err<E> {
  __type__: 'err'
  error: E
}

export interface None {
  __type__: 'none'
}

export interface Ok<T> {
  __type__: 'ok'
  value: T
}

export type Option<T> = None | Some<T>

export type Result<T, E> = Err<E> | Ok<T>

export interface Some<T> {
  __type__: 'some'
  value: T
}

export const err = <T, E>(error: E): Result<T, E> => ({
  __type__: 'err',
  error,
})

export const none: Option<never> = {
  __type__: 'none',
}

export const ok = <T, E>(value: T): Result<T, E> => ({
  __type__: 'ok',
  value,
})

export const some = <T>(value: T): Option<T> => ({
  __type__: 'some',
  value,
})
