// Main options
export interface Options {
  strict: boolean
  storage: StorageType
  error: 'throw' | 'warn' | 'silent'
  debounce: number
}

// Other types
export type PersistableValues =
  | Array<PersistableValues>
  | Map<string | number, PersistableValues>
  | Set<PersistableValues>
  | { [key in string | number]?: PersistableValues }
  | Date
  | object
  | string
  | number
  | boolean
  | null

export type PayloadType =
  | 'array'
  | 'map'
  | 'set'
  | 'date'
  | 'object'
  | 'function'
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'null'
  | 'undefined'

export type PersistedType =
  | 'array'
  | 'object'
  | 'string'
  | 'number'
  | 'boolean'
  | 'null'
  | 'undefined'

export type PersistedKey = string | number
export type PersistedPrimitive = string | number | boolean | null
export type PersistedPayload =
  | [PersistedKey, PersistedType][]
  | [PersistedType][]
  | PersistedType[]
  | Record<PersistedKey, PersistedType>
  | PersistedPrimitive

export interface Persisted {
  type: PayloadType
  payload: PersistedPayload
}

export type StorageType = 'local' | 'session'
