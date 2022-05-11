import { ConstructorID, TeamResultType } from "../../types";
import { darkTextColorTeams } from "../../utils/constants";
import { getConstructorIdFromName } from "../../utils/helperFunctions";
import Result from "../Result";

function InvisibleResult() {
  return <div style={{ height: "30px", width: "150px" }} />;
}
function TeamResult({ result }: { result?: TeamResultType }) {
  if (!result) {
    return <InvisibleResult />;
  }

  const teamId = getConstructorIdFromName(result.constructor);
  const textColor =
    teamId && darkTextColorTeams.includes(teamId) ? "light" : "dark";

  return (
    <Result
      name={result.constructor}
      teamId={teamId ?? ConstructorID.Ferrari}
      textColor={textColor}
      points={result.points.toString()}
      size="large"
    />
  );
}

export default TeamResult;
