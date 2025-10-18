import type { TrampolineFn } from '../trampoline'

import { merge } from '../merge'
import { sleep } from '../sleep'
import { trampoline } from '../trampoline'

interface WithRetryOptions {
  onError?: (err: unknown) => void
  /** @default 3 */
  retry: number
  /** @default 500 */
  retryDelay: number
  /**
   * the exponential factor to use.
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
  retryDelay: 500,
  retryDelayFactor: 2,
}

/** @see {@link https://std.moeru.ai/docs/packages/std/utils/with-retry} */
export const withRetry = <A, R>(func: (...args: A[]) => Promise<R> | R, options?: Partial<WithRetryOptions>): (...args: A[]) => Promise<R> => {
  const { onError, retry, retryDelay, retryDelayFactor, retryDelayMax } = merge(defaults, options)

  const withRetryInternal = async (retryCount: number, ...args: A[]): Promise<TrampolineFn<R>> => {
    try {
      return await func(...args)
    }
    catch (err) {
      onError?.(err)

      if (retryCount >= retry)
        throw err

      await sleep(
        retryDelayMax == null
          ? retryDelay
          : Math.min(retryDelay * retryDelayFactor ** retryCount, retryDelayMax),
      )

      return async () => withRetryInternal(retryCount + 1, ...args)
    }
  }

  return async (...args: A[]) => trampoline<R>(async () => withRetryInternal(0, ...args))
}
