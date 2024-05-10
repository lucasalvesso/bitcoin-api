import { BadRequestError } from "./model/BadRequestError";

export class AccountAlreadyExistsError extends BadRequestError {
  constructor(message?: string) {
    super({
      message: message || "Account already exists",
      code: 400,
    });
  }
}
