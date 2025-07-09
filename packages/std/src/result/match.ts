import type { Err, Ok, Result } from './core'

import { isOk } from './is'

export const match = <T1, T2, E>(r: Result<T1, E>, onOk: (o: Ok<T1>) => T2, onErr: (e: Err<E>) => T2): T2 =>
  isOk(r)
    ? onOk(r)
    : onErr(r)
