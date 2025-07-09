export interface None {
  __mo: 'none'
}

export type Option<T> = None | Some<T>

export interface Some<T> {
  __mo: 'some'
  value: T
}

export const none: Option<never> = {
  __mo: 'none',
}

export const some = <T>(value: T): Option<T> => ({
  __mo: 'some',
  value,
})
