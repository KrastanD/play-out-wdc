import { useDispatch, useSelector } from "react-redux";
import ContextMenuHandler from "../../../contextMenuHandler";
import {
  Drivers,
  pointsSystem,
  positions,
  raceMetadata,
} from "../../../utils/constants";
import { arrayColumn } from "../../../utils/helperFunctions";
import "./styles.scss";
import { wdcResultSet, selectWDCResults } from "./wdcSlice";

const PointsTable = () => {
  const contextMenuHandler = new ContextMenuHandler();

  const dispatch = useDispatch();

  const lewisOnClick = (race: number, position: number) => {
    dispatch(
      wdcResultSet({
        driverNum: Drivers.Lewis,
        race,
        selectedPosition: position,
      })
    );
  };

  const maxOnClick = (race: number, position: number) => {
    dispatch(
      wdcResultSet({
        driverNum: Drivers.Max,
        race,
        selectedPosition: position,
      })
    );
  };

  const raceResults = useSelector(selectWDCResults);

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
                        onClick={() => maxOnClick(race, position)}
                        className={buttonClass}
                        key={position}
                        onContextMenu={(e) => {
                          contextMenuHandler.onContextMenu(e, () =>
                            lewisOnClick(race, position)
                          );
                        }}
                        onTouchStart={(e) => {
                          contextMenuHandler.onTouchStart(e, () =>
                            lewisOnClick(race, position)
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
