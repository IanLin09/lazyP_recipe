export class ThrowError extends Error {
    constructor(
      public statusCode: number,
      message: string
    ) {
      super(message);
      this.name = 'ThrowError';
    }
}