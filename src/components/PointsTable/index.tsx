import ContextMenuHandler from "../../contextMenuHandler";
import { arrayColumn } from "../../utils/helperFunctions";
import "./styles.scss";

import {
  MetadataType,
  pointsSystem,
  positions,
  raceMetadata,
} from "../../utils/constants";

interface Props {
  raceResults: number[][];
  setRaceResults: React.Dispatch<React.SetStateAction<number[][]>>;
}

const PointsTable = ({ raceResults, setRaceResults }: Props) => {
  const contextMenuHandler = new ContextMenuHandler();

  const setPreviousResults = (raceMetadata: MetadataType[]) => {
    let buttonClickRegistered = [...raceResults];

    raceMetadata.forEach((race, index) => {
      if (race.Max) {
        race.Max.forEach((result) => {
          buttonClickRegistered[index][result] = 1;
        });
      }
      if (race.Lewis) {
        race.Lewis.forEach((result) => {
          buttonClickRegistered[index][result] = 2;
        });
      }
    });
  };

  const onButtonClick = (driverNum: number, race: number, position: number) => {
    const isFastestLap = (num: number) => num === pointsSystem[1].length - 2;
    const DNF = pointsSystem[1].length - 1;

    let buttonClickRegistered = [...raceResults];

    if (isFastestLap(position)) {
      if (raceResults[race][position] === driverNum) {
        // if previous fastest lap
        buttonClickRegistered[race][position] = 0;
        setRaceResults(() => buttonClickRegistered);
      } else {
        if (raceResults[race][DNF] === driverNum) {
          return;
        }
        buttonClickRegistered[race][position] = driverNum;
        setRaceResults(() => buttonClickRegistered);
      }
      return;
    }

    const previousResult = raceResults[race].findIndex((x) => x === driverNum);

    if (raceResults[race][raceResults[0].length - 2] === driverNum) {
      if (position === DNF) {
        return;
      }
    }

    //If previous result wasn't fastest lap
    if (
      previousResult !== -1 &&
      previousResult !== pointsSystem[1].length - 2
    ) {
      buttonClickRegistered[race][previousResult] = 0;
      if (previousResult === position) {
        // if clicking on previous result
        setRaceResults(() => buttonClickRegistered);
        return;
      }
    }

    buttonClickRegistered[race][position] = driverNum;
    setRaceResults(() => buttonClickRegistered);
  };

  setPreviousResults(raceMetadata);

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
                  if (raceResults[race][position] === 1) {
                    buttonClass += " white-text redbull-bg";
                  }
                  if (raceResults[race][position] === 2) {
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
                          onButtonClick(1, race, position);
                        }}
                        className={buttonClass}
                        key={position}
                        onContextMenu={(e) => {
                          contextMenuHandler.onContextMenu(e, () =>
                            onButtonClick(2, race, position)
                          );
                        }}
                        onTouchStart={(e) => {
                          contextMenuHandler.onTouchStart(e, () =>
                            onButtonClick(2, race, position)
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
