export class BuyBitcoinDto {
  constructor(data: Partial<BuyBitcoinDto>) {
    if (!data.amount) {
      throw new Error("amount not found");
    }

    Object.assign(this, { amount: data.amount });
  }

  amount: number;
}
