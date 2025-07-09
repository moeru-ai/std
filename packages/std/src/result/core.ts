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
