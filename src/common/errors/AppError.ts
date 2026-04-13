

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public name: string
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}
