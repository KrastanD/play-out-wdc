import {
  Teams,
  pointsSystem,
  teamTiebreakerData,
} from "../../../utils/constants";

const Scoreboard = ({ raceResults }: { raceResults: Teams[][] }) => {
  const redBullString = "Red Bull 🇦🇹";
  const mercedesString = "Mercedes 🇩🇪";

  if (raceResults[0][0] === 0) {
    return null;
  }
  const getTeamsTotal = (team: Teams) => {
    let counter = 0;
    raceResults.forEach((race, raceIndex) => {
      race.forEach((pointWinner, pointIndex) => {
        if (pointWinner === team) {
          counter += pointsSystem[raceIndex][pointIndex];
        }
      });
    });
    return counter;
  };

  const getTiebreakerWinner = (): (string | number)[] => {
    // if (redBullTotal !== mercedesTotal) {
    //   return ["", 1];
    // }
    let tiebreakerData = {
      1: [...teamTiebreakerData[1]],
      2: [...teamTiebreakerData[2]],
    };
    console.log("before", JSON.stringify(tiebreakerData));
    raceResults.slice(1).forEach((race, raceIndex) => {
      race.forEach((pointWinner, pointIndex) => {
        if (pointWinner === Teams.RedBull) {
          tiebreakerData[Teams.RedBull][pointIndex] += 1;
        }
        if (pointWinner === Teams.Mercedes) {
          tiebreakerData[Teams.Mercedes][pointIndex] += 1;
        }
      });
    });
    console.log("after", JSON.stringify(tiebreakerData));
    for (let i = 0; i < tiebreakerData[1].length; i++) {
      if (
        tiebreakerData[Teams.RedBull][i] !== tiebreakerData[Teams.Mercedes][i]
      ) {
        const winner =
          tiebreakerData[Teams.RedBull][i] > tiebreakerData[Teams.Mercedes][i]
            ? redBullString
            : mercedesString;
        return [winner, i + 1];
      }
    }

    return ["temp", 2];
  };

  const redBullTotal = getTeamsTotal(Teams.RedBull) + 477.5;
  const mercedesTotal = getTeamsTotal(Teams.Mercedes) + 478.5;
  const tiebreaker = getTiebreakerWinner();

  return (
    <div className="container">
      <div className="row">
        <h4 className="col text-center">Red Bull: {redBullTotal} pts</h4>
        <h4 className="col text-center">Mercedes: {mercedesTotal} pts</h4>
      </div>
      <div className="row">
        {redBullTotal !== mercedesTotal ? (
          <h3 className="col text-center">
            Winner:{" "}
            {redBullTotal > mercedesTotal ? redBullString : mercedesString}
          </h3>
        ) : (
          <h3 className="col text-center">
            Winner: {tiebreaker[0]} on countback of #{tiebreaker[1]} positions
          </h3>
        )}
      </div>
    </div>
  );
};

export default Scoreboard;
