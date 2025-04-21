import Express, { Router } from "express";
import cors from "cors";
import { logger } from "./config/logger.config";

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  public readonly app = Express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port = 3100, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    /* ★━━━━━━━━━━━★ Middlewares ★━━━━━━━━━━━★ */
    this.app.use(cors({ origin: "*" }));
    this.app.use(Express.json());
    this.app.use(Express.urlencoded({ extended: true }));

    /* ★━━━━━━━━━━━★ Routes ★━━━━━━━━━━━★ */
    this.app.use(this.routes);

    /* ★━━━━━━━━━━━★ Listener ★━━━━━━━━━━━★ */
    this.app.listen(this.port, () => {
      logger.info(`🚀 Server running on port ${this.port}.`);
    });
  }
}
