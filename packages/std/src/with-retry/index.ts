import { merge } from '../merge'
import { sleep } from '../sleep'

interface WithRetryOptions {
  onError?: (err: unknown) => void
  /** @default 3 */
  retry: number
  /** @internal */
  retryCount: number
  /** @default 500 */
  retryDelay: number
}

const defaults: WithRetryOptions = {
  retry: 3,
  retryCount: 0,
  retryDelay: 500,
}

/**
 * Returns a retirable anonymous function with configured retry behavior.
 *
 * @returns A wrapped function with the same signature as func
 */
export const withRetry = <A, R>(func: (...args: A[]) => Promise<R>, options?: Partial<WithRetryOptions>): (...args: A[]) => Promise<R> => {
  const { onError, retry, retryCount, retryDelay } = merge(defaults, options)

  return async (args: A): Promise<R> => {
    try {
      return await func(args)
    }
    catch (err) {
      onError?.(err)

      if (retryCount < retry) {
        await sleep(retryDelay)
        return withRetry(func, { onError, retry, retryCount: retryCount + 1, retryDelay })(args)
      }
      else {
        throw err
      }
    }
  }
}
