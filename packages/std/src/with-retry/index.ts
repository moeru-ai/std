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
  /**
   * The exponential factor to use.
   * @default 2
   */
  retryDelayFactor: number
  /**
   * enable exponential backoff when not undefined.
   * @default undefined
   */
  retryDelayMax?: number
}

const defaults: WithRetryOptions = {
  retry: 3,
  retryCount: 0,
  retryDelay: 500,
  retryDelayFactor: 2
}

/**
 * Returns a retirable anonymous function with configured retry behavior.
 *
 * @returns A wrapped function with the same signature as func
 */
export const withRetry = <A, R>(func: (...args: A[]) => Promise<R> | R, options?: Partial<WithRetryOptions>): (...args: A[]) => Promise<R> => {
  const { onError, retry, retryCount, retryDelay, retryDelayFactor, retryDelayMax } = merge(defaults, options)

  const withRetryInternal = async (...args: A[]): Promise<TrampolineFn<R>> => {
    try {
      return await func(...args)
    }
    catch (err) {
      onError?.(err)

      if (retryCount >= retry) {
        throw err
      }
      else {
        await sleep(
          retryDelayMax == null
            ? retryDelay
            : Math.min(retryDelay * Math.pow(retryDelayFactor, retryCount), retryDelayMax)
        )
        return async () => withRetry(func, { onError, retry, retryCount: retryCount + 1, retryDelay })(...args)
      }
    }
  }

  return async (...args: A[]) => trampoline<R>(async () => withRetryInternal(...args))
}
