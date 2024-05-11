import { EmailService } from "./EmailService";
import { injectable } from "tsyringe";

@injectable()
export class SendDepositMail extends EmailService {
  private readonly subject: string;

  constructor() {
    super();

    this.subject = "Amount Deposited";
  }

  async execute(data: { amount: number }, recipient: string[]): Promise<void> {
    await this.sendMail(
      this.subject,
      this.generateHTML(data.amount),
      recipient,
    );
  }

  private generateHTML(value: number): string {
    return `<div>R$ ${value} was successfully deposited to your wallet.</div>`;
  }
}
