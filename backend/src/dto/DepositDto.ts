export class DepositDto {
  constructor(data: Partial<DepositDto>) {
    if (!data.amount) {
      throw new Error("Deposit not found");
    }

    if (!data.email) {
      throw new Error("Deposit not found");
    }

    Object.assign(this, { amount: data.amount, email: data.email });
  }

  amount: number;
  email: string;
}
