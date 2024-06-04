import { Jwt, LoginResponse, ClientUser, Result } from '../types'

export function loginToSearchQuery(user: ClientUser, jwt: Jwt) {
  const params = new URLSearchParams()
  params.set('userId', user.id)
  params.set('email', user.email)
  params.set('firstname', user.firstname)
  params.set('lastname', user.lastname)
  params.set('role', user.role)
  params.set('jwt', jwt.token)
  params.set('exp', jwt.exp.toString())
  return params
}

const parseInteger = (str: string) => {
  try {
    return parseInt(str)
  } catch (err) {
    return undefined
  }
}

export function loginFromSearchQuery(url: string): Result<LoginResponse> {
  const params = new URLSearchParams(url)
  const user = {
    id: params.get('userId'),
    role: params.get('role'),
    firstname: params.get('firstname'),
    lastname: params.get('lastname'),
    email: params.get('email')
  }
  const jwt = {
    token: params.get('jwt'),
    exp: params.get('exp')
  }
  const arr = [user, jwt]
  const missing: string[] = []
  arr.forEach(obj => {
    Object.entries(obj).forEach(([k, v]) => {
      if (!v) {
        missing.push(k)
      } else if (k.toLowerCase().endsWith('exp')) {
        const parsed = parseInteger(v)
        if (parsed) {
          // @ts-ignore
          obj[k] = parsed
        } else {
          missing.push(k)
        }
      }
    })
  })
  if (missing.length > 0) {
    return {
      err: `Missing properties from query: ${missing.join(', ')}`,
      code: 400
    }
  }
  return {
    data: {
      user,
      jwt
    } as unknown as LoginResponse
  }
}
