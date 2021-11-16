import { useState } from "react";
import "./App.scss";

import Navbar from "./components/Navbar";
import Instructions from "./components/Instructions";
import Scoreboard from "./components/Scoreboard";
import PointsTable from "./components/PointsTable";

function App() {
  const [raceResults, setRaceResults] = useState<number[][]>(
    Array.from(Array(5), () => new Array(12).fill(0))
  );

  return (
    <div>
      <Navbar />
      <Instructions />
      <Scoreboard raceResults={raceResults} />
      <PointsTable raceResults={raceResults} setRaceResults={setRaceResults} />
    </div>
  );
}

export default App;
