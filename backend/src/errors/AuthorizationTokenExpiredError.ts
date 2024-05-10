import { BadRequestError } from "./model/BadRequestError";

export class AuthorizationTokenExpiredError extends BadRequestError {
  constructor(message?: string) {
    super({
      message: message || "Authorization token expired",
      code: 401,
    });
  }
}
