export class SellBitcoinDto {
  constructor(data: Partial<SellBitcoinDto>) {
    if (!data.amount) {
      throw new Error("amount not found");
    }

    Object.assign(this, { amount: data.amount });
  }

  amount: number;
}
