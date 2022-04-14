import { ConstructorID, Race } from "../../types";
import Result from "../Result";

type IndividualResultProps = {
  position: number;
  race: Race;
};

function IndividualResult({ position, race }: IndividualResultProps) {
  const teamId = race.Results[position]?.Constructor?.constructorId;
  const textColor = teamId === ConstructorID.Haas ? "light" : "dark";
  const hasFastestLap =
    race.Results[position]?.FastestLap?.rank === "1" && position < 10;
  const pointsString = hasFastestLap
    ? `${Number(race.Results[position]?.points) - 1}`
    : race.Results[position]?.points;
  const name = race.Results[position]?.Driver.code;

  return (
    <Result
      name={name}
      teamId={teamId}
      textColor={textColor}
      points={pointsString}
      hasFastestLap={hasFastestLap}
      size="small"
    />
  );
}

export default IndividualResult;
