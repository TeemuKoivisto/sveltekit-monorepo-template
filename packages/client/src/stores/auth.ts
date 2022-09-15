import { derived, get, writable } from 'svelte/store'
import type { IJwt, IUser, ILoginParams } from '@awesome-org/types'

import { persistedWritable } from './persist'

export const user = persistedWritable<IUser | null>(null, {
  key: 'user',
  storage: 'session'
})
export const jwt = persistedWritable<IJwt | null>(null, {
  key: 'jwt',
  storage: 'session'
})
export const jwtToken = derived(jwt, v => v?.token || '')
export const isLoggedIn = derived(jwt, v => v !== null) // TODO check for expiration
