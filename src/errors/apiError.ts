export class ApiErrorHandler extends Error {
  public readonly message: string
  public readonly code?: string

  constructor(
    message: string,
    code: string = 'failed'
  ) {
    super()
    this.message = message
    this.code = code
  }
}