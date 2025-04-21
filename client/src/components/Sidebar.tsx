import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav
        className={`w-64 bg-white shadow-md fixed md:relative top-0 left-0 h-full transition-all duration-300 transform md:block ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-40`}>
        <div className="p-4">
          <div className="mb-6 border-b border-gray-200 pb-4">
            <h1 className="text-xl font-bold text-indigo-700 flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              ZSSN Network
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Zombie Survival Social Network
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Navigation
            </h2>
            <ul className="mt-3 space-y-1">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                  onClick={() => setIsOpen(false)}>
                  <svg
                    className="h-5 w-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  Survivors
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/report-infection"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                  onClick={() => setIsOpen(false)}>
                  <svg
                    className="h-5 w-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Report Infection
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Stats
            </h2>
            <ul className="mt-3 space-y-1">
              <li>
                <NavLink
                  to="/report/stats"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                  onClick={() => setIsOpen(false)}>
                  <svg
                    className="h-5 w-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  Global Statistics
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <button
        className={`md:hidden p-3 text-white bg-indigo-700 rounded-full fixed top-4 z-50 transition-all duration-300 ${
          isOpen ? "left-64" : "left-4"
        }`}
        onClick={toggleSidebar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
    </div>
  );
};

export default Sidebar;
