import { sign, verify, JwtPayload } from "jsonwebtoken";
import { LoginDto } from "../dto/LoginDto";
import { BadRequestError } from "../errors/model/BadRequestError";
import { AuthorizationTokenExpiredError } from "../errors/AuthorizationTokenExpiredError";

export class AuthTokenService {
  private static tokenExpirationTime = "1h";
  static verifyTokenIsValid(token: string): JwtPayload | string | undefined {
    try {
      return verify(
        token.replace("Bearer ", ""),
        process.env.JWT_SECRET_KEY || "",
      );
    } catch (e) {
      const error = e as { message: string };
      if (error.message === "jwt expired") {
        throw new AuthorizationTokenExpiredError();
      }

      console.error(e);
      return;
    }
  }

  static authenticate(entity: LoginDto): string {
    try {
      return sign(
        { email: entity.email, password: entity.password },
        process.env.JWT_SECRET_KEY || "",
        { expiresIn: this.tokenExpirationTime },
      );
    } catch (e) {
      console.error(e);
      throw new BadRequestError();
    }
  }
}
