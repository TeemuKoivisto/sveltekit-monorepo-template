import { get as storeGet } from 'svelte/store'
import { jwt } from '$stores/auth'
import { API_URL } from '$config'

import type { Result } from '@awesome-org/types'

export const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

export const getAuthHeader = () =>
  storeGet(jwt) && { Authorization: `Bearer ${storeGet(jwt)?.token}` }

export async function wrappedFetch<T>(
  path: string,
  options: RequestInit,
  defaultError = 'Request failed'
): Promise<Result<T>> {
  let resp: Response
  try {
    resp = await fetch(`${API_URL}/${path}`, options)
  } catch (err) {
    // Must be a connection error (?)
    console.error(err)
    return { err: 'Connection error', code: 550 }
  }
  let data
  const contentType = resp.headers.get('content-type')
  if (contentType?.startsWith('application/json')) {
    data = await resp.json()
  } else {
    data = await resp.text()
  }
  if (!resp.ok) {
    const msg = (typeof data === 'string' ? data : data?.message) || defaultError
    console.error(msg)
    return { err: msg, code: resp.status }
  }
  return { data }
}

export function get<T>(
  path: string,
  defaultError?: string,
  headers: Record<string, string> = { ...DEFAULT_HEADERS, ...getAuthHeader() }
): Promise<Result<T>> {
  return wrappedFetch(
    path,
    {
      method: 'GET',
      headers
    },
    defaultError
  )
}

export function post<T>(
  path: string,
  payload: any,
  defaultError?: string,
  headers: Record<string, string> = { ...DEFAULT_HEADERS, ...getAuthHeader() }
): Promise<Result<T>> {
  return wrappedFetch(
    path,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    },
    defaultError
  )
}

export function put<T>(
  path: string,
  payload: any,
  defaultError?: string,
  headers: Record<string, string> = { ...DEFAULT_HEADERS, ...getAuthHeader() }
): Promise<Result<T>> {
  return wrappedFetch(
    path,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify(payload)
    },
    defaultError
  )
}

export function del<T>(
  path: string,
  defaultError?: string,
  headers: Record<string, string> = { ...DEFAULT_HEADERS, ...getAuthHeader() }
): Promise<Result<T>> {
  return wrappedFetch(
    path,
    {
      method: 'DELETE',
      headers
    },
    defaultError
  )
}
