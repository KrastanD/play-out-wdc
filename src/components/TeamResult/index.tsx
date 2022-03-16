import { ConstructorName, TeamResultType } from "../../types";
import { getConstructorIdFromName } from "../../utils/helperFunctions";
import "./styles.scss";

const TeamResult = ({ result }: { result: TeamResultType }) => {
  const teamId = getConstructorIdFromName(result.constructor).toLowerCase();
  const textColor =
    result.constructor === ConstructorName.HaasF1Team ? "light" : "dark";
  const buttonClass = `btn TeamResult__${textColor}Box Global__${teamId}-bg`;
  return (
    <div className="TeamResult__container">
      <div className={buttonClass}>
        <strong className="TeamResult__driverNumber">
          {result.constructor}
        </strong>{" "}
        | {result.points}
      </div>
    </div>
  );
};

export default TeamResult;