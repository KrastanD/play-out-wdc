import { ConstructorID, Race } from "../../types";
import "./styles.scss";

type IndividualResultProps = {
  position: number;
  race: Race;
};

function IndividualResult({ position, race }: IndividualResultProps) {
  const teamId = race.Results[position]?.Constructor?.constructorId;
  const textColor = teamId === ConstructorID.Haas ? "light" : "dark";
  const buttonClass = `IndividualResult__${textColor}Box Global__${teamId}-bg`;

  const hasFastestLap =
    race.Results[position]?.FastestLap?.rank === "1" && position < 10;

  const pointsString = hasFastestLap
    ? `${Number(race.Results[position]?.points) - 1}`
    : race.Results[position]?.points;

  return (
    <div className="IndividualResult">
      {hasFastestLap && (
        <div className="IndividualResult__fastestLapMark">+1</div>
      )}
      <div className={buttonClass} key={position}>
        <strong className="IndividualResult__driverCode">
          {race.Results[position]?.Driver.code}
        </strong>{" "}
        | {pointsString}
      </div>
    </div>
  );
}

export default IndividualResult;
