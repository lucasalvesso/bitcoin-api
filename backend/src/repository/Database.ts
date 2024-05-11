import { DataSource, EntityManager } from "typeorm";
import { AppDataSource } from "../../ormconfig";
import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";

export abstract class Database<T> implements IDatabase<T> {
  public connection: DataSource;
  public manager: EntityManager;

  constructor() {
    this.connection = AppDataSource;
    this.manager = this.connection.createEntityManager();
  }

  abstract findOne(
    where: FindOptionsWhere<T>,
    select?: Array<keyof T>,
    relations?: Array<string>,
  ): Promise<T | null>;

  abstract save(entity: T): Promise<void>;
}

interface IDatabase<T> {
  findOne(
    where: FindOptionsWhere<T>,
    select?: Array<keyof T>,
    relations?: Array<string>,
  ): Promise<T | null>;

  save(entity: T): Promise<void>;
}
