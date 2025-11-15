export type TryCatchResult<T> = { data: T, error: undefined } | { data: undefined, error: unknown }

/** @see {@link https://std.moeru.ai/docs/packages/std/utils/without-throw} */
export const tryCatch = <
  T extends () => unknown,
>(fn: T): TryCatchResult<ReturnType<T>> => {
  try {
    return { data: fn() as ReturnType<T>, error: undefined }
  }
  catch (error) {
    return { data: undefined, error }
  }
}

export const tryCatchAsync = async <
  T extends () => Promise<unknown>,
>(fn: T): Promise<TryCatchResult<Awaited<ReturnType<T>>>> => {
  try {
    return { data: await fn() as Awaited<ReturnType<T>>, error: undefined }
  }
  catch (error) {
    return { data: undefined, error }
  }
}
