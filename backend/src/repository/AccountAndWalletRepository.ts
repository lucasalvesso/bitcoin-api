import { Database } from "./Database";
import { injectable } from "tsyringe";
import { AccountEntity } from "../entity/AccountEntity";
import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";

@injectable()
export class AccountAndWalletRepository extends Database<AccountEntity> {
  constructor() {
    super();
  }

  async getByEmail(
    email: string,
    select?: Array<keyof AccountEntity>,
    relations?: Array<string>,
  ): Promise<AccountEntity | null> {
    return await this.findOne({ email }, select, relations);
  }

  async save(entity: AccountEntity): Promise<void> {
    try {
      await this.manager.save<AccountEntity>(entity);
    } catch (e) {
      throw e;
    }
  }

  async findOne(
    where: FindOptionsWhere<AccountEntity>,
    select?: Array<keyof AccountEntity>,
    relations?: Array<string>,
  ): Promise<AccountEntity | null> {
    return await this.manager.findOne(AccountEntity, {
      where,
      select,
      relations,
    });
  }
}
