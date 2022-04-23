import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppVersion, selectConfigVersion } from "../../config/configSlice";
import { StoreType, useAppDispatch } from "../../store";
import { Race, TeamResultType } from "../../types";
import { arrayColumn } from "../../utils/helperFunctions";
import {
  fetchRaceResults,
  RequestState,
  selectWDCPastRaces,
  selectWDCRequestYear,
  selectWDCRaceStatus,
} from "../IndividualResultsTable/wdcSlice";
import Spinner from "../Spinner";
import TeamChart from "../TeamChart";
import TeamResult from "../TeamResult";

function PastTeamResultsTable() {
  const dispatch = useAppDispatch();

  const pastRaces = useSelector(selectWDCPastRaces);
  const resultsStatus = useSelector(selectWDCRaceStatus);
  const resultsError = useSelector((state: StoreType) => state.wdc.error);
  const config = useSelector(selectConfigVersion);
  let year = 2021;
  if (config === AppVersion.WDC2022 || config === AppVersion.WCC2022) {
    year = 2022;
  }
  const requestYear = useSelector(selectWDCRequestYear);

  useEffect(() => {
    if (resultsStatus === RequestState.Idle || requestYear !== year) {
      dispatch(fetchRaceResults({ year }));
    }
  }, [resultsStatus, config]);

  const getTeamResults = (race: Race) => {
    const teamResults: TeamResultType[] = [];
    race.Results.forEach((result) => {
      const teamResultsIndex = teamResults.findIndex(
        (teamResult) => teamResult.constructor === result.Constructor.name
      );
      if (teamResultsIndex > -1) {
        teamResults[teamResultsIndex].points += Number(result.points);
      } else {
        teamResults.push({
          race: race.round,
          constructor: result.Constructor.name,
          points: Number(result.points),
        });
      }
    });
    teamResults.sort((constructorA, constructorB) => {
      if (constructorA.points > constructorB.points) {
        return -1;
      }
      if (constructorB.points > constructorA.points) {
        return 1;
      }
      return 0;
    });
    return teamResults;
  };

  const getAllTeamResults = () => {
    const allTeamResults: TeamResultType[][] = [];
    pastRaces.forEach((race) => {
      allTeamResults.push(getTeamResults(race));
    });
    return allTeamResults;
  };

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
            <tr className="IndividualResultsTable__row">
              <th className="IndividualResultsTable__header" scope="col">
                Team Position
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
            {Array.from(Array(10).keys()).map((value, index) => (
              <tr className="IndividualResultsTable__row" key={value}>
                <td className="IndividualResultsTable__data">{index + 1}</td>
                {arrayColumn(getAllTeamResults(), index).map((teamResult) => (
                  <td
                    className="IndividualResultsTable__data"
                    key={
                      teamResult.race +
                      teamResult.constructor +
                      teamResult.points
                    }
                  >
                    <TeamResult result={teamResult} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <TeamChart races={pastRaces} />
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

export default PastTeamResultsTable;
