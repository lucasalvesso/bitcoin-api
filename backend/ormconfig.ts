import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

dotenv.config({ path: "../.env" });

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + "/src/entity/**/*.ts"],
  migrations: [__dirname + "/src/migrations/*.ts"],
  entitySkipConstructor: true,
  namingStrategy: new SnakeNamingStrategy(),
});

AppDataSource.initialize();
