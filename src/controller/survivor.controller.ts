import { Request, Response } from "express";
import { SurvivorUseCase } from "../use-cases/survivor.use-case";
import { CustomError } from "../shared/custom-error";
import { SurvivorDto } from "../dtos/survivor.dto";
import { GeneralIdDto } from "../dtos/general-id.dto";
import { SurvivorPartialDto } from "../dtos/survivor-partial.dto";

export class SurvivorController {
  private readonly survivorUseCase = new SurvivorUseCase();

  private handleError = (err: unknown, res: Response) => {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    return res.status(500).json({ error: "Something went wrong" });
  };

  createSurvivor = (req: Request, res: Response) => {
    const [error, survivorDto] = SurvivorDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.survivorUseCase
      .create(survivorDto!)
      .then((data) => res.json(data))
      .catch((err) => this.handleError(err, res));
  };

  updateSurvivorLocation = (req: Request, res: Response) => {
    const [errorId, survivorIdDto] = GeneralIdDto.create(req.params.survivorId);
    const [errorDto, survivorDto] = SurvivorPartialDto.create(req.body);

    if (errorId) return res.status(400).json({ errorId });
    if (errorDto) return res.status(400).json({ errorDto });

    this.survivorUseCase
      .updateLocation(survivorIdDto!, survivorDto! as SurvivorDto)
      .then((data) => res.json(data))
      .catch((err) => this.handleError(err, res));
  };
}
