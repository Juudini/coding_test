import { CustomError } from "../shared/custom-error";
import { GeneralIdDto } from "../dtos/general-id.dto";
import prisma from "../shared/prisma";

export class ReportUseCase {
  reportInfection = async (id: GeneralIdDto) => {
    try {
      let isInfected = false;

      const survivor = await prisma.survivor.findUnique({
        where: { id: id.id },
      });

      if (!survivor) {
        throw CustomError.notFound("Survivor not found.");
      }

      if (survivor?.isInfected) {
        throw CustomError.conflict(
          "Survivor is already infected. No changes made."
        );
      }

      const countReport = await prisma.report.count({
        where: { survivorId: id.id },
      });

      if (countReport === 2) {
        isInfected = true;
      }

      await prisma.report.create({
        data: {
          survivorId: id.id,
          isInfected,
        },
      });

      const updatedSurvivor = await prisma.survivor.update({
        where: { id: id.id },
        data: {
          isInfected,
        },
      });

      return {
        message: "Infection reported successfully",
        payload: { survivor: updatedSurvivor },
      };
    } catch (err) {
      if (err instanceof CustomError) return { error: err.message };
      throw CustomError.badRequest("Error reporting infection");
    }
  };
  getInfectedPercentage = async () => {
    try {
      const [totalSurvivors, infectedCount] = await Promise.all([
        prisma.survivor.count(),
        prisma.survivor.count({
          where: { isInfected: true },
        }),
      ]);

      const percentage =
        totalSurvivors > 0 ? (infectedCount / totalSurvivors) * 100 : 0;

      return {
        message: "Infection percentage calculated successfully",
        payload: {
          percentage: parseFloat(percentage.toFixed(2)),
          infectedCount,
          totalSurvivors,
        },
      };
    } catch (err) {
      throw CustomError.badRequest("Error calculating infection percentage");
    }
  };
  getNonInfectedPercentage = async () => {
    try {
      const [totalSurvivors, nonInfectedCount] = await Promise.all([
        prisma.survivor.count(),
        prisma.survivor.count({
          where: { isInfected: false },
        }),
      ]);

      const percentage =
        totalSurvivors > 0 ? (nonInfectedCount / totalSurvivors) * 100 : 0;

      return {
        message: "Non infection percentage calculated successfully",
        payload: {
          percentage: parseFloat(percentage.toFixed(2)),
          nonInfectedCount,
          totalSurvivors,
        },
      };
    } catch (err) {
      throw CustomError.badRequest(
        "Error calculating non infection percentage"
      );
    }
  };

  getAverageResources = async () => {
    try {
      const nonInfectedSurvivors = await prisma.survivor.findMany({
        where: { isInfected: false },
        include: {
          inventory: {
            select: {
              items: true,
            },
          },
        },
      });

      if (nonInfectedSurvivors.length === 0) {
        throw CustomError.notFound("No non-infected survivors found");
      }

      let totalWater = 0;
      let totalFood = 0;
      let totalMedication = 0;
      let totalAmmunition = 0;

      nonInfectedSurvivors.forEach((survivor) => {
        survivor.inventory.items.forEach((item: any) => {
          switch (item.type) {
            case "WATER":
              totalWater += item.quantity;
              break;
            case "FOOD":
              totalFood += item.quantity;
              break;
            case "MEDICATION":
              totalMedication += item.quantity;
              break;
            case "AMMUNITION":
              totalAmmunition += item.quantity;
              break;
          }
        });
      });

      const survivorCount = nonInfectedSurvivors.length;
      const averages = {
        water: parseFloat((totalWater / survivorCount).toFixed(2)),
        food: parseFloat((totalFood / survivorCount).toFixed(2)),
        medication: parseFloat((totalMedication / survivorCount).toFixed(2)),
        ammunition: parseFloat((totalAmmunition / survivorCount).toFixed(2)),
      };

      return {
        message: "Average resources calculated successfully",
        payload: {
          averages,
          totalSurvivors: survivorCount,
          resourcesCount: {
            water: totalWater,
            food: totalFood,
            medication: totalMedication,
            ammunition: totalAmmunition,
          },
        },
      };
    } catch (err) {
      if (err instanceof CustomError) return { error: err.message };
      throw CustomError.badRequest("Failed to calculate average resources");
    }
  };

  getLostPoints = async () => {
    try {
      const infectedSurvivors = await prisma.survivor.findMany({
        where: { isInfected: true },
        include: {
          inventory: {
            select: {
              items: true,
            },
          },
        },
      });

      let totalLostPoints = 0;
      let itemsDetail = {
        water: { quantity: 0, points: 0 },
        food: { quantity: 0, points: 0 },
        medication: { quantity: 0, points: 0 },
        ammunition: { quantity: 0, points: 0 },
      };

      infectedSurvivors.forEach((survivor) => {
        survivor.inventory.items.forEach((item) => {
          switch (item.type) {
            case "WATER":
              itemsDetail.water.quantity += item.quantity;
              itemsDetail.water.points += item.quantity * 4;
              totalLostPoints += item.quantity * 4;
              break;
            case "FOOD":
              itemsDetail.food.quantity += item.quantity;
              itemsDetail.food.points += item.quantity * 3;
              totalLostPoints += item.quantity * 3;
              break;
            case "MEDICATION":
              itemsDetail.medication.quantity += item.quantity;
              itemsDetail.medication.points += item.quantity * 2;
              totalLostPoints += item.quantity * 2;
              break;
            case "AMMUNITION":
              itemsDetail.ammunition.quantity += item.quantity;
              itemsDetail.ammunition.points += item.quantity * 1;
              totalLostPoints += item.quantity * 1;
              break;
          }
        });
      });

      return {
        message: "Lost points calculated successfully",
        payload: {
          totalLostPoints,
          infectedSurvivorsCount: infectedSurvivors.length,
          itemsDetail,
          pointsByItem: {
            water: itemsDetail.water.points,
            food: itemsDetail.food.points,
            medication: itemsDetail.medication.points,
            ammunition: itemsDetail.ammunition.points,
          },
          pointsSystem: {
            water: 4,
            food: 3,
            medication: 2,
            ammunition: 1,
          },
          calculationDate: new Date(),
        },
      };
    } catch (err) {
      if (err instanceof CustomError) return { error: err.message };

      throw CustomError.badRequest("Failed to calculate lost points");
    }
  };
}
