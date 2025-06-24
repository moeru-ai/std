import { merge } from '../merge'
import { sleep } from '../sleep'

interface WithRetryOptions {
  onError: (err: unknown) => void
  retry: number
  retryDelay: number
}

const defaults: WithRetryOptions = {
  onError: () => {},
  retry: 3,
  retryDelay: 500,
}

/**
 * Returns a retirable anonymous function with configured retry behavior.
 *
 * @returns A wrapped function with the same signature as func
 */
export const withRetry = <A, R>(func: (...args: A[]) => Promise<R>, options?: Partial<WithRetryOptions>): (...args: A[]) => Promise<R> => {
  let retryCount = 0
  const opts = merge(defaults, options)

  return async (args: A): Promise<R> => {
    try {
      return await func(args)
    }
    catch (err) {
      opts.onError(err)

      if (retryCount < opts.retry) {
        retryCount++
        await sleep(opts.retryDelay)
        return withRetry(func, { ...options, retry: opts.retry - retryCount })(args)
      }
      else {
        throw err
      }
    }
  }
}
