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

const PastResultsTable = () => {
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
              {pastRaces.map((race, i) => (
                <th className="PastResultsTable__header" key={i} scope="col">
                  {race.raceName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {positions.map((positionValue, position) => {
              return (
                <tr className="PastResultsTable__row" key={position}>
                  <td className="PastResultsTable__data">{positionValue}</td>
                  {pastRaces.map((race, raceIndex) => {
                    return (
                      <td className="PastResultsTable__data" key={raceIndex}>
                        <IndividualResult position={position} race={race} />
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
  } else if (resultsStatus === RequestState.Failed) {
    return <div>{resultsError}</div>;
  } else {
    return null;
  }
};

export default PastResultsTable;
