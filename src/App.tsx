import { useSelector } from "react-redux";
import "./App.scss";
import Navbar from "./components/Navbar";
import PastResultsTable from "./components/PastResultsTable";
import PastTeamResultsTable from "./components/PastTeamResultsTable";
import { AppVersion, selectConfigVersion } from "./config/configSlice";

function Table({ version }: { version: AppVersion }) {
  if (version === AppVersion.WDC2021 || version === AppVersion.WDC2022) {
    return <PastResultsTable />;
  }
  return <PastTeamResultsTable />;
}

function App() {
  const version = useSelector(selectConfigVersion);

  return (
    <div>
      <Navbar />
      <Table version={version} />
    </div>
  );
}

export default App;
