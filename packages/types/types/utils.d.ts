export type Ok<T> = {
  data: T
}
export type Err = {
  err: string
  code: number
}
// Based on Rust's Result https://doc.rust-lang.org/std/result/
export type Result<T> = Ok<T> | Err

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
