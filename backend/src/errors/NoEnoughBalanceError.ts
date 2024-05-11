import { BadRequestError } from "./model/BadRequestError";

export class NoEnoughBalanceError extends BadRequestError {
  constructor(message?: string) {
    super({
      message: message || "No enough balance to buy this amount",
      code: 401,
    });
  }
}
