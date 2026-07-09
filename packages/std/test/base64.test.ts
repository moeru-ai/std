import { describe, expect, it } from 'vitest'

import {
  decodeBase64,
  decodeBase64Url,
  encodeBase64,
  encodeBase64Url,
} from '../src/base64'

describe('base64', () => {
  it('should encode strings, Uint8Array, and ArrayBuffer values', () => {
    const bytes = new Uint8Array([72, 101, 108, 108, 111])

    expect(encodeBase64('Hello')).toBe('SGVsbG8=')
    expect(encodeBase64(bytes)).toBe('SGVsbG8=')
    expect(encodeBase64(bytes.buffer)).toBe('SGVsbG8=')
  })

  it('should decode base64 strings', () => {
    expect([...decodeBase64('SGVsbG8=')]).toEqual([72, 101, 108, 108, 111])
  })
})

describe('base64url', () => {
  it('should encode without padding using the base64url alphabet', () => {
    expect(encodeBase64Url(new Uint8Array([251, 255]))).toBe('-_8')
  })

  it('should decode base64url strings', () => {
    expect([...decodeBase64Url('-_8')]).toEqual([251, 255])
  })
})
