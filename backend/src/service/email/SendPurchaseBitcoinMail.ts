import { EmailService } from "./EmailService";
import { injectable } from "tsyringe";

@injectable()
export class SendPurchaseBitcoinMail extends EmailService {
  private readonly subject: string;

  constructor() {
    super();

    this.subject = "Bitcoin Purchase";
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
    return `<div>${amount} bitcoin was bought and R$ ${paid} was debited from your wallet balance.</div>`;
  }
}
