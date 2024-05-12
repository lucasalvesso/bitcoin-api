import express from "express";
import { container } from "tsyringe";
import { ExtractController } from "../controller/ExtractController";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const controller = container.resolve(ExtractController);
    await controller.getExtract(req, res);
  } catch (e) {
    next(e);
  }
});

export default router;
