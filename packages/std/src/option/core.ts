export interface None {
  __type__: 'none'
}

export type Option<T> = None | Some<T>

export interface Some<T> {
  __type__: 'some'
  value: T
}

export const none: Option<never> = {
  __type__: 'none',
}

export const some = <T>(value: T): Option<T> => ({
  __type__: 'some',
  value,
})
