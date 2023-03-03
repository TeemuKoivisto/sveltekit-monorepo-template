import { rest, setupWorker } from 'msw'

const handlers = [
  rest.post('http://localhost:7180/login', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user: {
          id: '6dd6029e-8269-4e97-b11b-65d3d06c0543',
          email: 'test@asdf.fi',
          firstname: 'Dick',
          lastname: 'Manchez',
          role: 'ADMIN'
        },
        jwt: {
          expires: 2679041626148,
          token:
            'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzIjoxNjc5MDQxNjI2MTQ4LCJ1c2VyIjp7ImlkIjoiNmRkNjAyOWUtODI2OS00ZTk3LWIxMWItNjVkM2QwNmMwNTQzIiwiZW1haWwiOiJyaWNrQGFzZGYuZmkiLCJmaXJzdG5hbWUiOiJSaWNrIiwibGFzdG5hbWUiOiJTYW5jaGV6Iiwicm9sZSI6IkFETUlOIn0sImlhdCI6MTY3NzgzMjAyNiwiZXhwIjoxNjc5MDQxNjI2fQ.D5jzcOw8e_fwBPeuQ2n81ODLNwS5SiKxKt90d91kMghfwM7EvAFSARwsK0IWMUYjmwkfFdmnjsDuR8BDfXec5Q'
        }
      })
    )
  }),
  rest.get('http://localhost:7180/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        users: [
          {
            id: '6dd6029e-8269-4e97-b11b-65d3d06c0543',
            firstname: 'Dick',
            lastname: 'Manchez',
            email: 'test@asdf.fi',
            role: 'ADMIN'
          },
          {
            id: 'e015ff33-b2fd-4f0b-8d19-7fe35d200ae7',
            firstname: 'Morty',
            lastname: 'Smith',
            email: 'morty@asdf.fi',
            role: 'USER'
          }
        ]
      })
    )
  })
]

export const worker = setupWorker(...handlers)
