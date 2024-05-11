import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateBitcoinWalletTable1715364993605
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "bitcoin_wallet",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "amount",
            type: "float",
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

    await queryRunner.createForeignKey(
      "bitcoin_wallet",
      new TableForeignKey({
        columnNames: ["wallet_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "wallet",
        name: "FK_bitcoin_walletId",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("bitcoin_wallet", "FK_bitcoin_walletId");
    await queryRunner.dropTable("bitcoin_wallet");
  }
}
