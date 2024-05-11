import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTransactionBitcoinHistoryTables1715376409416
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tables = [
      "sell_transactions_bitcoin_history",
      "buy_transactions_bitcoin_history",
    ];

    for (const tableName of tables) {
      await queryRunner.createTable(
        new Table({
          name: tableName,
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
              name: "paid",
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
        tableName,
        new TableForeignKey({
          columnNames: ["wallet_id"],
          referencedColumnNames: ["id"],
          referencedTableName: "wallet",
          name: `FK_${tableName}_walletId`,
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tables = [
      "sell_transactions_bitcoin_history",
      "buy_transactions_bitcoin_history",
    ];

    for (const tableName of tables) {
      await queryRunner.dropForeignKey(tableName, `FK_${tableName}_walletId`);

      await queryRunner.dropTable(tableName);
    }
  }
}
