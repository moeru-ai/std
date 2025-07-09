import type { Option, Some } from './core'

import { isSome } from './is'

export const match = <T1, T2>(o: Option<T1>, onSome: (s: Some<T1>) => T2, onNone: () => T2): T2 =>
  isSome(o)
    ? onSome(o)
    : onNone()
