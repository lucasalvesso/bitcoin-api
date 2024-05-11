import { BadRequestError } from "./model/BadRequestError";

export class BitcoinPriceNotFoundError extends BadRequestError {
  constructor(message?: string) {
    super({
      message: message || "Bitcoin price not found",
      code: 401,
    });
  }
}
