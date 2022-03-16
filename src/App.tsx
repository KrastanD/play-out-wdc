import { useSelector } from "react-redux";
import "./App.scss";
import Navbar from "./components/Navbar";
import PastResultsTable from "./components/PastResultsTable";
import PastTeamResultsTable from "./components/PastTeamResultsTable";
import { AppVersion, selectConfigVersion } from "./config/configSlice";

function App() {
  const version = useSelector(selectConfigVersion);

  const Table = () =>
    version === AppVersion.WDC ? (
      <PastResultsTable />
    ) : (
      <PastTeamResultsTable />
    );

  return (
    <div>
      <Navbar />
      <Table />
    </div>
  );
}

export default App;
