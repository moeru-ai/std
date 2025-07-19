/**
 * ErrorLike utility interface for containing error-like objects.
 */
export type ErrorLike<C = unknown> = Nullable<Partial<Pick<Error, 'stack'>>> & Pick<Error, 'message' | 'name'> & { cause?: C }

type Nullable<T> = {
  [P in keyof T]: null | T[P]
}

export const isErrorLike = <C = unknown>(err: null | undefined | unknown): err is ErrorLike<C> => {
  if (err == null) {
    return false
  }
  if (err instanceof Error) {
    return true
  }
  if (typeof err !== 'object') {
    return false
  }

  const hasName = 'name' in err && typeof err.name === 'string'
  const hasMessage = 'message' in err && typeof err.message === 'string'
  return hasName && hasMessage
}

export const isError = (err: null | undefined | unknown): err is Error => {
  if (!isErrorLike(err)) {
    return false
  }

  return err instanceof Error
}

export const errorNameFrom = (err: null | undefined | unknown): string | undefined => {
  if (!isErrorLike(err)) {
    return undefined
  }

  return err.name
}

export const errorMessageFrom = (err: null | undefined | unknown): string | undefined => {
  if (!isErrorLike(err)) {
    return undefined
  }

  return err.message
}

export const errorStackFrom = (err: null | undefined | unknown): null | string | undefined => {
  if (!isErrorLike(err)) {
    return undefined
  }
  if (err.stack == null) {
    const error = new Error(errorMessageFrom(err))
    return error.stack
  }

  return err.stack
}

export const errorCauseFrom = <C>(err: null | undefined | unknown): C | undefined => {
  if (!isErrorLike(err)) {
    return undefined
  }
  if (err.cause == null) {
    return undefined
  }

  // eslint-disable-next-line @masknet/type-prefer-return-type-annotation
  return err.cause as C | undefined
}

export const isErrorEq = (src: null | undefined | unknown, target: null | undefined | unknown): boolean => {
  if (!isErrorLike(src) || !isErrorLike(target)) {
    return false
  }

  const srcName = errorNameFrom(src)
  const targetName = errorNameFrom(target)
  if (srcName == null || targetName == null) {
    return false
  }

  if (srcName !== targetName) {
    return false
  }

  const srcMessage = errorMessageFrom(src)
  const targetMessage = errorMessageFrom(target)
  if (srcMessage == null || targetMessage == null) {
    return false
  }

  return srcMessage === targetMessage
}

export const isErrorTypeEq = (src: null | undefined | unknown, target: null | undefined | unknown): boolean => {
  if (!isErrorLike(src) || !isErrorLike(target)) {
    return false
  }

  const srcName = errorNameFrom(src)
  const targetName = errorNameFrom(target)
  if (srcName == null || targetName == null) {
    return false
  }

  return srcName === targetName
}
