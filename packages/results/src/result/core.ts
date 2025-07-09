export interface Err<E> {
  __type__: 'err'
  error: E
}

export interface Ok<T> {
  __type__: 'ok'
  value: T
}

export type Result<T, E> = Err<E> | Ok<T>

export const err = <T, E>(error: E): Result<T, E> => ({
  __type__: 'err',
  error,
})

export const ok = <T, E>(value: T): Result<T, E> => ({
  __type__: 'ok',
  value,
})
