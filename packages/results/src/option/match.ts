import type { Option } from '../core'

import { isSome } from './is'

export const match = <T1, T2>(o: Option<T1>, onSome: (s: T1) => T2, onNone: () => T2): T2 =>
  isSome(o)
    ? onSome(o.value)
    : onNone()
