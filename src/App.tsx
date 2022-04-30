import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
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
        <Route path="/constructors" element={<PastTeamResultsTable />} />
        <Route path="/2021" element={<IndividualResultsTable />} />
        <Route path="/constructors/2021" element={<PastTeamResultsTable />} />
      </Routes>
    </div>
  );
}

export default App;
