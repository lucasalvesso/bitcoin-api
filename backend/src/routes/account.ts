import express from "express";
import { container } from "tsyringe";
import { AccountController } from "../controller/AccountController";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const controller = container.resolve(AccountController);
    await controller.save(req, res);
  } catch (e) {
    next(e);
  }
});

export default router;
