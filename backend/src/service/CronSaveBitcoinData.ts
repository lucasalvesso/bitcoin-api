import { container, injectable } from "tsyringe";
import { MercadoBitcoinProvider } from "../provider/MercadoBitcoinProvider";
import { BitcoinPriceRedisCache } from "../repository/BitcoinPriceRedisCache";
import { BitcoinHistoryRepository } from "../repository/BitcoinHistoryRepository";
import { BitcoinHistoryEntity } from "../entity/BitcoinHistoryEntity";

export async function CronSaveBitcoinData(): Promise<void> {
  try {
    const service = container.resolve(CronBitcoinService);
    await service.execute();
  } catch (e) {
    throw e;
  }
}

@injectable()
class CronBitcoinService {
  constructor(
    private mercadoBitcoinProvider: MercadoBitcoinProvider,
    private bitcoinPriceRedisCache: BitcoinPriceRedisCache,
    private historyRepository: BitcoinHistoryRepository,
  ) {}

  async execute(): Promise<void> {
    const response = await this.mercadoBitcoinProvider.getBitcoinData();
    await this.bitcoinPriceRedisCache.setCache(response);
    await this.historyRepository.save(
      new BitcoinHistoryEntity({ buy: response.buy, sell: response.sell }),
    );
  }
}
