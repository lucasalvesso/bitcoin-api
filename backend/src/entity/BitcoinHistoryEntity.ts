import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("bitcoin_history")
export class BitcoinHistoryEntity {
  constructor(item: Partial<BitcoinHistoryEntity>) {
    if (!item.sell) {
      throw new Error("sell not found");
    }

    if (!item.buy) {
      throw new Error("buy not found");
    }

    Object.assign(this, { sell: item.sell, buy: item.buy });
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float" })
  sell: number;

  @Column({ type: "float" })
  buy: number;

  @Column({ type: "timestamp" })
  createdAt: string;
}
