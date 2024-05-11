import { AccountAndWalletRepository } from "../repository/AccountAndWalletRepository";
import { injectable } from "tsyringe";
import { AccountEntity } from "../entity/AccountEntity";
import { PasswordHashService } from "../service/PasswordHashService";
import { AccountAlreadyExistsError } from "../errors/AccountAlreadyExistsError";
import { WalletEntity } from "../entity/WalletEntity";
import { TransactionWalletEntity } from "../entity/TransactionWalletEntity";

@injectable()
export class CreateAccountUseCase {
  constructor(private repository: AccountAndWalletRepository) {}

  async execute(entity: AccountEntity): Promise<void> {
    const accountAlreadyExists = await this.getAccountByEmail(entity);

    if (accountAlreadyExists) {
      throw new AccountAlreadyExistsError();
    }

    entity.password = await PasswordHashService.hashPassword(entity.password);

    entity.wallet = new WalletEntity();
    entity.wallet.transactions = [new TransactionWalletEntity({ amount: 0 })];
    await this.repository.save(entity);
  }

  private async getAccountByEmail(
    entity: AccountEntity,
  ): Promise<Pick<AccountEntity, "id"> | null> {
    return await this.repository.getByEmail(entity.email, ["id"]);
  }
}
