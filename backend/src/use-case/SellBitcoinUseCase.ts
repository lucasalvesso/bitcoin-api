import { AccountDoesntExistsError } from "../errors/AccountDoesntExistsError";
import { SellBitcoinDto } from "../dto/SellBitcoinDto";
import { AccountEntity } from "../entity/AccountEntity";
import { AccountAndWalletRepository } from "../repository/AccountAndWalletRepository";
import { NoEnoughBitcoinError } from "../errors/NoEnoughBitcoinError";
import { GetBitcoinPriceUseCase } from "./GetBitcoinPriceUseCase";
import { SendSoldBitcoinMail } from "../service/email/SendSoldBitcoinMail";
import { BitcoinWalletEntity } from "../entity/BitcoinWalletEntity";
import { SellTransactionBitcoinEntity } from "../entity/SellTransactionBitcoinEntity";
import { injectable } from "tsyringe";

@injectable()
export class SellBitcoinUseCase {
  constructor(
    private accountAndWalletRepository: AccountAndWalletRepository,
    private getBitcoinPriceUseCase: GetBitcoinPriceUseCase,
    private sendSoldBitcoinMail: SendSoldBitcoinMail,
  ) {}

  async execute(email: string, sellBitcoinDto: SellBitcoinDto): Promise<void> {
    const account = await this.getAccountByEmail(email);

    if (!account) {
      throw new AccountDoesntExistsError();
    }

    const bitcoinCurrentPrice = await this.getBitcoinPriceUseCase.execute();

    const amountBitcoinToSell =
      sellBitcoinDto.amount / bitcoinCurrentPrice.sell;

    if (amountBitcoinToSell > account.wallet.bitcoinWallet.amount) {
      throw new NoEnoughBitcoinError();
    }

    account.wallet.balance += sellBitcoinDto.amount;

    account.wallet.bitcoinWallet = new BitcoinWalletEntity({
      amount: account.wallet.bitcoinWallet.amount - amountBitcoinToSell,
      id: account.wallet.bitcoinWallet.id,
      walletId: account.walletId,
      sellTransactions: account.wallet.bitcoinWallet.sellTransactions || [],
    });

    account.wallet.bitcoinWallet.sellTransactions?.push(
      new SellTransactionBitcoinEntity({
        walletId: account.walletId,
        amount: amountBitcoinToSell,
        paid: sellBitcoinDto.amount,
      }),
    );

    await this.accountAndWalletRepository.save(account);
    await this.sendSoldBitcoinMail.execute(
      { amount: amountBitcoinToSell, paid: sellBitcoinDto.amount },
      [account.email],
    );
  }

  private async getAccountByEmail(
    email: string,
  ): Promise<AccountEntity | null> {
    return await this.accountAndWalletRepository.getByEmail(email, undefined, [
      "wallet",
      "wallet.bitcoinWallet",
      "wallet.bitcoinWallet.sellTransactions",
    ]);
  }
}
