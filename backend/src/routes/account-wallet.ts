import express from "express";
import { container } from "tsyringe";
import { WalletController } from "../controller/WalletController";

const router = express.Router();

router.post("/deposit", async (req, res, next) => {
  try {
    const controller = container.resolve(WalletController);
    await controller.deposit(req, res);
  } catch (e) {
    next(e);
  }
});

router.get("/balance", async (req, res, next) => {
  try {
    const controller = container.resolve(WalletController);
    await controller.balance(req, res);
  } catch (e) {
    next(e);
  }
});

export default router;
