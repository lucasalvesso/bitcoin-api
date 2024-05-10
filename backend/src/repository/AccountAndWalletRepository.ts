import { Database } from "./Database";
import { injectable } from "tsyringe";
import { AccountEntity } from "../entity/AccountEntity";
import { EntityManager } from "typeorm";

@injectable()
export class AccountAndWalletRepository {
  private manager: EntityManager;

  constructor(private database: Database) {
    this.manager = database.getEntityManager();
  }

  async getByEmail<T extends Partial<AccountEntity>>(
    email: string,
    select?: Array<keyof AccountEntity>,
    relations?: Array<string>,
  ): Promise<T | null> {
    return (await this.manager.findOne(AccountEntity, {
      where: {
        email,
      },
      select,
      relations,
    })) as T | null;
  }

  async save(entity: AccountEntity): Promise<void> {
    try {
      await this.manager.save<AccountEntity>(entity);
    } catch (e) {
      throw e;
    }
  }
}
