import ContextMenuHandler from "../../../contextMenuHandler";
import "./styles.scss";

import { Teams, positions, raceMetadata } from "../../../utils/constants";
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
                {raceResults.map((race, raceIndex) => {
                  if (race === undefined) {
                    return <td key={raceIndex}></td>;
                  }
                  let buttonClass =
                    "btn btn-outline-secondary user-select-none constant-width";
                  if (raceResults[raceIndex][position] === Teams.RedBull) {
                    buttonClass += " white-text redbull-bg";
                  }
                  if (raceResults[raceIndex][position] === Teams.Mercedes) {
                    buttonClass += " white-text mercedes-bg";
                  }
                  return (
                    <td key={raceIndex}>
                      <button
                        disabled={
                          Boolean(raceMetadata[raceIndex].RedBull) ||
                          Boolean(raceMetadata[raceIndex].Mercedes)
                        }
                        onClick={() => redBullOnClick(raceIndex, position)}
                        className={buttonClass}
                        key={position}
                        onContextMenu={(e) => {
                          contextMenuHandler.onContextMenu(e, () =>
                            mercedesOnClick(raceIndex, position)
                          );
                        }}
                        onTouchStart={(e) => {
                          contextMenuHandler.onTouchStart(e, () =>
                            mercedesOnClick(raceIndex, position)
                          );
                        }}
                        onTouchCancel={contextMenuHandler.onTouchCancel}
                        onTouchEnd={contextMenuHandler.onTouchEnd}
                        onTouchMove={contextMenuHandler.onTouchMove}
                      >
                        {race}
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
