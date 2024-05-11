import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from "typeorm";
import { TransactionWalletEntity } from "./TransactionWalletEntity";
import { AccountEntity } from "./AccountEntity";
import { BitcoinWalletEntity } from "./BitcoinWalletEntity";

@Entity("wallet")
export class WalletEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float", default: 0 })
  balance: number;

  @OneToOne(() => AccountEntity, (account) => account.wallet)
  account: AccountEntity;

  @OneToMany(
    () => TransactionWalletEntity,
    (transaction) => transaction.wallet,
    {
      cascade: true,
    },
  )
  transactions: TransactionWalletEntity[];

  @OneToOne(
    () => BitcoinWalletEntity,
    (bitcoinEntity) => bitcoinEntity.wallet,
    {
      cascade: true,
    },
  )
  bitcoinWallet: BitcoinWalletEntity;
}
