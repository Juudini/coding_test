import { useState } from "react";
import { getAverageResources } from "../api/report";
export interface AverageResourceData {
  averages: {
    water: number;
    food: number;
    medication: number;
    ammunition: number;
  };
  totalSurvivors: number;
  resourcesCount: {
    water: number;
    food: number;
    medication: number;
    ammunition: number;
  };
}
export const useAverageResources = () => {
  const [resources, setResources] = useState<AverageResourceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getAverageResources();
      setResources(data.payload);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error al cargar los recursos promedio.");
    } finally {
      setLoading(false);
    }
  };

  return { resources, loading, error, fetchData };
};
