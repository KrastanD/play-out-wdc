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

  const onResultSelect = (
    teamNum: Teams,
    race: number,
    selectedPosition: number
  ) => {
    const fastestLapIndex = pointsSystem[1].length - 2;
    const didNotFinishIndex = pointsSystem[1].length - 1;

    let updatedRaceResults = [...raceResults];
    let previousResults: Teams[] = [];
    raceResults[race].forEach((result, index) => {
      if (result === teamNum) {
        previousResults.push(index);
      }
    });

    if (selectedPosition === fastestLapIndex) {
      if (raceResults[race][selectedPosition] === teamNum) {
        updatedRaceResults[race][selectedPosition] = Teams.None;
        setRaceResults(() => updatedRaceResults);
      } else {
        if (
          previousResults.length === 1 &&
          previousResults[0] === didNotFinishIndex
        ) {
          return;
        }
        updatedRaceResults[race][selectedPosition] = teamNum;
        setRaceResults(() => updatedRaceResults);
      }
      return;
    }

    if (
      previousResults.length === 1 &&
      raceResults[race][fastestLapIndex] === teamNum &&
      selectedPosition === didNotFinishIndex
    ) {
      return;
    }

    if (previousResults.includes(selectedPosition)) {
      updatedRaceResults[race][selectedPosition] = Teams.None;
      setRaceResults(() => updatedRaceResults);
      return;
    }

    previousResults = previousResults.filter(
      (position) => position !== fastestLapIndex
    );

    if (previousResults.length === 1 || previousResults.length === 0) {
      updatedRaceResults[race][selectedPosition] = teamNum;
      setRaceResults(() => updatedRaceResults);
      return;
    }
    if (previousResults.length === 2) {
      // TODO: should do replacement in a more consistent way
      updatedRaceResults[race][previousResults[0]] = Teams.None;
      updatedRaceResults[race][selectedPosition] = teamNum;
      setRaceResults(() => updatedRaceResults);
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
                          onResultSelect(Teams.RedBull, race, position);
                        }}
                        className={buttonClass}
                        key={position}
                        onContextMenu={(e) => {
                          contextMenuHandler.onContextMenu(e, () =>
                            onResultSelect(Teams.Mercedes, race, position)
                          );
                        }}
                        onTouchStart={(e) => {
                          contextMenuHandler.onTouchStart(e, () =>
                            onResultSelect(Teams.Mercedes, race, position)
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
