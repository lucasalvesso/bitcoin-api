import { BadRequestError } from "./model/BadRequestError";

export class MissingAuthorizationTokenError extends BadRequestError {
  constructor(message?: string) {
    super({
      message: message || "Missing Authorization Token",
      code: 401,
    });
  }
}
