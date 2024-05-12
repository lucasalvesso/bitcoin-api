import { Database } from "./Database";
import { injectable } from "tsyringe";
import { AccountEntity } from "../entity/AccountEntity";
import { SellTransactionBitcoinEntity } from "../entity/SellTransactionBitcoinEntity";
import { QueryGetExtractDto } from "../dto/QueryGetExtractDto";
import { BuyTransactionBitcoinEntity } from "../entity/BuyTransactionBitcoinEntity";
import { TransactionWalletEntity } from "../entity/TransactionWalletEntity";

@injectable()
export class ExtractRepository extends Database<AccountEntity> {
  constructor() {
    super();
  }

  async getExtract(query: QueryGetExtractDto): Promise<AccountEntity | null> {
    const subQuerySells = this.manager
      .createQueryBuilder(SellTransactionBitcoinEntity, "sellTransactions")
      .select("sellTransactions.id")
      .where(
        `sellTransactions.createdAt BETWEEN '${query.startDate}' AND '${query.endDate}'`,
      );

    const subQueryBuys = this.manager
      .createQueryBuilder(BuyTransactionBitcoinEntity, "buyTransactions")
      .select("buyTransactions.id")
      .where(
        `buyTransactions.createdAt BETWEEN '${query.startDate}' AND '${query.endDate}'`,
      );

    const subQueryDeposits = this.manager
      .createQueryBuilder(TransactionWalletEntity, "deposits")
      .select("deposits.id")
      .where(
        `deposits.createdAt BETWEEN '${query.startDate}' AND '${query.endDate}'`,
      );

    const queryBuilder = this.manager.createQueryBuilder(
      AccountEntity,
      "account",
    );

    queryBuilder.leftJoinAndSelect("account.wallet", "wallet");

    queryBuilder.leftJoinAndSelect(
      "wallet.transactions",
      "deposits",
      `deposits.id in (${subQueryDeposits.getQuery()})`,
    );

    queryBuilder.leftJoinAndSelect("wallet.bitcoinWallet", "bitcoinWallet");

    queryBuilder.leftJoinAndSelect(
      "bitcoinWallet.buyTransactions",
      "buyTransactions",
      `buyTransactions.id in (${subQueryBuys.getQuery()})`,
    );

    queryBuilder.leftJoinAndSelect(
      "bitcoinWallet.sellTransactions",
      "sellTransactions",
      `sellTransactions.id in (${subQuerySells.getQuery()})`,
    );

    return await queryBuilder.getOne();
  }
}
