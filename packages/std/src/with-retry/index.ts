import type { TrampolineFn } from '../trampoline'

import { merge } from '../merge'
import { sleep } from '../sleep'
import { trampoline } from '../trampoline'

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
export const withRetry = <A, R>(func: (...args: A[]) => Promise<R> | R, options?: Partial<WithRetryOptions>): (...args: A[]) => Promise<R> | R => {
  const { onError, retry, retryCount, retryDelay } = merge(defaults, options)

  const withRetryInternal = async (...args: A[]): Promise<TrampolineFn<R>> => {
    try {
      return await func(...args)
    }
    catch (err) {
      onError?.(err)

      if (retryCount < retry) {
        await sleep(retryDelay)
        return async () => withRetry(func, { onError, retry, retryCount: retryCount + 1, retryDelay })(...args)
      }
      else {
        throw err
      }
    }
  }

  return async (...args: A[]) => trampoline<R>(async () => withRetryInternal(...args))
}
