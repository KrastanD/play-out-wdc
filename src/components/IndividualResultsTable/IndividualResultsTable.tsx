import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppVersion, selectConfigVersion } from "../../config/configSlice";
import { StoreType, useAppDispatch } from "../../store";
import { positions } from "../../utils/constants";
import IndividualChart from "../IndividualChart";
import IndividualResult from "../IndividualResult";
import Spinner from "../Spinner";
import "./styles.scss";
import {
  fetchResults,
  selectWDCStatus,
  selectWDCPastRaces,
  RequestState,
  selectWDCRequestYear,
} from "./wdcSlice";

function IndividualResultsTable() {
  const dispatch = useAppDispatch();

  const pastRaces = useSelector(selectWDCPastRaces);
  const resultsStatus = useSelector(selectWDCStatus);
  const resultsError = useSelector((state: StoreType) => state.wdc.error);
  const config = useSelector(selectConfigVersion);
  let year = 2021;
  if (config === AppVersion.WDC2022 || config === AppVersion.WCC2022) {
    year = 2022;
  }
  const requestYear = useSelector(selectWDCRequestYear);

  useEffect(() => {
    if (resultsStatus === RequestState.Idle || requestYear !== year) {
      dispatch(fetchResults({ year }));
    }
  }, [resultsStatus, config]);

  if (resultsStatus === RequestState.Succeeded) {
    return (
      <div className="IndividualResultsTable">
        <table className="IndividualResultsTable__table">
          <colgroup>
            <col width="80" />
            {pastRaces.map((race) => (
              <col key={race.raceName} width="120" />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th className="IndividualResultsTable__header" scope="col">
                Position
              </th>
              {pastRaces.map((race) => (
                <th
                  className="IndividualResultsTable__header"
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
              <tr className="IndividualResultsTable__row" key={positionValue}>
                <td className="IndividualResultsTable__data">
                  {positionValue}
                </td>
                {pastRaces.map((race) => (
                  <td className="IndividualResultsTable__data" key={race.round}>
                    <IndividualResult position={position} race={race} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <IndividualChart races={pastRaces} />
      </div>
    );
  }
  if (resultsStatus === RequestState.Failed) {
    return <div>{resultsError}</div>;
  }
  if (resultsStatus === RequestState.Loading) {
    return (
      <div className="IndividualResultsTable__loader">
        <Spinner />
      </div>
    );
  }
  return null;
}

export default IndividualResultsTable;
