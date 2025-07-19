import { describe, expect, it } from 'vitest'

import {
  errorCauseFrom,
  errorMessageFrom,
  errorNameFrom,
  errorStackFrom,
  isError,
  isErrorEq,
  isErrorLike,
  isErrorTypeEq,
} from '../src/error'

const nonObjectErrorLikeTestCases = [
  42,
  'Hello, world',
  Symbol('error'),
  true,
  false,
  BigInt(123),
  Number.NaN,
]

const nonErrorLikeTestCases = [
  {},
  [],
  { name: 'Error' },
  { message: 'Error occurred' },
  { message: 'Error occurred', name: 42 },
  { message: 42, name: 'Error' },
]

describe('isErrorLike', () => {
  it('should return true for Error', () => {
    const error = new Error('Test error')
    const result = isErrorLike(error)
    expect(result).toBe(true)
  })

  it('should return true for manually created ErrorLike object', () => {
    const errorObj = {
      message: 'This is a custom error',
      name: 'CustomError',
    }

    const result = isErrorLike(errorObj)
    expect(result).toBe(true)
  })

  it('should return false for nullish values', () => {
    expect(isErrorLike(undefined)).toBe(false)
    expect(isErrorLike(null)).toBe(false)
  })

  it('should return false for non-object values', () => {
    nonObjectErrorLikeTestCases.forEach((input) => {
      expect(isErrorLike(input)).toBe(false)
    })
  })

  it('should return false for non ErrorLike values', () => {
    nonErrorLikeTestCases.forEach((input) => {
      expect(isErrorLike(input)).toBe(false)
    })
  })
})

describe('isError', () => {
  it('should return true for Error', () => {
    const error = new Error('Test error')
    const result = isError(error)
    expect(result).toBe(true)
  })

  it('should return false for manually created ErrorLike object', () => {
    const errorObj = {
      message: 'This is a custom error',
      name: 'CustomError',
    }

    const result = isError(errorObj)
    expect(result).toBe(false)
  })

  it('should return false for nullish values', () => {
    expect(isError(undefined)).toBe(false)
    expect(isError(null)).toBe(false)
  })

  it('should return false for non-object values', () => {
    nonObjectErrorLikeTestCases.forEach((input) => {
      expect(isError(input)).toBe(false)
    })
  })

  it('should return false for non ErrorLike values', () => {
    nonErrorLikeTestCases.forEach((input) => {
      expect(isError(input)).toBe(false)
    })
  })
})

describe('errorNameFrom', () => {
  it('should return the name of an Error', () => {
    const name = errorNameFrom(new Error('Test error'))
    expect(name).toBe('Error')
  })

  it('should return the name of a custom ErrorLike object', () => {
    const errorObj = {
      message: 'Custom error',
      name: 'CustomError',
    }

    const result = errorNameFrom(errorObj)
    expect(result).toBe('CustomError')
  })

  it('should return undefined for falsy isErrorLike values', () => {
    expect(errorNameFrom(undefined)).toBeUndefined()
    expect(errorNameFrom(null)).toBeUndefined()
    nonObjectErrorLikeTestCases.forEach((input) => {
      expect(errorNameFrom(input)).toBeUndefined()
    })
    nonErrorLikeTestCases.forEach((input) => {
      expect(errorNameFrom(input)).toBeUndefined()
    })
  })
})

describe('errorMessageFrom', () => {
  it('should return the message of an Error', () => {
    const message = errorMessageFrom(new Error('Test error'))
    expect(message).toBe('Test error')
  })

  it('should return the message of a custom ErrorLike object', () => {
    const errorObj = {
      message: 'Custom error',
      name: 'CustomError',
    }

    const result = errorMessageFrom(errorObj)
    expect(result).toBe('Custom error')
  })

  it('should return undefined for falsy isErrorLike values', () => {
    expect(errorMessageFrom(undefined)).toBeUndefined()
    expect(errorMessageFrom(null)).toBeUndefined()
    nonObjectErrorLikeTestCases.forEach((input) => {
      expect(errorMessageFrom(input)).toBeUndefined()
    })
    nonErrorLikeTestCases.forEach((input) => {
      expect(errorMessageFrom(input)).toBeUndefined()
    })
  })
})

