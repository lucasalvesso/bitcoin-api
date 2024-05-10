import { CustomError } from "./CustomError";

export class BadRequestError extends CustomError {
  readonly statusCode: number;

  constructor(params?: { code?: number; message?: string }) {
    const { code, message } = params || {};

    super(message || "Bad request");
    this.statusCode = code || 400;

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
