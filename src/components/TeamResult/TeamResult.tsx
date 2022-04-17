import { ConstructorName, TeamResultType } from "../../types";
import { getConstructorIdFromName } from "../../utils/helperFunctions";
import Result from "../Result";

function TeamResult({ result }: { result: TeamResultType }) {
  const teamId = getConstructorIdFromName(result.constructor);
  const textColor =
    result.constructor === ConstructorName.HaasF1Team ? "light" : "dark";

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
