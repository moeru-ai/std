import { base64abc } from './_base64abc'
import { validateBinaryLike } from './_validate-binary-like'

export const encodeBase64 = (data: ArrayBuffer | string | Uint8Array): string => {
  let uint8 = validateBinaryLike(data)
  let result = ''
  let i
  let l = uint8.length
  for (i = 2; i < l; i += 3) {
    result += base64abc[(uint8[i - 2]) >> 2]
    result += base64abc[
      (((uint8[i - 2]) & 0x03) << 4)
      | ((uint8[i - 1]) >> 4)
    ]
    result += base64abc[
      (((uint8[i - 1]) & 0x0F) << 2)
      | ((uint8[i]) >> 6)
    ]
    result += base64abc[(uint8[i]) & 0x3F]
  }
  if (i === l + 1) {
    result += base64abc[(uint8[i - 2]) >> 2]
    result += base64abc[((uint8[i - 2]) & 0x03) << 4]
    result += '=='
  }
  if (i === l) {
    result += base64abc[(uint8[i - 2]) >> 2]
    result += base64abc[
      (((uint8[i - 2]) & 0x03) << 4)
      | ((uint8[i - 1]) >> 4)
    ]
    result += base64abc[((uint8[i - 1]) & 0x0F) << 2]
    result += '='
  }
  return result
}

export const decodeBase64 = (b64: string): Uint8Array => {
  // eslint-disable-next-line @masknet/no-builtin-base64
  let binString = atob(b64)
  let size = binString.length

  let bytes = new Uint8Array(size)
  for (let i = 0; i < size; i++) {
    bytes[i] = binString.charCodeAt(i)
  }
  return bytes
}
