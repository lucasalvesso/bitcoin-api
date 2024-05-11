import { container, injectable } from "tsyringe";
import { MercadoBitcoinProvider } from "../provider/MercadoBitcoinProvider";
import { BitcoinPriceRedisCache } from "../repository/BitcoinPriceRedisCache";

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
  ) {}

  async execute(): Promise<void> {
    const response = await this.mercadoBitcoinProvider.getBitcoinData();
    await this.bitcoinPriceRedisCache.setCache(response);
  }
}
