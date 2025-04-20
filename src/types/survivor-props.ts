import { InventoryItemProps } from "./inventory-props";

export interface SurvivorProps {
  name: string;
  age: number;
  gender: string;
  lastLatitude: string;
  lastLongitude: string;
  inventory: InventoryItemProps[];
  isInfected?: boolean;
  id?: string;
}
