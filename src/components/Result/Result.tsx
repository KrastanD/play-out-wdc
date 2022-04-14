import { ConstructorID } from "../../types";
import "./Result.styles.scss";

type ResultProps = {
  name: string;
  teamId: ConstructorID;
  textColor: "light" | "dark";
  points: string;
  hasFastestLap?: boolean;
  size: "small" | "large";
};

function Result({
  name,
  teamId,
  textColor,
  points,
  hasFastestLap,
  size,
}: ResultProps) {
  const boxStyle = `Result__box Result__box--${size} Result__box--${textColor} Global__${teamId}-bg`;
  return (
    <div className="Result">
      {hasFastestLap && <div className="Result__fastestLapMark">+1</div>}
      <div className={boxStyle}>
        <strong className="Result__driverCode">{name}</strong>
        <p className="Result__driverCode">{points}</p>
      </div>
    </div>
  );
}

export default Result;
