import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { GetVolumeUseCase } from "../use-case/GetVolumeUseCase";

@injectable()
export class VolumeController {
  constructor(private useCase: GetVolumeUseCase) {}

  async getVolume(req: Request, res: Response): Promise<void> {
    const volume = await this.useCase.execute();
    res.status(200).json(volume);
  }
}
