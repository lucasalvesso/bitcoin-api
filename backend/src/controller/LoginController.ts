import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import { LoginUseCase } from "../use-case/LoginUseCase";
import { LoginDto } from "../dto/LoginDto";

@autoInjectable()
export class LoginController {
  constructor(private useCase: LoginUseCase) {}

  async login(req: Request, res: Response) {
    const accountData = new LoginDto(req.body);
    const token = await this.useCase.exec(accountData);
    res.status(200).json({ token });
  }
}
