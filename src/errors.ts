export class InitializationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InitializationError'
    Error.captureStackTrace(this, this.constructor)
  }
}
