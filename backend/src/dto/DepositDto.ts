export class DepositDto {
  constructor(data: Partial<DepositDto>) {
    if (typeof data.amount !== "number") {
      throw new Error("amount not valid");
    }

    if (!data.email) {
      throw new Error("email not valid");
    }

    Object.assign(this, { amount: data.amount, email: data.email });
  }

  amount: number;
  email: string;
}
