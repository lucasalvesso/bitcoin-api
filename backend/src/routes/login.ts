import express from "express";
import { container } from "tsyringe";
import { LoginController } from "../controller/LoginController";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const controller = container.resolve(LoginController);
    await controller.login(req, res);
  } catch (e) {
    next(e);
  }
});

export default router;
