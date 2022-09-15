// Have to retype the Prisma generated DB types since you cant separate them from the Node.js-only
// Prisma client. A flaw in their implementation IMO.
export enum UserRole {
  GUEST = 'GUEST',
  USER = 'USER',
  ADMIN = 'ADMIN'
}
