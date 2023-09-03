export interface IError extends Error {
  statusCode?: number
}

export class CustomError extends Error implements IError {
  statusCode: number

  constructor(message: string, errorCode = 500) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = errorCode
    Error.captureStackTrace(this, this.constructor)
  }
}
