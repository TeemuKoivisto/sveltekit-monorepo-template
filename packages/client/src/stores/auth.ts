import { derived, get, writable } from 'svelte/store'
import type { Jwt, ClientUser, LoginParams } from '@awesome-org/lib'

import { persistedWritable } from './persist'

export const user = persistedWritable<ClientUser | null>(null, {
  key: 'user',
  storage: 'session'
})
export const jwt = persistedWritable<Jwt | null>(null, {
  key: 'jwt',
  storage: 'session'
})
export const jwtToken = derived(jwt, v => v?.token || '')
export const isLoggedIn = derived(jwt, v => v !== null) // TODO check for expiration
