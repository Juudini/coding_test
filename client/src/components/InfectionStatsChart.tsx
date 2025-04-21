import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface InfectionStatsProps {
  percentage: number;
  infectedCount: number;
  totalSurvivors: number;
}

export const InfectionStatsChart = ({
  percentage,
  infectedCount,
  totalSurvivors,
}: InfectionStatsProps) => {
  const healthyCount = totalSurvivors - infectedCount;

  const data = {
    labels: ["Infected", "Healthy"],
    datasets: [
      {
        label: "Survivors",
        data: [infectedCount, healthyCount],
        backgroundColor: ["#f87171", "#22c55e"],
        borderColor: ["#ef4444", "#16a34a"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Infection Stats
      </h2>
      <div className="flex justify-center">
        <Doughnut data={data} options={options} />
      </div>
      <div className="mt-6 text-center space-y-1">
        <p className="text-gray-700">
          <span className="font-medium">Total Survivors:</span> {totalSurvivors}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Infected:</span> {infectedCount}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Infection %:</span>{" "}
          {percentage.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};
