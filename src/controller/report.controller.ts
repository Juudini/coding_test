import { Request, Response } from "express";
import { CustomError } from "../shared/custom-error";
import { GeneralIdDto } from "../dtos/general-id.dto";
import { ReportUseCase } from "../use-cases/report.use-case";

export class ReportController {
  private readonly reportUseCase = new ReportUseCase();

  private handleError = (err: unknown, res: Response) => {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    return res.status(500).json({ error: "Something went wrong" });
  };

  reportInfection = (req: Request, res: Response) => {
    const [errorId, survivorIdDto] = GeneralIdDto.create(req.params.survivorId);

    if (errorId) return res.status(400).json({ errorId });

    this.reportUseCase
      .reportInfection(survivorIdDto!)
      .then((data) => res.json(data))
      .catch((err) => this.handleError(err, res));
  };

  getInfectedPercentage = (req: Request, res: Response) => {
    this.reportUseCase
      .getInfectedPercentage()
      .then((data) => res.json(data))
      .catch((err) => this.handleError(err, res));
  };

  getNonInfectedPercentage = (req: Request, res: Response) => {
    this.reportUseCase
      .getNonInfectedPercentage()
      .then((data) => res.json(data))
      .catch((err) => this.handleError(err, res));
  };

  getAverageResources = (req: Request, res: Response) => {
    this.reportUseCase
      .getAverageResources()
      .then((data) => res.json(data))
      .catch((err) => this.handleError(err, res));
  };

  getLostPoints = (req: Request, res: Response) => {
    this.reportUseCase
      .getLostPoints()
      .then((data) => res.json(data))
      .catch((err) => this.handleError(err, res));
  };
}
