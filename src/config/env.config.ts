import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").default(4000).asPortNumber(),
  MODE: get("MODE").default("dev").asString(),
};
