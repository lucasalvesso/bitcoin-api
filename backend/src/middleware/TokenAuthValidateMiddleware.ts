import { NextFunction, Request, Response } from "express";
import { MissingAuthorizationTokenError } from "../errors/MissingAuthorizationTokenError";
import { AuthTokenService } from "../service/AuthTokenService";
import { AuthorizationTokenInvalidError } from "../errors/AuthorizationTokenInvalidError";

export function TokenAuthValidateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const token = (req.headers.Authorization || req.headers.authorization) as
    | string
    | undefined;

  if (!token) {
    throw new MissingAuthorizationTokenError();
  }

  const tokenValid = AuthTokenService.verifyTokenIsValid(token);

  if (!tokenValid || typeof tokenValid === "string") {
    throw new AuthorizationTokenInvalidError();
  }

  req.loggedUser = { email: tokenValid.email };

  next();
}
