import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateAccountWalletFks1715293358976 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "account",
      new TableForeignKey({
        columnNames: ["wallet_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "wallet",
        name: "FK_account_walletId",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("account", "FK_account_walletId");
  }
}
