import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../store";
import { Race, TeamResultType } from "../../types";
import { arrayColumn } from "../../utils/helperFunctions";
import {
  fetchResults,
  RequestState,
  selectWDCPastRaces,
  selectWDCStatus,
} from "../PastResultsTable/wdcSlice";
import TeamResult from "../TeamResult";

const PastTeamResultsTable = () => {
  const dispatch = useDispatch();

  const pastRaces = useSelector(selectWDCPastRaces);
  const resultsStatus = useSelector(selectWDCStatus);
  const resultsError = useSelector((state: StoreType) => state.wdc.error);

  useEffect(() => {
    if (resultsStatus === RequestState.Idle) {
      dispatch(fetchResults());
    }
  }, [resultsStatus, dispatch]);

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
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Team Position</th>
              {pastRaces.map((race, i) => (
                <th key={i} scope="col">
                  {race.raceName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  {arrayColumn(getAllTeamResults(), index).map(
                    (teamResult, raceIndex) => {
                      return (
                        <td key={raceIndex}>
                          <TeamResult result={teamResult} />
                        </td>
                      );
                    }
                  )}
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

export default PastTeamResultsTable;
