import type { Result } from '../core'

import { err } from '../core'
import { match } from './match'

export const flatten = <T, E>(r: Result<Result<T, E>, E>): Result<T, E> => match(
  r,
  inner => inner,
  e => err(e),
)
