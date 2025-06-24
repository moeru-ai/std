export type TrampolineFn<T> = (() => Promise<TrampolineFn<T>> | TrampolineFn<T>) | Promise<T> | T

export const trampoline = async <T>(fn: () => Promise<TrampolineFn<T>> | TrampolineFn<T>): Promise<T> => {
  let result = await fn()

  // make ts happy
  // eslint-disable-next-line @masknet/type-no-instanceof-wrapper, unicorn/no-instanceof-builtins
  while (result instanceof Function)
    result = await result()

  return result
}

export type TrampolineSyncFn<T> = (() => TrampolineSyncFn<T>) | T

export const trampolineSync = <T>(fn: () => TrampolineSyncFn<T>): T => {
  let result = fn()

  // make ts happy
  // eslint-disable-next-line @masknet/type-no-instanceof-wrapper, unicorn/no-instanceof-builtins
  while (result instanceof Function)
    result = result()

  return result
}
