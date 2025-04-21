export interface SurvivorInput {
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  lastLatitude: string;
  lastLongitude: string;
  inventory: {
    type: "WATER" | "FOOD" | "AMMUNITION" | "MEDICATION";
    quantity: number;
  }[];
}

export interface InventoryItem {
  id: string;
  type: string;
  quantity: number;
  inventoryId: string;
}

export interface Inventory {
  id: string;
  items: InventoryItem[];
}

export interface SurvivorReport {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastLatitude: string;
  lastLongitude: string;
  isInfected: boolean;
  inventoryId: string;
  inventory: Inventory;
  report: [
    {
      id: string;
    }
  ];
  reportCount: number;
}
