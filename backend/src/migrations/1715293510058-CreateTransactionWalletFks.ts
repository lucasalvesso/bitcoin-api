import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateTransactionWalletFks1715293510058
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "transactions-history",
      new TableForeignKey({
        columnNames: ["wallet_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "wallet",
        name: "FK_transaction_walletId",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "transactions-history",
      "FK_transaction_walletId",
    );
  }
}
