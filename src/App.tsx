import { useSelector } from "react-redux";
import "./App.scss";
import Navbar from "./components/Navbar";
import IndividualResultsTable from "./components/IndividualResultsTable";
import PastTeamResultsTable from "./components/TeamResultsTable";
import { AppVersion, selectConfigVersion } from "./slices/configSlice";

function Table({ version }: { version: AppVersion }) {
  if (version === AppVersion.WDC2021 || version === AppVersion.WDC2022) {
    return <IndividualResultsTable />;
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
