export type WithoutThrowResult<T> = { data: T, error: undefined } | { data: undefined, error: unknown }

/** @see {@link https://std.moeru.ai/docs/packages/std/utils/without-throw} */
export const withoutThrow = <
  T extends () => unknown,
>(fn: T): WithoutThrowResult<ReturnType<T>> => {
  try {
    return { data: fn() as ReturnType<T>, error: undefined }
  }
  catch (error) {
    return { data: undefined, error }
  }
}

export const withoutThrowAsync = async <
  T extends () => Promise<unknown>,
>(fn: T): Promise<WithoutThrowResult<Awaited<ReturnType<T>>>> => {
  try {
    return { data: await fn() as Awaited<ReturnType<T>>, error: undefined }
  }
  catch (error) {
    return { data: undefined, error }
  }
}
