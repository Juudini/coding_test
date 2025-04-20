import { Application, Router } from "express";
import { SurvivorController } from "../controller/survivor.controller";

export class SurvivorRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new SurvivorController();

    router.post("/", controller.createSurvivor as Application);

    router.patch(
      "/location/:survivorId",
      controller.updateSurvivorLocation as Application
    );

    return router;
  }
}
