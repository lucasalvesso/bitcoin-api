export class BitcoinPriceDto {
  constructor(data: Partial<BitcoinPriceDto>) {
    if (!data.buy) {
      throw new Error("buy not found");
    }

    if (!data.sell) {
      throw new Error("sell not found");
    }

    Object.assign(this, {
      buy: Number(data.buy).toFixed(2),
      sell: Number(data.sell).toFixed(2),
    });
  }

  buy: number;
  sell: number;
}
