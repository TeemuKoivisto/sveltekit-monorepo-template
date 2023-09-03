import { Result } from '../types/utils'

export type JSONValue =
  | string
  | number
  | boolean
  | { [x: string | number]: JSONValue }
  | Array<JSONValue>

/**
 * Finds the string value from "error" or "message" key from an unknown JSON response
 *
 * This is useful when calling external APIs since we can never be certain how the error messages
 * are nested (eg Cloudinary with { error: { message: <string> } } ).
 * @returns
 */
function findErrorMessage(data: JSONValue): string | undefined {
  if (Array.isArray(data)) {
    let found: string | undefined
    data.forEach(val => {
      if (!found) {
        found = findErrorMessage(val)
      }
    })
    return found
  } else if (typeof data === 'object') {
    for (const key in data) {
      const val = data[key]
      const wasErrorMsg = key === 'error' || key === 'message'
      if (wasErrorMsg && typeof val === 'string') {
        return val
      } else if (wasErrorMsg) {
        return findErrorMessage(val)
      }
    }
  }
  return undefined
}

/**
 * Wraps fetch into Result type and auto-parses based on its content-type
 *
 * @param uri URI
 * @param options fetch options
 * @param defaultError Returned error message to show above eg form fields or in snack bar
 * @returns
 */
export async function wrappedFetch<T>(
  uri: string,
  options?: RequestInit,
  errHandler?: (err: string | undefined, code: number) => string | undefined
): Promise<Result<T>> {
  let resp: Response
  try {
    resp = await fetch(uri, options)
  } catch (error: any) {
    let err = ((error.toString() as string).split('\n')[0] || '').trim()
    let code = 500
    if (error instanceof DOMException) {
      err = 'Fetch request aborted'
      code = 540
    } else if (err === 'TypeError: Failed to fetch') {
      // Most probably a Connection Error thrown by client when the server has already been closed
      // Fetch handles failed requests otherwise gracefully, without throwing errors
      err = 'Connection error'
      code = 550
    } else if (err === '[object Object]') {
      console.error('wrappedFetch: unknown error', error)
      err = 'Request failed'
    } else {
      console.warn('wrappedFetch:', error)
    }
    err = errHandler?.(err, code) || err
    return { err, code }
  }
  let data
  const contentType = resp.headers.get('content-type')
  if (contentType?.startsWith('application/json')) {
    data = await resp.json()
  } else if (
    contentType?.startsWith('application/octet-stream') ||
    contentType?.startsWith('image/') ||
    contentType?.startsWith('video/') ||
    contentType?.startsWith('audio/')
  ) {
    data = await resp.arrayBuffer()
  } else {
    data = (await resp.text()) || resp.statusText
  }
  // By default fetch only treats codes between 200-299 as "ok", showing eg a redirect 308 as an error
  if (resp.status >= 400) {
    let err: string | undefined
    if (typeof data === 'string') {
      err = data
    } else {
      err = findErrorMessage(data)
    }
    err = errHandler?.(err, resp.status) || err || `Fetch failed with code ${resp.status}`
    return { err, code: resp.status }
  }
  return { data }
}
