import { useSelector } from "react-redux";
import "./App.scss";
import CountdownClock from "./components/CountdownClock";
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
      <div className="m-5">
        <CountdownClock />
      </div>
      <Table />
    </div>
  );
}

export default App;
