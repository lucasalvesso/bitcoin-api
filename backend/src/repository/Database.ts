import { DataSource, EntityManager } from "typeorm";
import { AppDataSource } from "../../ormconfig";
import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";

export abstract class Database<T> implements IDatabase<T> {
  public connection: DataSource;
  public manager: EntityManager;

  protected constructor() {
    this.connection = AppDataSource;
    this.manager = this.connection.createEntityManager();
  }

  findOne?(
    where: FindOptionsWhere<T>,
    select?: Array<keyof T>,
    relations?: Array<string>,
  ): Promise<T | null>;

  find?(
    where: FindOptionsWhere<T>,
    select?: Array<keyof T>,
    relations?: Array<string>,
  ): Promise<T[]>;

  save?(entity: T): Promise<void>;

  delete?(where: string[]): Promise<void>;
}

interface IDatabase<T> {
  findOne?(
    where: FindOptionsWhere<T>,
    select?: Array<keyof T>,
    relations?: Array<string>,
  ): Promise<T | null>;

  find?(
    where: FindOptionsWhere<T>,
    select?: Array<keyof T>,
    relations?: Array<string>,
  ): Promise<T[]>;

  save?(entity: T): Promise<void>;

  delete?(where: string[]): Promise<void>;
}
