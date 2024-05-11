import { EmailService } from "./EmailService";
import { injectable } from "tsyringe";

@injectable()
export class SendSoldBitcoinMail extends EmailService {
  private readonly subject: string;

  constructor() {
    super();

    this.subject = "Bitcoin Sold";
  }

  async execute(
    data: { amount: number; paid: number },
    recipient: string[],
  ): Promise<void> {
    await this.sendMail(
      this.subject,
      this.generateHTML(data.amount, data.paid),
      recipient,
    );
  }

  private generateHTML(amount: number, paid: number): string {
    return `<div>${amount} bitcoin was sold and R$ ${paid} was credited to your wallet balance.</div>`;
  }
}
