import { decodeBase64, encodeBase64 } from './base64'

const addPaddingToBase64url = (b64url: string): string => {
  if (b64url.length % 4 === 2)
    return `${b64url}==`
  if (b64url.length % 4 === 3)
    return `${b64url}=`
  if (b64url.length % 4 === 1)
    throw new TypeError('Illegal base64url string!')

  return b64url
}

const convertBase64ToBase64url = (b64: string): string =>
  b64.endsWith('=')
    // eslint-disable-next-line sonarjs/no-nested-conditional
    ? b64.endsWith('==')
      ? b64.replace(/\+/g, '-').replace(/\//g, '_').slice(0, -2)
      : b64.replace(/\+/g, '-').replace(/\//g, '_').slice(0, -1)
    : b64.replace(/\+/g, '-').replace(/\//g, '_')

const convertBase64urlToBase64 = (b64url: string): string => {
  if (!/^[-\w]*={0,2}$/.test(b64url))
    throw new TypeError('Failed to decode base64url: invalid character')

  return addPaddingToBase64url(b64url).replace(/-/g, '+').replace(/_/g, '/')
}

export const decodeBase64Url = (b64url: string): Uint8Array =>
  decodeBase64(convertBase64urlToBase64(b64url))

export const encodeBase64Url = (data: ArrayBuffer | string | Uint8Array): string =>
  convertBase64ToBase64url(encodeBase64(data))
