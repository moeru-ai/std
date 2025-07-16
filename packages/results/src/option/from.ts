import { none, some } from '../core'

/** @experimental */
export const from = <T>(value: null | T | undefined) => value == null
  ? none
  : some(value)
