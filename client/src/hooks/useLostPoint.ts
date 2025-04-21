import { useState } from "react";
import { getLostPoints } from "../api/report";
export interface LostPointsData {
  totalLostPoints: number;
  infectedSurvivorsCount: number;
  itemsDetail: {
    water: { quantity: number; points: number };
    food: { quantity: number; points: number };
    medication: { quantity: number; points: number };
    ammunition: { quantity: number; points: number };
  };
  pointsByItem: {
    water: number;
    food: number;
    medication: number;
    ammunition: number;
  };
  pointsSystem: {
    water: number;
    food: number;
    medication: number;
    ammunition: number;
  };
  calculationDate: string;
}

export const useLostPoints = () => {
  const [lostPoints, setLostPoints] = useState<LostPointsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getLostPoints();
      setLostPoints(data.payload);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch lost points data.");
    } finally {
      setLoading(false);
    }
  };

  return { lostPoints, loading, error, fetchData };
};
