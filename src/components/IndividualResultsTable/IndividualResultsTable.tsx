import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchRaceResults,
  fetchSprintResults,
  RequestState,
  selectPastRaces,
  selectRaceStatus,
  selectRequestError,
  selectRequestYear,
  selectSprintStatus,
} from "../../slices/resultsSlice";
import { useAppDispatch } from "../../store";
import IndividualChart from "../IndividualChart";
import IndividualResult from "../IndividualResult";
import Spinner from "../Spinner";
import "./styles.scss";

function IndividualResultsTable() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const pastRaces = useSelector(selectPastRaces);
  const resultsRaceStatus = useSelector(selectRaceStatus);
  const resultsSprintStatus = useSelector(selectSprintStatus);
  const requestYear = useSelector(selectRequestYear);
  const errorData = useSelector(selectRequestError);

  const year = Number(params.year ?? new Date().getFullYear());

  const resultsSuccess =
    resultsRaceStatus === RequestState.Succeeded &&
    resultsSprintStatus === RequestState.Succeeded;
  const resultsLoading =
    resultsRaceStatus === RequestState.Loading ||
    resultsSprintStatus === RequestState.Loading;
  const resultsError =
    resultsRaceStatus === RequestState.Failed ||
    resultsSprintStatus === RequestState.Failed;

  useEffect(() => {
    if (resultsRaceStatus === RequestState.Idle || requestYear !== year) {
      dispatch(fetchRaceResults({ year }));
      dispatch(fetchSprintResults({ year }));
    }
  }, [resultsRaceStatus, year]);

  if (resultsSuccess) {
    const maxDrivers = pastRaces.reduce((acc, curr) => {
      if (curr.Results.length > acc) {
        return curr.Results.length;
      }
      return acc;
    }, pastRaces[0].Results.length);

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
            {Array.from(Array(maxDrivers).keys()).map(
              (positionValue, position) => (
                <tr className="IndividualResultsTable__row" key={positionValue}>
                  <td className="IndividualResultsTable__data">
                    {positionValue + 1}
                  </td>
                  {pastRaces.map((race) => (
                    <td
                      className="IndividualResultsTable__data"
                      key={String(race.raceName)}
                    >
                      <IndividualResult position={position} race={race} />
                    </td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
        <IndividualChart races={pastRaces} />
      </div>
    );
  }
  if (resultsError) {
    return <div>{errorData}</div>;
  }
  if (resultsLoading) {
    return (
      <div className="IndividualResultsTable__loader">
        <Spinner />
      </div>
    );
  }
  return null;
}

export default IndividualResultsTable;
