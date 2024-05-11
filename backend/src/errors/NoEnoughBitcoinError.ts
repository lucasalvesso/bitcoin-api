import { BadRequestError } from "./model/BadRequestError";

export class NoEnoughBitcoinError extends BadRequestError {
  constructor(message?: string) {
    super({
      message: message || "No enough bitcoin balance to sell this amount",
      code: 401,
    });
  }
}
