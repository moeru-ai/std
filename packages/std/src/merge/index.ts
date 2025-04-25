const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  Object.getPrototypeOf(value) === Object.prototype

export const merge = <T1 extends Record<string, unknown>, T2 extends Partial<T1> = Partial<T1>>(
  defaults: T1,
  user?: T2,
): T1 => {
  const merged = { ...defaults }

  if (!user)
    return merged

  for (const [key, value] of Object.entries(user)) {
    if (value === undefined)
      continue

    if (isPlainObject(merged[key]) && isPlainObject(value)) {
      // @ts-expect-error: Type 'T' is generic and can only be indexed for reading.
      merged[key] = merge(merged[key], value)
      continue
    }

    // @ts-expect-error: Type 'T' is generic and can only be indexed for reading.
    merged[key] = value as unknown
  }

  return merged
}
