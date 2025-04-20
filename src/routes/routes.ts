import { Router } from "express";
import { SurvivorRoutes } from "./survivor.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use("/api/survivor", SurvivorRoutes.routes);

    return router;
  }
}
