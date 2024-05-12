import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { QueryGetExtractDto } from "../dto/QueryGetExtractDto";
import { GetExtractUseCase } from "../use-case/GetExtractUseCase";

@injectable()
export class ExtractController {
  constructor(private useCase: GetExtractUseCase) {}

  async getExtract(req: Request, res: Response): Promise<void> {
    const volume = await this.useCase.execute(
      new QueryGetExtractDto({ ...req.query, email: req.loggedUser.email }),
    );
    res.status(200).json(volume);
  }
}
