import axios from "axios";
import { MercadoBitcoinTickerDto } from "../dto/MercadoBitcoinTickerDto";
import { injectable } from "tsyringe";

@injectable()
export class MercadoBitcoinProvider {
  private readonly url = "https://www.mercadobitcoin.net/api/BTC/ticker/";

  async getBitcoinData(): Promise<MercadoBitcoinTickerDto> {
    try {
      const response = await axios.get(this.url);
      const ticker = response.data?.ticker;
      return new MercadoBitcoinTickerDto(ticker);
    } catch (e) {
      throw e;
    }
  }
}
