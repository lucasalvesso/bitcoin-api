import { AccountEntity } from "../entity/AccountEntity";

export class LoginDto {
  constructor(data: Partial<LoginDto>) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      throw new Error("email not valid");
    }

    if (typeof data.password !== "string") {
      throw new Error("password not valid");
    }

    Object.assign(this, { email: data.email, password: data.password });
  }

  email: AccountEntity["email"];
  password: AccountEntity["password"];
}
