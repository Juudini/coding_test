import { useEffect } from "react";
import { useInfectedStats } from "../hooks/useInfectedStats";
import { InfectionStatsChart } from "../components/InfectionStatsChart";
import { useAverageResources } from "../hooks/useAverageResources";
import { useLostPoints } from "../hooks/useLostPoint";
import { LostPointsChart } from "../components/LostPointStatsChart";
import { AverageResourcesChart } from "../components/AverageResourcesStatsChart";

const ReportsStats = () => {
  const {
    infectedData,
    loading: loadingInfected,
    error: errorInfected,
    fetchData: fetchInfectedData,
  } = useInfectedStats();

  const {
    resources,
    loading: loadingResources,
    error: errorResources,
    fetchData: fetchResourcesData,
  } = useAverageResources();

  const {
    lostPoints,
    loading: loadingLostPoints,
    error: errorLostPoints,
    fetchData: fetchLostPointsData,
  } = useLostPoints();

  const loading = loadingInfected || loadingResources || loadingLostPoints;
  const error = errorInfected || errorResources || errorLostPoints;

  const isInfectedDataAvailable =
    infectedData?.infectedCount > 0 && infectedData?.totalSurvivors > 0;

  useEffect(() => {
    fetchInfectedData();
    fetchResourcesData();
    fetchLostPointsData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center tracking-wide">
          ZSSN Reports Stats
        </h2>

        {loading ? (
          <div className="text-center text-lg text-gray-600">
            Loading data...
          </div>
        ) : error ? (
          <div className="text-center text-red-600 text-lg">{error}</div>
        ) : (
          <>
            <div className="mb-8">
              {isInfectedDataAvailable ? (
                <InfectionStatsChart
                  percentage={infectedData.percentage}
                  infectedCount={infectedData.infectedCount}
                  totalSurvivors={infectedData.totalSurvivors}
                />
              ) : (
                <div className="text-center text-gray-500">
                  No infection data available
                </div>
              )}
            </div>

            <div className="mb-8">
              {resources ? (
                <AverageResourcesChart data={resources} />
              ) : (
                <div className="text-center text-gray-500">
                  No resource data available
                </div>
              )}
            </div>

            <div>
              {lostPoints ? (
                <LostPointsChart pointsByItem={lostPoints.pointsByItem} />
              ) : (
                <div className="text-center text-gray-500">
                  No lost points data available
                </div>
              )}
            </div>
          </>
        )}

        <div className="text-center mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
            onClick={() => {
              fetchInfectedData();
              fetchResourcesData();
              fetchLostPointsData();
            }}>
            Update Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsStats;
