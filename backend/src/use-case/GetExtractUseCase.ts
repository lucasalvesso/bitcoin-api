import { injectable } from "tsyringe";
import { AccountEntity } from "../entity/AccountEntity";
import { AccountDoesntExistsError } from "../errors/AccountDoesntExistsError";
import { QueryGetExtractDto } from "../dto/QueryGetExtractDto";
import { ResponseExtractDto } from "../dto/ResponseExtractDto";
import { ExtractRepository } from "../repository/ExtractRepository";

@injectable()
export class GetExtractUseCase {
  constructor(private repository: ExtractRepository) {}

  async execute(query: QueryGetExtractDto): Promise<ResponseExtractDto> {
    const account = await this.getAccount(query);

    return new ResponseExtractDto(account);
  }

  private async getAccount(query: QueryGetExtractDto): Promise<AccountEntity> {
    const account = await this.repository.getExtract(query);

    if (!account) {
      throw new AccountDoesntExistsError();
    }

    return account;
  }
}
