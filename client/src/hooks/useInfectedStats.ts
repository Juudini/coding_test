import { useState } from "react";
import { getInfectedPercentage } from "../api/report";

export const useInfectedStats = () => {
  const [infectedData, setInfectedData] = useState({
    percentage: 0,
    infectedCount: 0,
    totalSurvivors: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getInfectedPercentage();
      setInfectedData(data.payload);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error to fetch infected data.");
    } finally {
      setLoading(false);
    }
  };

  return { infectedData, loading, error, fetchData };
};
