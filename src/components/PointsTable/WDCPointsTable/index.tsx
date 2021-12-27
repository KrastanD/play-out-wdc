import ContextMenuHandler from "../../../contextMenuHandler";
import { arrayColumn } from "../../../utils/helperFunctions";
import "./styles.scss";

import {
  Drivers,
  pointsSystem,
  positions,
  raceMetadata,
} from "../../../utils/constants";

interface Props {
  raceResults: Drivers[][];
  setRaceResults: React.Dispatch<React.SetStateAction<Drivers[][]>>;
}

const PointsTable = ({ raceResults, setRaceResults }: Props) => {
  const contextMenuHandler = new ContextMenuHandler();

  const onResultSelect = (
    driverNum: Drivers,
    race: number,
    selectedPosition: number
  ) => {
    const fastestLapIndex = pointsSystem[1].length - 2;
    const didNotFinishIndex = pointsSystem[1].length - 1;

    let updatedRaceResults = [...raceResults];

    if (selectedPosition === fastestLapIndex) {
      if (raceResults[race][selectedPosition] === driverNum) {
        updatedRaceResults[race][selectedPosition] = Drivers.None;
        setRaceResults(() => updatedRaceResults);
      } else {
        if (raceResults[race][didNotFinishIndex] === driverNum) {
          return;
        }
        updatedRaceResults[race][selectedPosition] = driverNum;
        setRaceResults(() => updatedRaceResults);
      }
      return;
    }

    const previousResult = raceResults[race].findIndex((x) => x === driverNum);

    if (raceResults[race][raceResults[0].length - 2] === driverNum) {
      if (selectedPosition === didNotFinishIndex) {
        return;
      }
    }

    if (previousResult !== -1 && previousResult !== fastestLapIndex) {
      updatedRaceResults[race][previousResult] = Drivers.None;
      if (previousResult === selectedPosition) {
        setRaceResults(() => updatedRaceResults);
        return;
      }
    }

    updatedRaceResults[race][selectedPosition] = driverNum;
    setRaceResults(() => updatedRaceResults);
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
                  if (raceResults[race][position] === Drivers.Max) {
                    buttonClass += " white-text redbull-bg";
                  }
                  if (raceResults[race][position] === Drivers.Lewis) {
                    buttonClass += " white-text mercedes-bg";
                  }
                  return (
                    <td key={race}>
                      <button
                        disabled={
                          Boolean(raceMetadata[race].Max) ||
                          Boolean(raceMetadata[race].Lewis)
                        }
                        onClick={() => {
                          onResultSelect(Drivers.Max, race, position);
                        }}
                        className={buttonClass}
                        key={position}
                        onContextMenu={(e) => {
                          contextMenuHandler.onContextMenu(e, () =>
                            onResultSelect(Drivers.Lewis, race, position)
                          );
                        }}
                        onTouchStart={(e) => {
                          contextMenuHandler.onTouchStart(e, () =>
                            onResultSelect(Drivers.Lewis, race, position)
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
