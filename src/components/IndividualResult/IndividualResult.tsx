import { ConstructorID, Race } from "../../types";
import Result from "../Result";

type IndividualResultProps = {
  position: number;
  race: Race;
};

function IndividualResult({ position, race }: IndividualResultProps) {
  const results = race.Results ?? race.SprintResults;
  const teamId = results[position]?.Constructor?.constructorId;
  const textColor = teamId === ConstructorID.Haas ? "light" : "dark";
  const hasFastestLap =
    results[position]?.FastestLap?.rank === "1" && position < 10;
  const pointsString = hasFastestLap
    ? `${Number(results[position]?.points) - 1}`
    : results[position]?.points;
  const name = results[position]?.Driver.code;

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
