import { Application } from "express";
import Account from "./routes/account";
import Login from "./routes/login";
import Wallet from "./routes/account-wallet";
import { CreateDatabaseConnectionMiddleware } from "./middleware/CreateDatabaseConnectionMiddleware";
import { TokenAuthValidateMiddleware } from "./middleware/TokenAuthValidateMiddleware";

export const routes = (app: Application) => {
  app.use("/account", [CreateDatabaseConnectionMiddleware], Account);
  app.use("/login", [CreateDatabaseConnectionMiddleware], Login);

  app.use(
    "/account/",
    [TokenAuthValidateMiddleware, CreateDatabaseConnectionMiddleware],
    Wallet,
  );
};
