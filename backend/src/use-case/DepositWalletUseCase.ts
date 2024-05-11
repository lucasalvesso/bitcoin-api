import { injectable } from "tsyringe";
import { AccountAndWalletRepository } from "../repository/AccountAndWalletRepository";
import { AccountEntity } from "../entity/AccountEntity";
import { AccountDoesntExistsError } from "../errors/AccountDoesntExistsError";
import { DepositDto } from "../dto/DepositDto";
import { TransactionWalletEntity } from "../entity/TransactionWalletEntity";

@injectable()
export class DepositWalletUseCase {
  constructor(private repository: AccountAndWalletRepository) {}

  async deposit(data: DepositDto): Promise<void> {
    const account = await this.getAccount(data.email);

    account.wallet.balance += data.amount;
    account.wallet.transactions.push(
      new TransactionWalletEntity({
        wallet: account.wallet,
        amount: data.amount,
      }),
    );

    await this.repository.save(account);
  }

  private async getAccount(email: string): Promise<AccountEntity> {
    const account = await this.repository.getByEmail(email, undefined, [
      "wallet",
      "wallet.transactions",
    ]);

    if (!account) {
      throw new AccountDoesntExistsError();
    }

    return account;
  }
}
