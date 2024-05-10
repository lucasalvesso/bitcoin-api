import { BadRequestError } from "./model/BadRequestError";

export class AccountDoesntExistsError extends BadRequestError {
  constructor(message?: string) {
    super({
      message: message || "Account does not exists",
      code: 401,
    });
  }
}
