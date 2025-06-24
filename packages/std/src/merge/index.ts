const isPlainObject = (value?: unknown): value is Record<string, unknown> =>
  value != null && Object.getPrototypeOf(value) === Object.prototype

export const merge = <T1 extends object, T2 extends Partial<T1> = Partial<T1>>(
  defaults: T1,
  user?: T2,
): T1 => {
  let merged = { ...defaults }

  if (!user)
    return merged

  for (let [key, value] of Object.entries(user)) {
    if (value === undefined)
      continue

    if (isPlainObject(merged[key as keyof T1]) && isPlainObject(value)) {
      // @ts-expect-error: Type 'T' is generic and can only be indexed for reading.
      merged[key] = merge(merged[key as keyof T1], value)
      continue
    }

    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-ignore: Type 'T' is generic and can only be indexed for reading.
    merged[key] = value as unknown
  }

  return merged
}
