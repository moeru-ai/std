export interface DeferResult<T> {
  promise: Promise<T>
  reject: (reason?: unknown) => void
  resolve: undefined extends T
    ? (value?: PromiseLike<T> | T) => void
    : (value: PromiseLike<T> | T) => void
}

export const defer = <T = void>(): DeferResult<T> => {
  let resolve!: DeferResult<T>['resolve']
  let reject!: DeferResult<T>['reject']

  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise as DeferResult<T>['resolve']
    reject = rejectPromise
  })

  return {
    promise,
    reject,
    resolve,
  }
}
