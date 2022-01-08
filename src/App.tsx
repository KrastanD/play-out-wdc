import { useEffect } from "react";
import "./App.scss";

import Navbar from "./components/Navbar";
import Instructions from "./components/Instructions";
import WDCScoreboard from "./components/Scoreboard/WDCScoreboard";
import WCCScoreboard from "./components/Scoreboard/WCCScoreboard";
import WDCPointsTable from "./components/PointsTable/WDCPointsTable";
import WCCPointsTable from "./components/PointsTable/WCCPointsTable";
import { useSelector } from "react-redux";
import { AppVersion, selectConfigVersion } from "./config/configSlice";

function App() {
  const version = useSelector(selectConfigVersion);

  useEffect(() => {
    if (version === AppVersion.WCC) {
      document.title = "Play Out WCC";
      document.getElementsByTagName("meta")[3].content =
        "Play out the WCC in the last rounds of 2021";
    } else {
      document.title = "Play Out WDC";
      document.getElementsByTagName("meta")[3].content =
        "Play out the WDC in the last rounds of 2021";
    }
    // eslint-disable-next-line
  }, []);

  const Scoreboard = () =>
    version === AppVersion.WDC ? <WDCScoreboard /> : <WCCScoreboard />;

  const PointsTable = () =>
    version === AppVersion.WDC ? <WDCPointsTable /> : <WCCPointsTable />;

  return (
    <div>
      <Navbar />
      <Instructions />
      <Scoreboard />
      <PointsTable />
    </div>
  );
}

export default App;
