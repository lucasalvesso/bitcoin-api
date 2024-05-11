import { AccountAndWalletRepository } from "../repository/AccountAndWalletRepository";
import { injectable } from "tsyringe";
import { AccountEntity } from "../entity/AccountEntity";
import { PasswordHashService } from "../service/PasswordHashService";
import { LoginDto } from "../dto/LoginDto";
import { AccountDoesntExistsError } from "../errors/AccountDoesntExistsError";
import { AuthTokenService } from "../service/AuthTokenService";

@injectable()
export class LoginUseCase {
  constructor(private repository: AccountAndWalletRepository) {}

  async execute(entity: LoginDto): Promise<string> {
    const accountExists = await this.getAccountByEmail(entity);

    if (!accountExists) {
      throw new AccountDoesntExistsError();
    }

    const validAccount = await PasswordHashService.comparePassword(
      entity.password,
      accountExists.password,
    );

    if (!validAccount) {
      throw new AccountDoesntExistsError();
    }

    return AuthTokenService.authenticate(entity);
  }

  private async getAccountByEmail(
    entity: LoginDto,
  ): Promise<Pick<AccountEntity, "password"> | null> {
    return await this.repository.getByEmail(entity.email, ["password"]);
  }
}
