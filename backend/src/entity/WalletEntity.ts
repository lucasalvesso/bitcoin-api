import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from "typeorm";
import { TransactionEntity } from "./TransactionEntity";
import { AccountEntity } from "./AccountEntity";

@Entity("wallet")
export class WalletEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float", default: 0 })
  balance: number;

  @OneToOne(() => AccountEntity, (account) => account.wallet)
  account: AccountEntity;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.wallet, {
    cascade: true,
  })
  transactions: TransactionEntity[];
}
