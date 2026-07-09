// eslint-disable-next-line @masknet/prefer-timer-id
export const sleep = async (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

export const sleepWithAbort = async (ms: number, signal?: AbortSignal): Promise<void> => {
  if (!signal)
    return sleep(ms)

  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(signal.reason ?? new DOMException('Aborted', 'AbortError'))
      return
    }

    const timer = setTimeout(() => {
      signal.removeEventListener('abort', onAbort)
      resolve()
    }, ms)

    signal.addEventListener('abort', onAbort, { once: true })

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    function onAbort() {
      clearTimeout(timer)
      signal?.removeEventListener('abort', onAbort)
      reject(signal?.reason ?? new DOMException('Aborted', 'AbortError'))
    };
  })
}
