import { envs } from "./config/env.config";
import { Server } from "./server";
import { AppRoutes } from "./routes/routes";
import { CustomError } from "./shared/custom-error";
import { logger } from "./config/logger.config";

(async () => {
  main();
})();

async function main() {
  try {
    new Server({ port: envs.PORT, routes: AppRoutes.routes }).start();
  } catch (err) {
    logger.error(err);
    throw CustomError.internalServer();
  }
}
