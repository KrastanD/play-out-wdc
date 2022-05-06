import { TeamResultType } from "../../types";
import { darkTextColorTeams } from "../../utils/constants";
import { getConstructorIdFromName } from "../../utils/helperFunctions";
import Result from "../Result";

function TeamResult({ result }: { result: TeamResultType }) {
  const teamId = getConstructorIdFromName(result.constructor);
  const textColor = darkTextColorTeams.includes(teamId) ? "light" : "dark";

  return (
    <Result
      name={result.constructor}
      teamId={teamId}
      textColor={textColor}
      points={result.points.toString()}
      size="large"
    />
  );
}

export default TeamResult;
