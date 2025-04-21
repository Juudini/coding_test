import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { AverageResourceData } from "../hooks/useAverageResources";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Props {
  data: AverageResourceData;
}

export const AverageResourcesChart = ({ data }: Props) => {
  const labels = ["Water", "Food", "Medication", "Ammunition"];
  const averages = [
    data.averages.water,
    data.averages.food,
    data.averages.medication,
    data.averages.ammunition,
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Average per Survivor",
        data: averages,
        backgroundColor: [
          "#38bdf8", // water
          "#facc15", // food
          "#a78bfa", // medication
          "#f87171", // ammunition
        ],
        borderRadius: 10,
        barThickness: 40,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Average Resources per Survivor
      </h2>
      <Bar data={chartData} options={options} />
      <div className="mt-4 text-center text-gray-600">
        Total Survivors:{" "}
        <span className="font-medium">{data.totalSurvivors}</span>
      </div>
    </div>
  );
};
