export type Ok<T> = {
  data: T
}
export type Error = {
  err: string
  code: number
}
export type Maybe<T> = Ok<T> | Error

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
