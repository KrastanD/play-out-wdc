import { useSelector } from "react-redux";
import {
  pointsSystem,
  Teams,
  teamTiebreakerData,
} from "../../../utils/constants";
import { selectWCCResults } from "../../PastTeamResultsTable/wccSlice";

// TODO Remove bootstrap
function Scoreboard() {
  const redBullString = "Red Bull 🇦🇹";
  const mercedesString = "Mercedes 🇩🇪";

  const raceResults = useSelector(selectWCCResults);

  if (raceResults[0][0] === 0) {
    return null;
  }
  const getTeamsTotal = (team: Teams) => {
    let counter = 0;
    raceResults.forEach((race) => {
      race.forEach((pointWinner, pointIndex) => {
        if (pointWinner === team) {
          counter += pointsSystem[pointIndex];
        }
      });
    });
    return counter;
  };

  const getTiebreakerWinner = (): (string | number)[] => {
    const tiebreakerData = {
      1: [...teamTiebreakerData[1]],
      2: [...teamTiebreakerData[2]],
    };
    raceResults.slice(1).forEach((race) => {
      race.forEach((pointWinner, pointIndex) => {
        if (pointWinner === Teams.RedBull) {
          tiebreakerData[Teams.RedBull][pointIndex] += 1;
        }
        if (pointWinner === Teams.Mercedes) {
          tiebreakerData[Teams.Mercedes][pointIndex] += 1;
        }
      });
    });
    for (let i = 0; i < tiebreakerData[1].length; i += 1) {
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

    return ["", 2];
  };

  const redBullTotal = getTeamsTotal(Teams.RedBull) + 477.5;
  const mercedesTotal = getTeamsTotal(Teams.Mercedes) + 478.5;
  const tiebreaker = getTiebreakerWinner();
  const winner = redBullTotal > mercedesTotal ? redBullString : mercedesString;

  return (
    <div className="container">
      <div className="row">
        <h4 className="col text-center">Red Bull: {redBullTotal} pts</h4>
        <h4 className="col text-center">Mercedes: {mercedesTotal} pts</h4>
      </div>
      <div className="row">
        {redBullTotal !== mercedesTotal ? (
          <h3 className="col text-center">Winner: {winner}</h3>
        ) : (
          <h3 className="col text-center">
            Winner: {tiebreaker[0]} on countback of #{tiebreaker[1]} positions
          </h3>
        )}
      </div>
    </div>
  );
}

export default Scoreboard;
