import { Application } from "express";
import Account from "./routes/account";
import Login from "./routes/login";
import Wallet from "./routes/account-wallet";
import Bitcoin from "./routes/bitcoin";
import Volume from "./routes/volume";
import Extract from "./routes/extract";
import History from "./routes/history";
import { TokenAuthValidateMiddleware } from "./middleware/TokenAuthValidateMiddleware";

export const routes = (app: Application) => {
  app.use("/account", Account);
  app.use("/login", Login);
  app.use("/account/", [TokenAuthValidateMiddleware], Wallet);
  app.use("/btc", [TokenAuthValidateMiddleware], Bitcoin);
  app.use("/volume", [TokenAuthValidateMiddleware], Volume);
  app.use("/extract", [TokenAuthValidateMiddleware], Extract);
  app.use("/history", [TokenAuthValidateMiddleware], History);
};
