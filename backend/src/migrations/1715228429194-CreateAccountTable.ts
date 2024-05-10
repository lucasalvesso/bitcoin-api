import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAccountTable1715228429194 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "account",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "name",
            type: "text",
          },
          {
            name: "email",
            type: "text",
          },
          {
            name: "password",
            type: "text",
          },
          {
            name: "wallet_id",
            type: "int",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("account");
  }
}
