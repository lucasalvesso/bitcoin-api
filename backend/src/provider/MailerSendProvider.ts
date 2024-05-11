import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";

export class MailerSendProvider {
  private mailerSend: MailerSend;
  private mailFrom: string;

  constructor() {
    this.mailerSend = new MailerSend({
      apiKey: process.env.MAILER_SEND_API_KEY || "",
    });
    this.mailFrom = process.env.MAILER_SEND_DOMAIN || "";
  }

  async sendMail(
    subject: string,
    html: string,
    recipient: string[],
  ): Promise<void> {
    const emailParams = new EmailParams()
      .setFrom(new Sender(this.mailFrom))
      .setTo(recipient.map((i) => new Recipient(i)))
      .setSubject(subject)
      .setHtml(html);

    await this.mailerSend.email.send(emailParams);
  }
}
