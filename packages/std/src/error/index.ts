export interface ErrorLike {
  cause?: unknown
  message: string
  name: string
  stack?: null | string
}

export const isError = (err: unknown): err is Error =>
  err instanceof Error

export const isErrorLike = (err: unknown): err is ErrorLike => {
  if (isError(err))
    return true

  if (err == null || typeof err !== 'object')
    return false

  return 'message' in err
    && typeof err.message === 'string'
    && 'name' in err
    && typeof err.name === 'string'
}

export const errorNameFrom = (err: unknown): string | undefined =>
  isErrorLike(err)
    ? err.name
    : undefined

export const errorMessageFrom = (err: unknown): string | undefined =>
  isErrorLike(err)
    ? err.message
    : err == null
      ? undefined
      : String(err)

export const errorStackFrom = (err: unknown): null | string | undefined =>
  isErrorLike(err)
    ? err.stack ?? new Error(errorMessageFrom(err)).stack
    : undefined

export const errorCauseFrom = <C = unknown>(err: unknown): C | undefined => {
  if (!isErrorLike(err) || err.cause == null)
    return undefined

  return err.cause as C | undefined
}

export const isErrorEq = (src: unknown, target: unknown): boolean => {
  if (!isErrorLike(src) || !isErrorLike(target))
    return false

  return errorNameFrom(src) === errorNameFrom(target)
    && errorMessageFrom(src) === errorMessageFrom(target)
}

export const isErrorTypeEq = (src: unknown, target: unknown): boolean => {
  if (!isErrorLike(src) || !isErrorLike(target))
    return false

  return errorNameFrom(src) === errorNameFrom(target)
}

export const toError = (err: unknown): Error => {
  if (isError(err))
    return err

  if (!isErrorLike(err))
    return new Error(errorMessageFrom(err) ?? 'Unknown error', { cause: err })

  const error = new Error(err.message, { cause: err.cause })
  error.name = err.name

  if (typeof err.stack === 'string')
    error.stack = err.stack

  return error
}
