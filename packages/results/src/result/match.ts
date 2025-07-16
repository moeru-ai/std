import type { Result } from '../core'

import { isOk } from './is'

export const match = <T1, T2, E>(r: Result<T1, E>, onOk: (o: T1) => T2, onErr: (e: E) => T2): T2 =>
  isOk(r)
    ? onOk(r.value)
    : onErr(r.error)
