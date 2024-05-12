import { Database } from "./Database";
import { injectable } from "tsyringe";
import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import { BuyTransactionBitcoinEntity } from "../entity/BuyTransactionBitcoinEntity";

@injectable()
export class BuyTransactionBitcoinRepository extends Database<BuyTransactionBitcoinEntity> {
  constructor() {
    super();
  }

  async find(
    where: FindOptionsWhere<BuyTransactionBitcoinEntity>,
    select?: Array<keyof BuyTransactionBitcoinEntity>,
    relations?: Array<string>,
  ): Promise<BuyTransactionBitcoinEntity[]> {
    return await this.manager.find(BuyTransactionBitcoinEntity, {
      where,
      select,
      relations,
    });
  }
}
