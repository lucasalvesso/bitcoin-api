import { BitcoinPriceRedisCache } from "../repository/BitcoinPriceRedisCache";
import { BitcoinPriceDto } from "../dto/BitcoinPriceDto";

export class SellBitcoinUseCase {
  constructor(private cacheRepository: BitcoinPriceRedisCache) {}

  async execute(): Promise<BitcoinPriceDto> {
    const price = await this.cacheRepository.getCache();
    return new BitcoinPriceDto(price);
  }
}
