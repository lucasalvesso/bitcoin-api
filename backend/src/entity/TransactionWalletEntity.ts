import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { WalletEntity } from "./WalletEntity";

@Entity("transactions_wallet_history")
export class TransactionWalletEntity {
  constructor(item: Partial<TransactionWalletEntity>) {
    item.amount = item.amount || 0;

    Object.assign(this, { amount: item.amount });
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

  @Column({ type: "timestamp" })
  createdAt: string;
}
