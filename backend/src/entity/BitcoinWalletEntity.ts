import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { WalletEntity } from "./WalletEntity";
import { BuyTransactionBitcoinEntity } from "./BuyTransactionBitcoinEntity";
import { SellTransactionBitcoinEntity } from "./SellTransactionBitcoinEntity";

@Entity("bitcoin_wallet")
export class BitcoinWalletEntity {
  constructor(item: Partial<BitcoinWalletEntity>) {
    item.amount = item.amount || 0;

    Object.assign(this, {
      amount: item.amount,
      walletId: item.walletId,
      id: item.id,
    });
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

  @OneToMany(
    () => BuyTransactionBitcoinEntity,
    (transaction) => transaction.wallet,
    {
      cascade: true,
    },
  )
  buyTransactions?: BuyTransactionBitcoinEntity[];

  @OneToMany(
    () => SellTransactionBitcoinEntity,
    (transaction) => transaction.wallet,
    {
      cascade: true,
    },
  )
  sellTransactions?: SellTransactionBitcoinEntity[];
}
