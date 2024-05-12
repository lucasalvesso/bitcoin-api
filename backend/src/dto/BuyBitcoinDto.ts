export class BuyBitcoinDto {
  constructor(data: Partial<BuyBitcoinDto>) {
    if (typeof data.amount !== "number") {
      throw new Error("amount not valid");
    }

    Object.assign(this, { amount: data.amount });
  }

  amount: number;
}
