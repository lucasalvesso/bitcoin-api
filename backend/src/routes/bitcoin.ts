import express from "express";
import { container } from "tsyringe";
import { BitcoinController } from "../controller/BitcoinController";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const controller = container.resolve(BitcoinController);
    await controller.getPosition(req, res);
  } catch (e) {
    next(e);
  }
});

router.post("/sell", async (req, res, next) => {
  try {
    const controller = container.resolve(BitcoinController);
    await controller.sellBitcoin(req, res);
  } catch (e) {
    next(e);
  }
});

router.post("/purchase", async (req, res, next) => {
  try {
    const controller = container.resolve(BitcoinController);
    await controller.buyBitcoin(req, res);
  } catch (e) {
    next(e);
  }
});

router.get("/price", async (req, res, next) => {
  try {
    const controller = container.resolve(BitcoinController);
    await controller.getPrice(req, res);
  } catch (e) {
    next(e);
  }
});

export default router;
