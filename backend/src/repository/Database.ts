import { DataSource, EntityManager } from "typeorm";
import { injectable } from "tsyringe";

@injectable()
export class Database implements IDatabase {
  constructor(public connection: DataSource) {}

  getEntityManager(): EntityManager {
    return this.connection.createEntityManager();
  }
}

export interface IDatabase {
  getEntityManager(): EntityManager;
}
