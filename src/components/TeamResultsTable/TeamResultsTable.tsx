import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppVersion, selectConfigVersion } from "../../slices/configSlice";
import { useAppDispatch } from "../../store";
import { Race, TeamResultType } from "../../types";
import { arrayColumn } from "../../utils/helperFunctions";
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
import Spinner from "../Spinner";
import TeamChart from "../TeamChart";
import TeamResult from "../TeamResult";

function PastTeamResultsTable() {
  const dispatch = useAppDispatch();

  const pastRaces = useSelector(selectPastRaces);
  const resultsRaceStatus = useSelector(selectRaceStatus);
  const resultsSprintStatus = useSelector(selectSprintStatus);
  const requestYear = useSelector(selectRequestYear);
  const errorData = useSelector(selectRequestError);
  const config = useSelector(selectConfigVersion);

  const resultsSuccess =
    resultsRaceStatus === RequestState.Succeeded &&
    resultsSprintStatus === RequestState.Succeeded;
  const resultsLoading =
    resultsRaceStatus === RequestState.Loading ||
    resultsSprintStatus === RequestState.Loading;
  const resultsError =
    resultsRaceStatus === RequestState.Failed ||
    resultsSprintStatus === RequestState.Failed;

  let year = 2021;
  if (config === AppVersion.WDC2022 || config === AppVersion.WCC2022) {
    year = 2022;
  }

  useEffect(() => {
    if (resultsRaceStatus === RequestState.Idle || requestYear !== year) {
      dispatch(fetchRaceResults({ year }));
      dispatch(fetchSprintResults({ year }));
    }
  }, [resultsRaceStatus, config]);

  const getTeamResults = (race: Race) => {
    const teamResults: TeamResultType[] = [];
    const results = race.Results ?? race.SprintResults;
    results.forEach((result) => {
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

  if (resultsSuccess) {
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

export default PastTeamResultsTable;
