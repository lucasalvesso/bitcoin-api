import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { DepositWalletUseCase } from "../use-case/DepositWalletUseCase";
import { BalanceWalletUseCase } from "../use-case/BalanceWalletUseCase";
import { DepositDto } from "../dto/DepositDto";

@injectable()
export class WalletController {
  constructor(
    private depositWalletUseCase: DepositWalletUseCase,
    private balanceWalletUseCase: BalanceWalletUseCase,
  ) {}

  async balance(req: Request, res: Response) {
    const walletBalance = await this.balanceWalletUseCase.getBalanceByEmail(
      req.loggedUser.email,
    );
    res.status(200).json(walletBalance);
  }

  async deposit(req: Request, res: Response) {
    const depositDto = new DepositDto({
      amount: req.body?.amount,
      email: req.loggedUser.email,
    });

    await this.depositWalletUseCase.deposit(depositDto);
    res.status(200).json({ message: "Deposit added successfully" });
  }
}
