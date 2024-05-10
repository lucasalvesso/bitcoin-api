import { compare, genSalt, hash } from "bcryptjs";

export class PasswordHashService {
  private static SALT_ROUNDS = 10;

  static async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(this.SALT_ROUNDS);
    const hashed = await hash(password, salt);
    return hashed;
  }

  static async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await compare(password, hash);
  }
}
