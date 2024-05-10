import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import { AccountEntity } from "../entity/AccountEntity";
import { CreateAccountUseCase } from "../use-case/CreateAccountUseCase";

@autoInjectable()
export class AccountController {
  constructor(private useCase: CreateAccountUseCase) {}

  async save(req: Request, res: Response) {
    const accountData = new AccountEntity(req.body);
    await this.useCase.exec(accountData);
    res.status(201).json({ message: "Account created successfully" });
  }
}
