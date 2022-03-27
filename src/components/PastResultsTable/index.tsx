import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../store";
import { positions } from "../../utils/constants";
import IndividualResult from "../IndividualResult";
import "./styles.scss";
import {
  fetchResults,
  selectWDCStatus,
  selectWDCPastRaces,
  RequestState,
} from "./wdcSlice";

function PastResultsTable() {
  const dispatch = useDispatch();

  const pastRaces = useSelector(selectWDCPastRaces);
  const resultsStatus = useSelector(selectWDCStatus);
  const resultsError = useSelector((state: StoreType) => state.wdc.error);
  useEffect(() => {
    if (resultsStatus === RequestState.Idle) {
      dispatch(fetchResults());
    }
  }, [resultsStatus, dispatch]);

  if (resultsStatus === RequestState.Succeeded) {
    return (
      <div className="PastResultsTable">
        <table className="PastResultsTable__table">
          <thead>
            <tr>
              <th className="PastResultsTable__header" scope="col">
                Position
              </th>
              {pastRaces.map((race) => (
                <th
                  className="PastResultsTable__header"
                  scope="col"
                  key={race.raceName}
                >
                  {race.raceName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {positions.map((positionValue, position) => (
              <tr className="PastResultsTable__row" key={positionValue}>
                <td className="PastResultsTable__data">{positionValue}</td>
                {pastRaces.map((race) => (
                  <td className="PastResultsTable__data" key={race.round}>
                    <IndividualResult position={position} race={race} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if (resultsStatus === RequestState.Failed) {
    return <div>{resultsError}</div>;
  }
  return null;
}

export default PastResultsTable;
