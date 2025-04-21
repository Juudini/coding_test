import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import ReportsStats from "./pages/ReportsStats";
import ReportInfection from "./pages/ReportInfection";
import Survivors from "./pages/Survivors";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Survivors />} />
          <Route path="/report/stats" element={<ReportsStats />} />
          <Route path="/report-infection" element={<ReportInfection />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
