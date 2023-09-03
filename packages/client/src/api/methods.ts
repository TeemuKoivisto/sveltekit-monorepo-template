import { get as storeGet } from 'svelte/store'
import { jwt } from '$stores/auth'
import { API_URL } from '$config'

import { wrappedFetch } from '@awesome-org/utils'
import type { Result } from '@awesome-org/utils'

export const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

export const getAuthHeader = () =>
  storeGet(jwt) && { Authorization: `Bearer ${storeGet(jwt)?.token}` }

export function get<T>(
  path: string,
  defaultError?: string,
  headers: Record<string, string> = { ...DEFAULT_HEADERS, ...getAuthHeader() }
): Promise<Result<T>> {
  return wrappedFetch(
    `${API_URL}/${path}`,
    {
      method: 'GET',
      headers
    },
    () => defaultError
  )
}

export function post<T>(
  path: string,
  payload: any,
  defaultError?: string,
  headers: Record<string, string> = { ...DEFAULT_HEADERS, ...getAuthHeader() }
): Promise<Result<T>> {
  return wrappedFetch(
    `${API_URL}/${path}`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    },
    () => defaultError
  )
}

export function put<T>(
  path: string,
  payload: any,
  defaultError?: string,
  headers: Record<string, string> = { ...DEFAULT_HEADERS, ...getAuthHeader() }
): Promise<Result<T>> {
  return wrappedFetch(
    `${API_URL}/${path}`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify(payload)
    },
    () => defaultError
  )
}

export function del<T>(
  path: string,
  defaultError?: string,
  headers: Record<string, string> = { ...DEFAULT_HEADERS, ...getAuthHeader() }
): Promise<Result<T>> {
  return wrappedFetch(
    `${API_URL}/${path}`,
    {
      method: 'DELETE',
      headers
    },
    () => defaultError
  )
}
