import ContextMenuHandler from "../../../contextMenuHandler";
import { arrayColumn } from "../../../utils/helperFunctions";
import "./styles.scss";

import {
  Teams,
  pointsSystem,
  positions,
  raceMetadata,
} from "../../../utils/constants";

interface Props {
  raceResults: Teams[][];
  setRaceResults: React.Dispatch<React.SetStateAction<Teams[][]>>;
}

const PointsTable = ({ raceResults, setRaceResults }: Props) => {
  const contextMenuHandler = new ContextMenuHandler();

  const onButtonClick = (teamNum: Teams, race: number, position: number) => {
    const FL = pointsSystem[1].length - 2;
    const DNF = pointsSystem[1].length - 1;

    let buttonClickRegistered = [...raceResults];
    let previousResult: Teams[] = [];
    raceResults[race].forEach((result, index) => {
      if (result === teamNum) {
        previousResult.push(index);
      }
    });

    console.log(position, previousResult);

    if (position === FL) {
      if (raceResults[race][position] === teamNum) {
        //disabling fastest lap
        buttonClickRegistered[race][position] = Teams.None;
        setRaceResults(() => buttonClickRegistered);
      } else {
        //DNFer attempting to FL
        if (previousResult.length === 1 && previousResult[0] === DNF) {
          return;
        }
        buttonClickRegistered[race][position] = teamNum;
        setRaceResults(() => buttonClickRegistered);
      }
      return;
    }

    // fastest lap holder attempting to DNF
    if (
      previousResult.length === 1 &&
      raceResults[race][FL] === teamNum &&
      position === DNF
    ) {
      return;
    }

    //disabling previous result
    if (previousResult.includes(position)) {
      buttonClickRegistered[race][position] = Teams.None;
      setRaceResults(() => buttonClickRegistered);
      return;
    }

    previousResult = previousResult.filter((item) => item !== FL);

    if (previousResult.length === 1 || previousResult.length === 0) {
      buttonClickRegistered[race][position] = teamNum;
      setRaceResults(() => buttonClickRegistered);
      return;
    }
    if (previousResult.length === 2) {
      buttonClickRegistered[race][previousResult[0]] = Teams.None;
      buttonClickRegistered[race][position] = teamNum;
      setRaceResults(() => buttonClickRegistered);
      return;
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped user-select-none">
        <thead>
          <tr>
            <th scope="col" style={{ width: "15%" }}>
              Position
            </th>
            {raceMetadata.map((meta, i) => (
              <th key={i} scope="col" style={{ width: "15%" }}>
                {meta.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {positions.map((positionValue, position) => {
            return (
              <tr key={position}>
                <td>{positionValue}</td>
                {arrayColumn(pointsSystem, position).map((points, race) => {
                  if (points === undefined) {
                    return <td key={race}></td>;
                  }
                  let buttonClass =
                    "btn btn-outline-secondary user-select-none constant-width";
                  if (raceResults[race][position] === Teams.RedBull) {
                    buttonClass += " white-text redbull-bg";
                  }
                  if (raceResults[race][position] === Teams.Mercedes) {
                    buttonClass += " white-text mercedes-bg";
                  }
                  return (
                    <td key={race}>
                      <button
                        disabled={
                          Boolean(raceMetadata[race].RedBull) ||
                          Boolean(raceMetadata[race].Mercedes)
                        }
                        onClick={() => {
                          onButtonClick(Teams.RedBull, race, position);
                        }}
                        className={buttonClass}
                        key={position}
                        onContextMenu={(e) => {
                          contextMenuHandler.onContextMenu(e, () =>
                            onButtonClick(Teams.Mercedes, race, position)
                          );
                        }}
                        onTouchStart={(e) => {
                          contextMenuHandler.onTouchStart(e, () =>
                            onButtonClick(Teams.Mercedes, race, position)
                          );
                        }}
                        onTouchCancel={contextMenuHandler.onTouchCancel}
                        onTouchEnd={contextMenuHandler.onTouchEnd}
                        onTouchMove={contextMenuHandler.onTouchMove}
                      >
                        {points}
                      </button>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PointsTable;
