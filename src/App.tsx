import { Outlet, Route, Routes } from "react-router-dom";
import "./App.scss";
import IndividualResultsTable from "./components/IndividualResultsTable";
import Navbar from "./components/Navbar";
import PastTeamResultsTable from "./components/TeamResultsTable";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<IndividualResultsTable />} />
        <Route path="/drivers" element={<Outlet />}>
          <Route path="/drivers/:year" element={<IndividualResultsTable />} />
        </Route>
        <Route path="/constructors" element={<Outlet />}>
          <Route
            path="/constructors/:year"
            element={<PastTeamResultsTable />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
