import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContextMenuHandler from "../../../contextMenuHandler";
import { StoreType } from "../../../store";
import {
  Drivers,
  pointsSystem,
  positions,
  raceMetadata,
} from "../../../utils/constants";
import "./styles.scss";
import {
  fetchResults,
  selectWDCResults,
  selectWDCStatus,
  wdcResultSet,
} from "./wdcSlice";

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
  const resultsStatus = useSelector(selectWDCStatus);
  const resultsError = useSelector((state: StoreType) => state.wdc.error);
  useEffect(() => {
    if (resultsStatus === "idle") {
      dispatch(fetchResults());
    }
  }, [resultsStatus, dispatch]);

  if (resultsStatus === "loading") {
    return <div>Loading...</div>;
  } else if (resultsStatus === "succeeded") {
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
                    const points = pointsSystem[position];
                    if (points === undefined) {
                      return <td key={raceIndex}></td>;
                    }
                    let buttonClass =
                      "btn btn-outline-secondary user-select-none constant-width";
                    if (raceResults[raceIndex][position] === Drivers.Max) {
                      buttonClass += " white-text redbull-bg";
                    }
                    if (raceResults[raceIndex][position] === Drivers.Lewis) {
                      buttonClass += " white-text mercedes-bg";
                    }
                    return (
                      <td key={raceIndex}>
                        <button
                          // TODO: fix disabled state
                          // disabled={
                          //   Boolean(raceMetadata[raceIndex].Max) ||
                          //   Boolean(raceMetadata[raceIndex].Lewis)
                          // }
                          onClick={() => maxOnClick(raceIndex, position)}
                          className={buttonClass}
                          key={position}
                          onContextMenu={(e) => {
                            contextMenuHandler.onContextMenu(e, () =>
                              lewisOnClick(raceIndex, position)
                            );
                          }}
                          onTouchStart={(e) => {
                            contextMenuHandler.onTouchStart(e, () =>
                              lewisOnClick(raceIndex, position)
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
  } else if (resultsStatus === "failed") {
    return <div>{resultsError}</div>;
  } else {
    return (
      <div>
        <p>Idle</p>
      </div>
    );
  }
};

export default PointsTable;
