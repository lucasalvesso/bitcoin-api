import { AccountEntity } from "../entity/AccountEntity";

export class LoginDto {
  constructor(data: Partial<LoginDto>) {
    if (!data.email) {
      throw new Error("email not valid");
    }

    if (!data.password) {
      throw new Error("password not valid");
    }

    Object.assign(this, data);
  }

  email: AccountEntity["email"];
  password: AccountEntity["password"];
}
