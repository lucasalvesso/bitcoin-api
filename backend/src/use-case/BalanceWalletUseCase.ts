import { AccountAndWalletRepository } from "../repository/AccountAndWalletRepository";
import { AccountDoesntExistsError } from "../errors/AccountDoesntExistsError";
import { ResponseBalanceDto } from "../dto/ResponseBalanceDto";
import { injectable } from "tsyringe";

@injectable()
export class BalanceWalletUseCase {
  constructor(private repository: AccountAndWalletRepository) {}

  async getBalanceByEmail(email: string): Promise<ResponseBalanceDto> {
    const account = await this.repository.getByEmail(email, undefined, [
      "wallet",
    ]);

    if (!account) {
      throw new AccountDoesntExistsError();
    }

    return new ResponseBalanceDto(account);
  }
}
