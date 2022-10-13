/**
 * This file holds the RequestError class which is an extension of the Error class
 * that allows the addition of a statusCode to be added for cleaner error reporting in the
 * catch block.
 *
 * Reference: (Au-Yeung, 2022)
 */

export class RequestError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, RequestError.prototype);
  }
}
