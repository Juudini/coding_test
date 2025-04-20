import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { InventoryItemProps } from "../types/inventory-props";

const InventoryItemSchema = z.object({
  type: z.enum(["WATER", "FOOD", "MEDICATION", "AMMUNITION"]),
  quantity: z
    .number()
    .int("Quantity must be an integer")
    .positive("Quantity must be a positive integer")
    .max(1000, "Quantity must be at most 1000"),
});

// Esquema para el superviviente (Survivor)
const SurvivorSchema = z
  .object({
    id: z
      .string()
      .uuid()
      .optional()
      .describe("Survivor ID, automatically generated"),
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be at most 100 characters"),
    age: z
      .number()
      .int("Age must be an integer")
      .positive("Age must be a positive integer")
      .max(120, "Age must be at most 120"),
    gender: z
      .string()
      .min(1, "Gender is required")
      .transform((val) => val.toLowerCase()),
    lastLatitude: z.string(),
    lastLongitude: z.string(),
    inventory: InventoryItemSchema.array(),
    isInfected: z.boolean().default(false).describe("Infection status"),
  })
  .strict();

export class SurvivorDto {
  private constructor(
    public name: string,
    public age: number,
    public gender: string,
    public lastLatitude: string,
    public lastLongitude: string,
    public inventory: InventoryItemProps[],
    public isInfected: boolean,
    public id?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, SurvivorDto?] {
    console.log("into SurvivorDto", object);
    const result = SurvivorSchema.safeParse(object);

    if (!result.success) {
      const errorMessages = result.error.issues.map((issue) => {
        const path = issue.path.join(". ");
        return `${path}: ${issue.message}`;
      });
      return [errorMessages.join("; ")];
    }
    if (!result.data.id) {
      result.data.id = uuidv4();
    }

    const data = result.data;

    return [
      undefined,
      new SurvivorDto(
        data.name,
        data.age,
        data.gender,
        data.lastLatitude,
        data.lastLongitude,
        data.inventory,
        data.isInfected,
        data.id
      ),
    ];
  }
}
