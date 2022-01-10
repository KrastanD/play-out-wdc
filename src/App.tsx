import { useEffect, useState } from "react";
import "./App.scss";

import Navbar from "./components/Navbar";
import Instructions from "./components/Instructions";
import WDCScoreboard from "./components/Scoreboard/WDCScoreboard";
import WCCScoreboard from "./components/Scoreboard/WCCScoreboard";
import WDCPointsTable from "./components/PointsTable/WDCPointsTable";
import WCCPointsTable from "./components/PointsTable/WCCPointsTable";
import { StoreType } from "./store";
import { useSelector } from "react-redux";
import { AppVersion } from "./config/configSlice";
import { Teams } from "./utils/constants";
import { setPreviousResultsWDC } from "./components/PointsTable/WDCPointsTable/WDCPointsTablePM";
import { setPreviousResultsWCC } from "./components/PointsTable/WCCPointsTable/WCCPointsTablePM";
import CountdownClock from "./components/CountdownClock";

function App() {
  const version = useSelector((state: StoreType) => state.config.version);

  const [raceResultsWDC, setRaceResultsWDC] = useState<number[][]>(
    Array.from(Array(5), () => new Array(12).fill(Teams.None))
  );

  const [raceResultsWCC, setRaceResultsWCC] = useState<number[][]>(
    Array.from(Array(5), () => new Array(12).fill(Teams.None))
  );

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
    setPreviousResultsWDC(raceResultsWDC, setRaceResultsWDC);
    setPreviousResultsWCC(raceResultsWCC, setRaceResultsWCC);
    // eslint-disable-next-line
  }, []);

  const Scoreboard = () =>
    version === AppVersion.WDC ? (
      <WDCScoreboard raceResults={raceResultsWDC} />
    ) : (
      <WCCScoreboard raceResults={raceResultsWCC} />
    );

  const PointsTable = () =>
    version === AppVersion.WDC ? (
      <WDCPointsTable
        raceResults={raceResultsWDC}
        setRaceResults={setRaceResultsWDC}
      />
    ) : (
      <WCCPointsTable
        raceResults={raceResultsWCC}
        setRaceResults={setRaceResultsWCC}
      />
    );

  return (
    <div>
      <Navbar />
      <div className="m-5">
        <CountdownClock />
      </div>
      <Instructions />
      <Scoreboard />
      <PointsTable />
    </div>
  );
}

export default App;
