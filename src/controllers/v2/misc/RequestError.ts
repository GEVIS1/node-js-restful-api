// Reference: (Au-Yeung, 2022)

export class RequestError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, RequestError.prototype);
  }
}