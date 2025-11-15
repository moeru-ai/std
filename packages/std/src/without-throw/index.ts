/** @see {@link https://std.moeru.ai/docs/packages/std/utils/without-throw} */
export const withoutThrow = <
  F extends (...args: any[]) => any,
  E = unknown,
>(func: F) => {
  return (...args: Parameters<F>): { data: ReturnType<F>, error?: undefined } | { data?: undefined, error: E } => {
    try {
      return { data: func(...args) }
    } catch (error) {
      return { error: error as E }
    }
  }
}

export const withoutThrowAsync = <
  F extends (...args: any[]) => Promise<any>,
  E = unknown,
>(func: F) => {
  return async (...args: Parameters<F>): Promise<{ data: Awaited<ReturnType<F>>, error?: undefined } | { data?: undefined, error: E }> => {
    try {
      return { data: await func(...args) }
    } catch (error) {
      return { error: error as E }
    }
  }
}
