import { BadRequestError } from "./model/BadRequestError";

export class AuthorizationTokenInvalidError extends BadRequestError {
  constructor(message?: string) {
    super({
      message: message || "Authentication token invalid",
      code: 401,
    });
  }
}
