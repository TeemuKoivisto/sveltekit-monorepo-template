import { CyHttpMessages } from 'cypress/types/net-stubbing'

const jwt = {
  expires: 2679041626148,
  token: 'abc123'
}

export const api = {
  login(req: CyHttpMessages.IncomingHttpRequest) {
    if (req.body.email !== 'john@awesome.test' || req.body.password !== 'asdfasdf') {
      return req.reply({
        statusCode: 401
      })
    }
    return req.reply({
      user: {
        id: '6dd6029e-8269-4e97-b11b-65d3d06c0543',
        email: 'john@awesome.test',
        firstname: 'John',
        lastname: 'Cleese',
        role: 'ADMIN'
      },
      jwt
    })
  },
  users(req: CyHttpMessages.IncomingHttpRequest) {
    console.log('', req.headers['authorization'])
    if (req.headers['authorization'] !== `Bearer ${jwt.token}`) {
      return req.reply({
        statusCode: 403
      })
    }
    return req.reply({
      users: [
        {
          id: '6dd6029e-8269-4e97-b11b-65d3d06c0543',
          firstname: 'John',
          lastname: 'Cleese',
          email: 'john@awesome.test',
          role: 'ADMIN'
        },
        {
          id: 'e015ff33-b2fd-4f0b-8d19-7fe35d200ae7',
          firstname: 'Morty',
          lastname: 'Smith',
          email: 'morty@awesome.test',
          role: 'USER'
        }
      ]
    })
  }
}
