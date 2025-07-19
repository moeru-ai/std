/**
 * ErrorLike utility interface for containing error-like objects.
 */
export type ErrorLike<C = unknown> = Nullable<Partial<Pick<Error, 'stack'>>> & Pick<Error, 'message' | 'name'> & { cause?: C }

type Nullable<T> = {
  [P in keyof T]: null | T[P]
}

export const isError = (err: null | undefined | unknown): err is Error =>
  err instanceof Error

export const isErrorLike = <C = unknown>(err: null | undefined | unknown): err is ErrorLike<C> => {
  if (err == null)
    return false

  if (err instanceof Error)
    return true

  if (typeof err !== 'object')
    return false

  return 'name' in err && typeof err.name === 'string' && 'message' in err && typeof err.message === 'string'
}

export const errorNameFrom = (err: null | undefined | unknown): string | undefined =>
  isErrorLike(err)
    ? err.name
    : undefined

export const errorMessageFrom = (err: null | undefined | unknown): string | undefined =>
  isErrorLike(err)
    ? err.message
    : undefined

export const errorStackFrom = (err: null | undefined | unknown): null | string | undefined =>
  isErrorLike(err)
    ? err.stack ?? new Error(errorMessageFrom(err)).stack
    : undefined

export const errorCauseFrom = <C>(err: null | undefined | unknown): C | undefined => {
  if (!isErrorLike(err) || err.cause == null)
    return undefined

  // eslint-disable-next-line @masknet/type-prefer-return-type-annotation
  return err.cause as C | undefined
}

export const isErrorEq = (src: null | undefined | unknown, target: null | undefined | unknown): boolean => {
  if (!isErrorLike(src) || !isErrorLike(target))
    return false

  return errorNameFrom(src) === errorNameFrom(target)
    && errorMessageFrom(src) === errorMessageFrom(target)
}

export const isErrorTypeEq = (src: null | undefined | unknown, target: null | undefined | unknown): boolean => {
  if (!isErrorLike(src) || !isErrorLike(target))
    return false

  return errorNameFrom(src) === errorNameFrom(target)
}
