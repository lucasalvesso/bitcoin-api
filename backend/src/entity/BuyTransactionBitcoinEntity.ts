import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { WalletEntity } from "./WalletEntity";
import { BitcoinWalletEntity } from "./BitcoinWalletEntity";

@Entity("buy_transactions_bitcoin_history")
export class BuyTransactionBitcoinEntity {
  constructor(item: Partial<BuyTransactionBitcoinEntity>) {
    if (!item.paid) {
      throw new Error("paid not found");
    }

    if (!item.amount) {
      throw new Error("amount not found");
    }

    if (!item.walletId) {
      throw new Error("walletId not found");
    }

    Object.assign(this, {
      paid: item.paid,
      amount: item.amount,
      walletId: item.walletId,
    });
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float" })
  paid: number;

  @Column({ type: "float" })
  amount: number;

  @Column({ type: "int" })
  walletId: number;

  @ManyToOne(() => BitcoinWalletEntity, (wallet) => wallet.buyTransactions)
  @JoinColumn()
  wallet: WalletEntity;

  @Column({ type: "timestamp" })
  createdAt: string;
}
