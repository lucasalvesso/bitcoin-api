import { Database } from "./Database";
import { injectable } from "tsyringe";
import { BitcoinHistoryEntity } from "../entity/BitcoinHistoryEntity";
import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";

@injectable()
export class BitcoinHistoryRepository extends Database<BitcoinHistoryEntity> {
  constructor() {
    super();
  }

  async save(entity: BitcoinHistoryEntity): Promise<void> {
    await this.manager.save(entity);
  }

  async find(
    where: FindOptionsWhere<BitcoinHistoryEntity>,
    select?: Array<keyof BitcoinHistoryEntity>,
    relations?: Array<string>,
  ): Promise<BitcoinHistoryEntity[]> {
    return await this.manager.find(BitcoinHistoryEntity, {
      where,
      select,
      relations,
    });
  }

  async delete(where: string[]): Promise<void> {
    const query = this.manager
      .createQueryBuilder()
      .delete()
      .from(BitcoinHistoryEntity);

    where.forEach((i) => query.andWhere(i));

    await query.execute();
  }
}
