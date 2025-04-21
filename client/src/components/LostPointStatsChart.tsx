import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface LostPointsChartProps {
  pointsByItem: {
    water: number;
    food: number;
    medication: number;
    ammunition: number;
  };
}

export const LostPointsChart = ({ pointsByItem }: LostPointsChartProps) => {
  const labels = ["Water", "Food", "Medication", "Ammunition"];
  const data = {
    labels,
    datasets: [
      {
        label: "Lost Points",
        data: [
          pointsByItem.water,
          pointsByItem.food,
          pointsByItem.medication,
          pointsByItem.ammunition,
        ],
        backgroundColor: ["#60a5fa", "#facc15", "#f472b6", "#a78bfa"],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#4b5563",
        },
      },
      x: {
        ticks: {
          color: "#4b5563",
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Lost Points by Item
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
};
