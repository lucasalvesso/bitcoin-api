import { MailerSendProvider } from "../../provider/MailerSendProvider";

export abstract class EmailService
  extends MailerSendProvider
  implements IEmailService
{
  protected constructor() {
    super();
  }

  abstract execute(
    data: Record<string, any>,
    recipient: string[],
  ): Promise<void>;
}

interface IEmailService {
  execute(data: Record<string, any>, recipient: string[]): Promise<void>;
}
