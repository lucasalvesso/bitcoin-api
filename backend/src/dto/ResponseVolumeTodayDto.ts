import { BuyTransactionBitcoinEntity } from "../entity/BuyTransactionBitcoinEntity";
import { SellTransactionBitcoinEntity } from "../entity/SellTransactionBitcoinEntity";

export class ResponseVolumeTodayDto {
  constructor(
    buy: BuyTransactionBitcoinEntity[],
    sell: SellTransactionBitcoinEntity[],
  ) {
    const buyTotal = buy.reduce((partialSum, a) => partialSum + a.amount, 0);
    const sellTotal = sell.reduce((partialSum, a) => partialSum + a.amount, 0);

    Object.assign(this, {
      buy: buyTotal,
      sell: sellTotal,
    });
  }

  buy: number;
  sell: number;
}
