import { Router } from "express";
import { SurvivorRoutes } from "./survivor.routes";
import { ReportRoutes } from "./report.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/survivor", SurvivorRoutes.routes);
    router.use("/api/report", ReportRoutes.routes);

    return router;
  }
}
