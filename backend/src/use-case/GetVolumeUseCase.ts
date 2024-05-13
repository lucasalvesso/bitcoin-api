import { injectable } from "tsyringe";
import { SellTransactionBitcoinRepository } from "../repository/SellTransactionBitcoinRepository";
import { BuyTransactionBitcoinRepository } from "../repository/BuyTransactionBitcoinRepository";
import { Between } from "typeorm";
import moment from "moment";
import { ResponseVolumeTodayDto } from "../dto/ResponseVolumeTodayDto";

@injectable()
export class GetVolumeUseCase {
  constructor(
    private sellTransactionBitcoinRepository: SellTransactionBitcoinRepository,
    private buyTransactionBitcoinRepository: BuyTransactionBitcoinRepository,
  ) {}

  async execute(): Promise<ResponseVolumeTodayDto> {
    const todayInit = moment().startOf("day");
    const todayInitDate = todayInit.clone().startOf("day").toISOString();
    const todayEndDate = todayInit.clone().endOf("day").toISOString();
    const [buys, sells] = await Promise.all([
      this.buyTransactionBitcoinRepository.find(
        {
          createdAt: Between(todayInitDate, todayEndDate),
        },
        ["amount"],
      ),
      this.sellTransactionBitcoinRepository.find(
        {
          createdAt: Between(todayInitDate, todayEndDate),
        },
        ["amount"],
      ),
    ]);

    return new ResponseVolumeTodayDto(buys, sells);
  }
}
