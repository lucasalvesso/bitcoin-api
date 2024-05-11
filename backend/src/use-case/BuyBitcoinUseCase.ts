import { AccountEntity } from "../entity/AccountEntity";
import { AccountAndWalletRepository } from "../repository/AccountAndWalletRepository";
import { AccountDoesntExistsError } from "../errors/AccountDoesntExistsError";
import { BuyBitcoinDto } from "../dto/BuyBitcoinDto";
import { NoEnoughBalanceError } from "../errors/NoEnoughBalanceError";
import { BitcoinWalletEntity } from "../entity/BitcoinWalletEntity";
import { BuyTransactionBitcoinEntity } from "../entity/BuyTransactionBitcoinEntity";
import { injectable } from "tsyringe";
import { SendPurchaseBitcoinMail } from "../service/email/SendPurchaseBitcoinMail";
import { GetBitcoinPriceUseCase } from "./GetBitcoinPriceUseCase";

@injectable()
export class BuyBitcoinUseCase {
  constructor(
    private accountAndWalletRepository: AccountAndWalletRepository,
    private getBitcoinPriceUseCase: GetBitcoinPriceUseCase,
    private sendPurchaseBitcoinMail: SendPurchaseBitcoinMail,
  ) {}

  async execute(email: string, buyBitcoinDto: BuyBitcoinDto): Promise<void> {
    const account = await this.getAccountByEmail(email);

    if (!account) {
      throw new AccountDoesntExistsError();
    }

    if (buyBitcoinDto.amount > account.wallet.balance) {
      throw new NoEnoughBalanceError();
    }

    const bitcoinCurrentPrice = await this.getBitcoinPriceUseCase.execute();

    account.wallet.balance -= buyBitcoinDto.amount;

    const amountBitcoinBought = buyBitcoinDto.amount / bitcoinCurrentPrice.buy;

    account.wallet.bitcoinWallet = new BitcoinWalletEntity({
      amount: account.wallet.bitcoinWallet
        ? account.wallet.bitcoinWallet.amount + amountBitcoinBought
        : amountBitcoinBought,
      id: account.wallet.bitcoinWallet?.id,
      walletId: account.walletId,
      buyTransactions: account.wallet.bitcoinWallet.buyTransactions || [],
    });

    account.wallet.bitcoinWallet.buyTransactions?.push(
      new BuyTransactionBitcoinEntity({
        walletId: account.walletId,
        amount: amountBitcoinBought,
        paid: buyBitcoinDto.amount,
      }),
    );

    await this.accountAndWalletRepository.save(account);
    await this.sendPurchaseBitcoinMail.execute(
      { amount: amountBitcoinBought, paid: buyBitcoinDto.amount },
      [account.email],
    );
  }

  private async getAccountByEmail(
    email: string,
  ): Promise<AccountEntity | null> {
    return await this.accountAndWalletRepository.getByEmail(email, undefined, [
      "wallet",
      "wallet.bitcoinWallet",
      "wallet.bitcoinWallet.buyTransactions",
    ]);
  }
}
