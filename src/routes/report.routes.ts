import { Application, Router } from "express";
import { ReportController } from "../controller/report.controller";

export class ReportRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ReportController();

    router.get("/stats/infected", controller.getInfectedPercentage);
    router.get("/stats/healthy", controller.getNonInfectedPercentage);
    router.get("/stats/resources", controller.getAverageResources);
    router.get("/stats/points-lost", controller.getLostPoints);

    router.post("/:survivorId", controller.reportInfection as Application);

    return router;
  }
}
