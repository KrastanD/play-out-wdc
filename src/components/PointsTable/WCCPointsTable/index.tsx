import ContextMenuHandler from "../../../contextMenuHandler";
import { arrayColumn } from "../../../utils/helperFunctions";
import "./styles.scss";

import {
  Teams,
  pointsSystem,
  positions,
  raceMetadata,
} from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { selectWCCResults, wccResultSet } from "./wccSlice";

const PointsTable = () => {
  const contextMenuHandler = new ContextMenuHandler();
  const dispatch = useDispatch();

  const redBullOnClick = (race: number, position: number) => {
    dispatch(
      wccResultSet({
        teamNum: Teams.RedBull,
        race,
        selectedPosition: position,
      })
    );
  };

  const mercedesOnClick = (race: number, position: number) => {
    dispatch(
      wccResultSet({
        teamNum: Teams.Mercedes,
        race,
        selectedPosition: position,
      })
    );
  };

  const raceResults = useSelector(selectWCCResults);

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
                        onClick={() => redBullOnClick(race, position)}
                        className={buttonClass}
                        key={position}
                        onContextMenu={(e) => {
                          contextMenuHandler.onContextMenu(e, () =>
                            mercedesOnClick(race, position)
                          );
                        }}
                        onTouchStart={(e) => {
                          contextMenuHandler.onTouchStart(e, () =>
                            mercedesOnClick(race, position)
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
