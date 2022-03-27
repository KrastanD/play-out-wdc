import { useSelector } from "react-redux";
import { Drivers, pointsSystem } from "../../../utils/constants";
import { selectWDCUserResults } from "../../PastResultsTable/wdcSlice";

// TODO Remove bootstrap
function Scoreboard() {
  const raceResults = useSelector(selectWDCUserResults);
  const getDriverTotal = (driverNum: Drivers) => {
    let counter = 0;
    raceResults.forEach((race) => {
      race.forEach((pointWinner, pointIndex) => {
        if (pointWinner === driverNum) {
          counter += pointsSystem[pointIndex];
        }
      });
    });
    return counter;
  };

  const maxTotal = getDriverTotal(Drivers.Max);
  const lewisTotal = getDriverTotal(Drivers.Lewis);
  const winner = maxTotal >= lewisTotal ? "Max 🇳🇱" : "Lewis 🇬🇧";

  return (
    <div className="container">
      <div className="row">
        <h4 className="col text-center">Max: {maxTotal} pts</h4>
        <h4 className="col text-center">Lewis: {lewisTotal} pts</h4>
      </div>
      <div className="row">
        <h3 className="col text-center">Winner: {winner}</h3>
      </div>
    </div>
  );
}

export default Scoreboard;
