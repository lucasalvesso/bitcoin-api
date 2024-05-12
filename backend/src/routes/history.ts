import express from "express";
import { container } from "tsyringe";
import { HistoryController } from "../controller/HistoryController";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const controller = container.resolve(HistoryController);
    await controller.getHistory(req, res);
  } catch (e) {
    next(e);
  }
});

export default router;
