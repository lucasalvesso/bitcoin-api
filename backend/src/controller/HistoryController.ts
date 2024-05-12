import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { GetHistoryUseCase } from "../use-case/GetHistoryUseCase";

@injectable()
export class HistoryController {
  constructor(private useCase: GetHistoryUseCase) {}

  async getHistory(req: Request, res: Response): Promise<void> {
    const history = await this.useCase.execute();
    res.status(200).json(history);
  }
}
