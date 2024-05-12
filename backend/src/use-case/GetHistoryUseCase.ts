import { injectable } from "tsyringe";
import { BitcoinHistoryRepository } from "../repository/BitcoinHistoryRepository";
import { MoreThanOrEqual } from "typeorm";
import moment from "moment";
import { ResponseHistoryDto } from "../dto/ResponseHistoryDto";

@injectable()
export class GetHistoryUseCase {
  constructor(private repository: BitcoinHistoryRepository) {}

  async execute(): Promise<ResponseHistoryDto> {
    const history = await this.repository.find({
      createdAt: MoreThanOrEqual(moment().subtract(25, "hours").toISOString()),
    });

    return new ResponseHistoryDto(history);
  }
}
