import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { LoginUseCase } from "../use-case/LoginUseCase";
import { LoginDto } from "../dto/LoginDto";

@injectable()
export class LoginController {
  constructor(private useCase: LoginUseCase) {}

  async login(req: Request, res: Response) {
    const accountData = new LoginDto(req.body);
    const token = await this.useCase.execute(accountData);
    res.status(200).json({ token });
  }
}
