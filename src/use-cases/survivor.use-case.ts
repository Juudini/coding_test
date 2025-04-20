// import { GeneralIdDto } from "../dtos/general-id.dto";
import { SurvivorDto } from "../dtos/survivor.dto";
import { CustomError } from "../shared/custom-error";
import { InventoryItemProps } from "../types/inventory-props";
import { v4 as uuid } from "uuid";
import { GeneralIdDto } from "../dtos/general-id.dto";
import prisma from "../shared/prisma";

export class SurvivorUseCase {
  create = async (survivorDto: SurvivorDto) => {
    try {
      const inventoryItems = this.transformInventory(
        survivorDto.inventory as InventoryItemProps[]
      );

      console.log("Survivor use-cases", survivorDto);

      const inventory = await prisma.inventory.create({
        data: {
          id: uuid(),
          items: {
            create: inventoryItems,
          },
        },
        include: {
          items: true,
        },
      });

      const survivor = await prisma.survivor.create({
        data: {
          id: survivorDto.id,
          name: survivorDto.name,
          age: survivorDto.age,
          gender: survivorDto.gender,
          lastLatitude: survivorDto.lastLatitude,
          lastLongitude: survivorDto.lastLongitude,
          inventoryId: inventory.id,
          isInfected: survivorDto.isInfected,
        },
        include: {
          inventory: {
            include: {
              items: true,
            },
          },
        },
      });

      return {
        message: "Survivor created successfully.",
        payload: { survivor: survivor },
      };
    } catch (error) {
      throw CustomError.badRequest("Error creating survivor.");
    }
  };

  private transformInventory(
    items: { type: string; quantity: number }[]
  ): InventoryItemProps[] {
    return items.map((item) => {
      const type = item.type as InventoryItemProps["type"];
      return {
        type,
        quantity: item.quantity,
      };
    });
  }

  updateLocation = async (
    id: GeneralIdDto,
    { lastLatitude, lastLongitude }: SurvivorDto
  ) => {
    const updatedSurvivor = await prisma.survivor.update({
      where: { id: id.id },
      data: {
        lastLatitude,
        lastLongitude,
      },
    });
    return {
      message: "Location updated successfully.",
      payload: { survivor: updatedSurvivor },
    };
  };
}
