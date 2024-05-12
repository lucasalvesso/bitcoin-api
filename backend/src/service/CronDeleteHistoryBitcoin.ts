import { container, injectable } from "tsyringe";
import { BitcoinHistoryRepository } from "../repository/BitcoinHistoryRepository";
import moment from "moment";

export async function CronDeleteHistoryBitcoin(): Promise<void> {
  try {
    const service = container.resolve(CronDeleteHistoryBitcoinService);
    await service.execute();
  } catch (e) {
    throw e;
  }
}

@injectable()
class CronDeleteHistoryBitcoinService {
  constructor(private historyRepository: BitcoinHistoryRepository) {}

  async execute(): Promise<void> {
    await this.historyRepository.delete([
      `createdAt <= '${moment().subtract(90, "days").toISOString()}'`,
    ]);
  }
}
