import "reflect-metadata";
import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { routes } from "./src/routes";
import { ErrorHandlerMiddleware } from "./src/middleware/ErrorHandlerMiddleware";
import { schedule } from "node-cron";
import { CronSaveBitcoinData } from "./src/service/CronSaveBitcoinData";

dotenv.config({ path: "../.env" });

const app: express.Application = express();
const port = process.env.SERVER_PORT;

app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["*"],
  }),
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// schedule("* */30 * * * *", CronSaveBitcoinData);

routes(app);

app.use(ErrorHandlerMiddleware);

const main = () => {
  app.listen(port, () => {
    console.log("Server listening on port", port);
  });
};

main();
