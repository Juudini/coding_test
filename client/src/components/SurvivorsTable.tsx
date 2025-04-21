import React, { useEffect, useState } from "react";
import { SurvivorReport } from "../types/survivor.interface";
import { getAllSurvivors } from "../api/survivor";
import { reportInfection } from "../api/report";

const SurvivorTable: React.FC = () => {
  const [survivors, setSurvivors] = useState<SurvivorReport[]>([]);

  const [filteredSurvivors, setFilteredSurvivors] = useState<SurvivorReport[]>(
    []
  );
  const [filterInfected, setFilterInfected] = useState<string>("all");
  const [filterAge, setFilterAge] = useState<number | "">("");
  const [searchName, setSearchName] = useState<string>("");
  const [filterGender, setFilterGender] = useState<string>("all");

  useEffect(() => {
    const fetchSurvivors = async () => {
      try {
        const data = await getAllSurvivors();
        setSurvivors(data);
        setFilteredSurvivors(data);
      } catch (error) {
        console.error("Failed to fetch survivors", error);
      }
    };
    fetchSurvivors();
  }, []);

  useEffect(() => {
    let filtered = [...survivors];

    if (filterInfected !== "all") {
      filtered = filtered.filter((s) =>
        filterInfected === "infected" ? s.isInfected : !s.isInfected
      );
    }

    if (filterGender !== "all") {
      filtered = filtered.filter((s) => s.gender === filterGender);
    }

    if (filterAge !== "") {
      filtered = filtered.filter((s) => s.age >= Number(filterAge));
    }

    if (searchName) {
      filtered = filtered.filter((s) =>
        s.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    setFilteredSurvivors(filtered);
  }, [filterInfected, filterAge, searchName, filterGender, survivors]);

  const handleReport = async (id: string) => {
    try {
      await reportInfection(id);

      const updated = survivors.map((s) => {
        if (s.id === id) {
          const newReportCount = s.reportCount + 1;
          return {
            ...s,
            reportCount: newReportCount,
            isInfected: newReportCount >= 3,
          };
        }
        return s;
      });

      setSurvivors(updated);
    } catch (error) {
      console.error("Error reporting survivor", error);
    }
  };
  const handleResetFilters = () => {
    setFilterInfected("all");
    setFilterAge("");
    setSearchName("");
    setFilterGender("all");
    setFilteredSurvivors(survivors);
  };
  return (
    <div className="w-full px-4 py-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Survivors List
      </h2>

      <div className="flex flex-wrap gap-4 mb-4 items-center justify-center">
        <select
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={filterInfected}
          onChange={(e) => setFilterInfected(e.target.value)}>
          <option value="all">All</option>
          <option value="infected">Infected</option>
          <option value="healthy">Healthy</option>
        </select>

        <select
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={filterGender}
          onChange={(e) => setFilterGender(e.target.value)}>
          <option value="all">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input
          type="number"
          placeholder="Min Age"
          className="border border-gray-300 rounded-md px-3 py-2 text-sm w-28"
          value={filterAge}
          onChange={(e) =>
            setFilterAge(e.target.value === "" ? "" : +e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Search Name"
          className="border border-gray-300 rounded-md px-3 py-2 text-sm w-48"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button
          onClick={handleResetFilters}
          className="flex items-center gap-2 bg-gray-300 text-gray-800 py-1 px-4 rounded-md text-sm hover:bg-gray-400 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            height="30px"
            viewBox="0 0 512 512">
            <path
              fill="#fff"
              fillRule="evenodd"
              d="M426.667 106.667v42.666L358 149.33c36.077 31.659 58.188 77.991 58.146 128.474c-.065 78.179-53.242 146.318-129.062 165.376s-154.896-15.838-191.92-84.695C58.141 289.63 72.637 204.42 130.347 151.68a85.33 85.33 0 0 0 33.28 30.507a124.59 124.59 0 0 0-46.294 97.066c1.05 69.942 58.051 126.088 128 126.08c64.072 1.056 118.71-46.195 126.906-109.749c6.124-47.483-15.135-92.74-52.236-118.947L320 256h-42.667V106.667zM202.667 64c23.564 0 42.666 19.103 42.666 42.667s-19.102 42.666-42.666 42.666S160 130.231 160 106.667S179.103 64 202.667 64"></path>
          </svg>
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {filteredSurvivors.map((survivor) => (
              <tr key={survivor.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                  {survivor.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {survivor.age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-700">
                  {survivor.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {survivor.lastLatitude}, {survivor.lastLongitude}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center gap-2">
                    {survivor.isInfected ? (
                      <span className="inline-flex items-center gap-x-1.5 rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                        <svg
                          className="size-1.5 fill-red-500"
                          viewBox="0 0 6 6"
                          aria-hidden="true">
                          <circle cx="3" cy="3" r="3" />
                        </svg>
                        Infected
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        <svg
                          className="size-1.5 fill-green-500"
                          viewBox="0 0 6 6"
                          aria-hidden="true">
                          <circle cx="3" cy="3" r="3" />
                        </svg>
                        Healthy
                      </span>
                    )}
                    {!survivor.isInfected && (
                      <span className="text-xs text-gray-500">
                        ({survivor.reportCount} reports)
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {!survivor.isInfected && survivor.reportCount < 3 && (
                    <button
                      onClick={() => handleReport(survivor.id)}
                      className="inline-flex items-center rounded-md bg-red-100 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-200 transition">
                      Reportar como infectado
                    </button>
                  )}
                  {survivor.reportCount >= 3 && !survivor.isInfected && (
                    <span className="inline-flex items-center gap-x-1.5 rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                      <svg
                        className="size-1.5 fill-yellow-500"
                        viewBox="0 0 6 6"
                        aria-hidden="true">
                        <circle cx="3" cy="3" r="3" />
                      </svg>
                      Pendiente de verificación
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredSurvivors.length === 0 && (
          <p className="text-center text-sm text-gray-500 py-6">
            No survivors found.
          </p>
        )}
      </div>
    </div>
  );
};

export default SurvivorTable;
