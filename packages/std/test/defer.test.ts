import { describe, expect, it } from 'vitest'

import { defer } from '../src/defer'

describe('defer', () => {
  it('should resolve the deferred promise', async () => {
    const deferred = defer<string>()

    deferred.resolve('done')

    await expect(deferred.promise).resolves.toBe('done')
  })

  it('should reject the deferred promise', async () => {
    const deferred = defer<string>()
    const error = new Error('failed')

    deferred.reject(error)

    await expect(deferred.promise).rejects.toBe(error)
  })

  it('should support void promises by default', async () => {
    const deferred = defer()

    deferred.resolve()

    await expect(deferred.promise).resolves.toBeUndefined()
  })
})
