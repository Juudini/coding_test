import { envs } from "./env.config";
import winston from "winston";

export const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: `@/../logs/error.log`,
      level: "error",
    }),
    new winston.transports.File({
      filename: `@/../logs/combined.log`,
    }),
  ],
});

if (envs.MODE === "dev") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: "HH:mm:ss" }),
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
    })
  );
}
