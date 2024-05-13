import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { GetBitcoinPriceUseCase } from "../use-case/GetBitcoinPriceUseCase";
import { BuyBitcoinUseCase } from "../use-case/BuyBitcoinUseCase";
import { BuyBitcoinDto } from "../dto/BuyBitcoinDto";
import { SellBitcoinUseCase } from "../use-case/SellBitcoinUseCase";
import { SellBitcoinDto } from "../dto/SellBitcoinDto";

@injectable()
export class BitcoinController {
  constructor(
    private getBitcoinPriceUseCase: GetBitcoinPriceUseCase,
    private buyBitcoinUseCase: BuyBitcoinUseCase,
    private sellBitcoinUseCase: SellBitcoinUseCase,
  ) {}

  async getPrice(req: Request, res: Response): Promise<void> {
    const price = await this.getBitcoinPriceUseCase.execute();
    res.status(200).json(price);
  }

  async sellBitcoin(req: Request, res: Response) {
    await this.sellBitcoinUseCase.execute(
      req.loggedUser.email,
      new SellBitcoinDto(req.body),
    );
    res.status(200).json({ message: "Bitcoin sold successfully" });
  }

  async buyBitcoin(req: Request, res: Response) {
    await this.buyBitcoinUseCase.execute(
      req.loggedUser.email,
      new BuyBitcoinDto(req.body),
    );
    res.status(200).json({ message: "Bitcoin bought successfully" });
  }

  async getPosition(req: Request, res: Response) {
    res.status(200).json({});
  }
}
