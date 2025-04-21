import { InventoryItemProps } from "../types/inventory-props";
import { SurvivorProps } from "../types/survivor-props";

export class SurvivorPartialDto implements Partial<SurvivorProps> {
  public id?: string;
  public name?: string;
  public age?: number;
  public gender?: string;
  public lastLatitude?: string;
  public lastLongitude?: string;
  public isInfected?: boolean;
  public inventory?: InventoryItemProps[];

  private constructor(partialData: Partial<SurvivorPartialDto>) {
    Object.assign(this, partialData);
  }

  static create(
    partialData: Partial<SurvivorPartialDto>
  ): [string?, SurvivorPartialDto?] {
    return [undefined, new SurvivorPartialDto(partialData)];
  }
}
