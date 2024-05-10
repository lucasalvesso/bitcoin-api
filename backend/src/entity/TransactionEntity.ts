import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { WalletEntity } from "./WalletEntity";

@Entity("transactions-history")
export class TransactionEntity {
  constructor(item: Partial<TransactionEntity>) {
    item.amount = item.amount || 0;

    Object.assign(this, item);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float" })
  amount: number;

  @Column({ type: "int" })
  walletId: number;

  @ManyToOne(() => WalletEntity, (wallet) => wallet.transactions)
  @JoinColumn()
  wallet: WalletEntity;
}
