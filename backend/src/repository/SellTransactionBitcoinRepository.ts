import { Database } from "./Database";
import { injectable } from "tsyringe";
import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import { SellTransactionBitcoinEntity } from "../entity/SellTransactionBitcoinEntity";

@injectable()
export class SellTransactionBitcoinRepository extends Database<SellTransactionBitcoinEntity> {
  constructor() {
    super();
  }

  async find(
    where: FindOptionsWhere<SellTransactionBitcoinEntity>,
    select?: Array<keyof SellTransactionBitcoinEntity>,
    relations?: Array<string>,
  ): Promise<SellTransactionBitcoinEntity[]> {
    return await this.manager.find(SellTransactionBitcoinEntity, {
      where,
      select,
      relations,
    });
  }
}
