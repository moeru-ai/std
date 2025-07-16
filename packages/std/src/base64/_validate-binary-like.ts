const getTypeName = (value: unknown): string => {
  const type = typeof value

  if (type !== 'object')
    return type
  else if (value === null)
    return 'null'
  else
    return value?.constructor?.name ?? 'object'
}

export const validateBinaryLike = (source: unknown): Uint8Array => {
  if (typeof source === 'string')
    return new TextEncoder().encode(source)
  else if (source instanceof Uint8Array)
    return source
  else if (source instanceof ArrayBuffer)

    return new Uint8Array(source)

  throw new TypeError(`The input must be a Uint8Array, a string, or an ArrayBuffer. Received a value of the type ${getTypeName(source)}.`)
}
