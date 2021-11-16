import { pointsSystem } from "../../utils/constants";

const Scoreboard = ({ raceResults }: { raceResults: number[][] }) => {
  const getDriverTotal = (driverNum: number) => {
    let counter = 0;
    raceResults.forEach((race, raceIndex) => {
      race.forEach((pointWinner, pointIndex) => {
        if (pointWinner === driverNum) {
          counter += pointsSystem[raceIndex][pointIndex];
        }
      });
    });
    return counter;
  };

  const maxTotal = getDriverTotal(1) + 312.5;
  const lewisTotal = getDriverTotal(2) + 293.5;

  return (
    <div className="container">
      <div className="row">
        <h4 className="col text-center">Max: {maxTotal} pts</h4>
        <h4 className="col text-center">Lewis: {lewisTotal} pts</h4>
      </div>
      <div className="row">
        <h3 className="col text-center">
          Winner: {maxTotal >= lewisTotal ? "Max 🇳🇱" : "Lewis 🇬🇧"}
        </h3>
      </div>
    </div>
  );
};

export default Scoreboard;
