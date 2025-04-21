import { RegisterSurvivor } from "../components/RegisterSurvivor";

const Survivors = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-200 py-4 md:py-10 px-4 md:px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-gray-900 mb-6 md:mb-10">
          Survivor Registration
        </h1>
        <p className="text-base md:text-lg text-center text-gray-700 mb-6 md:mb-8 px-2 md:px-0">
          Please fill out the form below to register a new survivor. Make sure
          to provide accurate details.
        </p>
        <RegisterSurvivor />
      </div>
    </div>
  );
};

export default Survivors;
