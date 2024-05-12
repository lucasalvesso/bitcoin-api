import express from "express";
import { container } from "tsyringe";
import { VolumeController } from "../controller/VolumeController";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const controller = container.resolve(VolumeController);
    await controller.getVolume(req, res);
  } catch (e) {
    next(e);
  }
});

export default router;
