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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (typeof data.name !== "string") {
      throw new Error("name not valid");
    }

    if (!data.email || !emailRegex.test(data.email)) {
      throw new Error("email not valid");
    }

    if (typeof data.password !== "string") {
      throw new Error("password not valid");
    }

    Object.assign(this, {
      name: data.name,
      email: data.email,
      password: data.password,
    });
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
