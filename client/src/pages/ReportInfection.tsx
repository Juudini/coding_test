import SurvivorTable from "../components/SurvivorsTable";

const ReportInfection = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center tracking-wide">
        Report Infection
      </h1>
      <p className="text-center text-lg text-gray-600 mb-6">
        Select a survivor to report their infection status. If a survivor is
        reported three times, they will be marked as infected.
      </p>

      <SurvivorTable />
    </div>
  );
};

export default ReportInfection;
