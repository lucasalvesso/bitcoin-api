import { RedisCache } from "./RedisCache";
import { MercadoBitcoinTickerDto } from "../dto/MercadoBitcoinTickerDto";
import { injectable } from "tsyringe";

@injectable()
export class BitcoinPriceRedisCache extends RedisCache {
  constructor() {
    super("BITCOIN_PRICE");
  }

  async setCache(data: MercadoBitcoinTickerDto): Promise<void> {
    await this.setData(data);
  }

  async getCache(): Promise<MercadoBitcoinTickerDto> {
    const cache = await this.getData<MercadoBitcoinTickerDto>();
    return new MercadoBitcoinTickerDto(cache);
  }
}
