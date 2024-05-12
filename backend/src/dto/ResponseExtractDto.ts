import moment from "moment";
import { AccountEntity } from "../entity/AccountEntity";

export class ResponseExtractDto {
  constructor(entity: AccountEntity) {
    const operations: Operation[] = [];
    entity.wallet.transactions.forEach((i) => {
      operations.push({
        operation: "deposit",
        amount: i.amount,
        date: moment(i.createdAt).utc(true).toISOString(),
      });
    });

    entity.wallet.bitcoinWallet.sellTransactions?.forEach((i) => {
      operations.push({
        operation: "sell",
        amount: i.amount,
        date: moment(i.createdAt).utc(true).toISOString(),
      });
    });

    entity.wallet.bitcoinWallet.buyTransactions?.forEach((i) => {
      operations.push({
        operation: "buy",
        amount: i.amount,
        date: moment(i.createdAt).utc(true).toISOString(),
      });
    });

    operations.sort((a, b) => moment(a.date).unix() - moment(b.date).unix());

    Object.assign(this, {
      name: entity.name,
      email: entity.email,
      balance: entity.wallet.balance,
      operations,
    });
  }

  name: string;
  email: string;
  balance: number;
  operations: Operation[];
}

type Operation = {
  operation: "deposit" | "buy" | "sell";
  amount: number;
  date: string;
};
