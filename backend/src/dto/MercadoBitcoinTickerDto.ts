export class MercadoBitcoinTickerDto {
  constructor(data: Partial<MercadoBitcoinTickerDto>) {
    if (!data.high) {
      throw new Error("High not found.");
    }

    if (!data.low) {
      throw new Error("Low not found.");
    }

    if (!data.vol) {
      throw new Error("Vol not found.");
    }

    if (!data.last) {
      throw new Error("Last not found.");
    }

    if (!data.buy) {
      throw new Error("Buy not found.");
    }

    if (!data.sell) {
      throw new Error("Sell not found.");
    }

    if (!data.open) {
      throw new Error("Open not found.");
    }

    if (!data.date) {
      throw new Error("Date not found.");
    }

    Object.assign(this, {
      high: data.high,
      low: data.low,
      vol: data.vol,
      last: data.last,
      buy: data.buy,
      sell: data.sell,
      open: data.open,
      date: new Date(data.date).toISOString(),
    });
  }
  high: number;
  low: number;
  vol: number;
  last: number;
  buy: number;
  sell: number;
  open: number;
  date: string;
}
