import { BitcoinPriceRedisCache } from "../repository/BitcoinPriceRedisCache";
import { BitcoinPriceDto } from "../dto/BitcoinPriceDto";
import { injectable } from "tsyringe";
import { MercadoBitcoinProvider } from "../provider/MercadoBitcoinProvider";
import { BitcoinPriceNotFoundError } from "../errors/BitcoinPriceNotFoundError";

@injectable()
export class GetBitcoinPriceUseCase {
  constructor(
    private cacheRepository: BitcoinPriceRedisCache,
    private mercadoBitcoinProvider: MercadoBitcoinProvider,
  ) {}

  async execute(): Promise<BitcoinPriceDto> {
    let price;

    try {
      price = await this.cacheRepository.getCache();
    } catch (e) {
      price = await this.mercadoBitcoinProvider.getBitcoinData();
    }

    if (!price) {
      throw new BitcoinPriceNotFoundError();
    }

    return new BitcoinPriceDto(price);
  }
}
