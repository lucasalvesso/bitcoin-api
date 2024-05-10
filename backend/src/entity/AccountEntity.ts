import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { WalletEntity } from "./WalletEntity";

@Entity("account")
export class AccountEntity {
  constructor(data: Partial<AccountEntity>) {
    if (!data.name) {
      throw new Error("name not valid");
    }

    if (!data.email) {
      throw new Error("email not valid");
    }

    if (!data.password) {
      throw new Error("password not valid");
    }

    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: "integer", name: "wallet_id" })
  walletId: number;

  @OneToOne(() => WalletEntity, { cascade: true })
  @JoinColumn()
  wallet: WalletEntity;
}
