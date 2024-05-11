import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { AccountEntity } from "../entity/AccountEntity";
import { CreateAccountUseCase } from "../use-case/CreateAccountUseCase";

@injectable()
export class AccountController {
  constructor(private useCase: CreateAccountUseCase) {}

  async save(req: Request, res: Response) {
    const accountData = new AccountEntity(req.body);
    await this.useCase.execute(accountData);
    res.status(201).json({ message: "Account created successfully" });
  }
}