describe('errorStackFrom', () => {
  it('should return the stack of an Error', () => {
    const error = new Error('Test error')
    const stack = errorStackFrom(error)
    expect(stack).toBeDefined()
    expect(typeof stack).toBe('string')
  })

  it('should return a new Error stack if the original does not have one', () => {
    const errorObj = {
      message: 'Custom error without stack',
      name: 'CustomError',
    }
    const stack = errorStackFrom(errorObj)
    expect(stack).toBeDefined()
    expect(typeof stack).toBe('string')
  })

  it('should return undefined for falsy isErrorLike values', () => {
    expect(errorStackFrom(undefined)).toBeUndefined()
    expect(errorStackFrom(null)).toBeUndefined()
    nonObjectErrorLikeTestCases.forEach((input) => {
      expect(errorStackFrom(input)).toBeUndefined()
    })
    nonErrorLikeTestCases.forEach((input) => {
      expect(errorStackFrom(input)).toBeUndefined()
    })
  })
})

describe('errorCauseFrom', () => {
  it('should return the cause of an Error', () => {
    const cause = new Error('Cause error')
    const error = new Error('Test error', { cause })
    const result = errorCauseFrom(error)
    expect(result).toBe(cause)
  })

  it('should return undefined if the cause is not present', () => {
    const errorObj = {
      message: 'Custom error without cause',
      name: 'CustomError',
    }
    const result = errorCauseFrom(errorObj)
    expect(result).toBeUndefined()
  })

  it('should return undefined for falsy isErrorLike values', () => {
    expect(errorCauseFrom(undefined)).toBeUndefined()
    expect(errorCauseFrom(null)).toBeUndefined()
    nonObjectErrorLikeTestCases.forEach((input) => {
      expect(errorCauseFrom(input)).toBeUndefined()
    })
    nonErrorLikeTestCases.forEach((input) => {
      expect(errorCauseFrom(input)).toBeUndefined()
    })
  })
})

describe('isErrorEq', () => {
  it('should return true for equal Error objects', () => {
    const error1 = new Error('Test error')
    const error2 = new Error('Test error')
    expect(isErrorEq(error1, error2)).toBe(true)
  })

  it('should return false for different Error objects', () => {
    const error1 = new Error('Test error 1')
    const error2 = new Error('Test error 2')
    expect(isErrorEq(error1, error2)).toBe(false)
  })

  it('should return false for non-ErrorLike values', () => {
    expect(isErrorEq(undefined, null)).toBe(false)
    nonObjectErrorLikeTestCases.forEach((input) => {
      expect(isErrorEq(input, new Error('Error occurred'))).toBe(false)
      expect(isErrorEq(new Error('Error occurred'), input)).toBe(false)
    })
    nonErrorLikeTestCases.forEach((input) => {
      expect(isErrorEq(input, new Error('Error occurred'))).toBe(false)
      expect(isErrorEq(new Error('Error occurred'), input)).toBe(false)
    })
  })
})

describe('isErrorTypeEq', () => {
  it('should return true for equal ErrorLike types', () => {
    const error1 = new Error('Test error')
    const error2 = new Error('Test error')
    expect(isErrorTypeEq(error1, error2)).toBe(true)
  })

  it('should return false for different ErrorLike types', () => {
    const error1 = new Error('Test error 1')
    error1.name = 'CustomError1'
    const error2 = new Error('Test error 2')
    error2.name = 'CustomError2'
    expect(isErrorTypeEq(error1, error2)).toBe(false)
  })

  it('should return false for non-ErrorLike values', () => {
    expect(isErrorTypeEq(undefined, null)).toBe(false)
    nonObjectErrorLikeTestCases.forEach((input) => {
      expect(isErrorTypeEq(input, new Error('Error occurred'))).toBe(false)
      expect(isErrorTypeEq(new Error('Error occurred'), input)).toBe(false)
    })
    nonErrorLikeTestCases.forEach((input) => {
      expect(isErrorTypeEq(input, new Error('Error occurred'))).toBe(false)
      expect(isErrorTypeEq(new Error('Error occurred'), input)).toBe(false)
    })
  })
})
