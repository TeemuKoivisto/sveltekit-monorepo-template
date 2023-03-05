import { writable } from 'svelte/store'
import type { Result } from '@awesome-org/types'

import type {
  Persisted,
  PersistedKey,
  PersistedPayload,
  PersistedPrimitive,
  PersistableValues,
  PersistedType,
  StorageType
} from './types'

// TODO recursion / strict type checking for nested values etc
// probably should use 'strict' parameter to enforce such things. And 'throw-error' as well?
// And then should fix undefined being illegal value.
// And option to debounce persist?
// interface Options {
//   strict: boolean
//   storage: 'local' | 'session'
//   err: 'throw' | 'warn' | 'silent'
//   debounce: number
// }
function createPersistable(value: any): Persisted {
  if (Array.isArray(value)) {
    return {
      type: 'array',
      payload: value as PersistedType[]
    }
  } else if (value instanceof Map) {
    return {
      type: 'map',
      payload: Array.from(value.entries()) as [PersistedKey, PersistedType][]
    }
  } else if (value instanceof Set) {
    return {
      type: 'set',
      payload: Array.from(value.values()) as [PersistedType][]
    }
  } else if (value instanceof Date) {
    return {
      type: 'date',
      payload: value.toISOString()
    }
  } else if (value === null) {
    return {
      type: 'null',
      payload: null
    }
  } else {
    return {
      type: typeof value,
      payload: value
    }
  }
}

function parsePersisted(persisted: Persisted) {
  switch (persisted.type) {
    case 'map':
      return new Map(persisted.payload as [PersistedKey, PersistedType][])
    case 'set':
      return new Set(persisted.payload as [PersistedType][])
    case 'array':
      return persisted.payload as PersistedType[]
    case 'object':
      return persisted.payload as Record<PersistedKey, PersistedType>
    case 'date':
      return new Date(persisted.payload as string)
    default:
      return persisted.payload as PersistedPrimitive
  }
}

export function persist(
  value: any,
  key: string,
  storage: StorageType = 'local'
): Result<undefined> {
  try {
    const persisted = createPersistable(value)
    if (persisted.type === 'function') {
      return { err: 'Tried to persist a function', code: 500 }
    }
    const store = storage === 'local' ? window.localStorage : window.sessionStorage
    store.setItem(key, JSON.stringify(persisted))
    return { data: undefined }
  } catch (err) {
    return { err: 'Persist executed server-side - window was undefined', code: 500 }
  }
}

export function hydrate<T extends PersistableValues>(
  key: string,
  storage: StorageType = 'local'
): Result<T> {
  let json
  try {
    const store = storage === 'local' ? window.localStorage : window.sessionStorage
    json = store.getItem(key)
  } catch (err) {
    return { err: 'Hydrate executed server-side - window was undefined', code: 500 }
  }
  if (!json) {
    return {
      err: `Received null or undefined item from ${storage}Storage.getItem`,
      code: 500
    }
  }
  let parsed: Persisted
  try {
    parsed = JSON.parse(json)
  } catch (err) {
    return { err: `Failed to parse JSON from ${storage}Storage`, code: 500 }
  }
  const data = parsePersisted(parsed) as T
  return { data }
}

export interface Options {
  key: string
  storage?: StorageType
  onHydrate?: (values: any) => any
}

export function persistedWritable<T extends PersistableValues>(defaultValue: T, options: Options) {
  const { key, storage = 'local', onHydrate } = options
  const hydrated = hydrate<T>(key, storage)
  let data = defaultValue
  if ('data' in hydrated) {
    data = onHydrate ? onHydrate(hydrated.data) : hydrated.data
  }
  const store = writable<T>(data)
  store.subscribe(val => {
    persist(val, key, storage)
  })
  return store
}
