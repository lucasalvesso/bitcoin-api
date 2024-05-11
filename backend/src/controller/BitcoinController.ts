import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { GetBitcoinPriceUseCase } from "../use-case/GetBitcoinPriceUseCase";
import { BuyBitcoinUseCase } from "../use-case/BuyBitcoinUseCase";
import { BuyBitcoinDto } from "../dto/BuyBitcoinDto";

@injectable()
export class BitcoinController {
  constructor(
    private getBitcoinPriceUseCase: GetBitcoinPriceUseCase,
    private buyBitcoinUseCase: BuyBitcoinUseCase,
  ) {}

  async getPrice(req: Request, res: Response): Promise<void> {
    const price = await this.getBitcoinPriceUseCase.execute();
    res.status(200).json(price);
  }

  async sellBitcoin(req: Request, res: Response) {
    res.status(200).json({ message: "Bitcoin sold successfully" });
  }

  async buyBitcoin(req: Request, res: Response) {
    await this.buyBitcoinUseCase.execute(
      req.loggedUser.email,
      new BuyBitcoinDto(req.body),
    );
    res.status(200).json({ messsage: "Bitcoin bought successfully" });
  }

  async getPosition(req: Request, res: Response) {
    res.status(200).json({});
  }
}
