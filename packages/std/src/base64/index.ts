const getTypeName = (value: unknown): string => {
  const type = typeof value

  if (type !== 'object')
    return type
  else if (value === null)
    return 'null'
  else
    return value?.constructor?.name ?? 'object'
}

const validateBinaryLike = (source: unknown): Uint8Array => {
  if (typeof source === 'string')
    return new TextEncoder().encode(source)
  else if (source instanceof Uint8Array)
    return source
  else if (source instanceof ArrayBuffer)
    return new Uint8Array(source)

  throw new TypeError(`The input must be a Uint8Array, a string, or an ArrayBuffer. Received a value of the type ${getTypeName(source)}.`)
}

export const decodeBase64Url = (b64url: string): Uint8Array =>
  Uint8Array.fromBase64(b64url, { alphabet: 'base64url' })

export const encodeBase64Url = (data: ArrayBuffer | string | Uint8Array): string =>
  validateBinaryLike(data).toBase64({ alphabet: 'base64url', omitPadding: true })

export const encodeBase64 = (data: ArrayBuffer | string | Uint8Array): string =>
  validateBinaryLike(data).toBase64()

export const decodeBase64 = (b64: string): Uint8Array =>
  Uint8Array.fromBase64(b64)
