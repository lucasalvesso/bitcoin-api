import { AccountEntity } from "../entity/AccountEntity";

export class ResponseBalanceDto {
  constructor(entity: AccountEntity) {
    Object.assign(this, {
      name: entity.name,
      email: entity.email,
      balance: entity.wallet.balance,
    });
  }

  name: string;
  email: string;
  balance: number;
}
