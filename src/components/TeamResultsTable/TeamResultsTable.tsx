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
import { Race, TeamResultType } from "../../types";
import { arrayColumn } from "../../utils/helperFunctions";
import Footer from "../Footer";
import HorizontalScroll from "../HorizontalScroll";
import NoResults from "../NoResults";
import Spinner from "../Spinner";
import Table from "../Table";
import TableData from "../TableData";
import TableHeaderCell from "../TableHeaderCell";
import TableRow from "../TableRow";
import TeamChart from "../TeamChart";
import TeamResult from "../TeamResult";
import Title from "../Title";

function PastTeamResultsTable() {
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
    if (
      (resultsRaceStatus === RequestState.Idle ||
        resultsRaceStatus === RequestState.Succeeded) &&
      (resultsSprintStatus === RequestState.Idle ||
        resultsSprintStatus === RequestState.Succeeded) &&
      requestYear !== year
    ) {
      dispatch(fetchRaceResults({ year }));
      dispatch(fetchSprintResults({ year }));
    }
  }, [resultsRaceStatus, resultsSprintStatus, year, requestYear]);

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
          race: race.raceName,
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
    if (pastRaces.length === 0) {
      return <NoResults />;
    }

    const allResults = getAllTeamResults();
    const maxTeams = allResults.reduce((acc, curr) => {
      if (curr.length > acc) {
        return curr.length;
      }
      return acc;
    }, allResults[0].length);
    return (
      <>
        <Title />
        <HorizontalScroll>
          <Table>
            <colgroup>
              <col width="80" />
              {pastRaces.map((race) => (
                <col key={race.raceName} width="120" />
              ))}
            </colgroup>
            <thead>
              <TableRow>
                <TableHeaderCell>Team Position</TableHeaderCell>
                {pastRaces.map((race) => (
                  <TableHeaderCell key={race.raceName}>
                    {race.raceName}
                  </TableHeaderCell>
                ))}
              </TableRow>
            </thead>
            <tbody>
              {Array.from(Array(maxTeams).keys()).map((value, index) => (
                <TableRow key={value}>
                  <TableData>{index + 1}</TableData>
                  {arrayColumn(allResults, index).map((teamResult) => {
                    if (teamResult === undefined) {
                      return (
                        <td>
                          <TeamResult />
                        </td>
                      );
                    }
                    return (
                      <TableData
                        key={
                          teamResult.race +
                          teamResult.constructor +
                          teamResult.points
                        }
                      >
                        <TeamResult result={teamResult} />
                      </TableData>
                    );
                  })}
                </TableRow>
              ))}
            </tbody>
          </Table>
        </HorizontalScroll>
        <TeamChart races={pastRaces} />
        <Footer />
      </>
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
  return <NoResults />;
}

export default PastTeamResultsTable;
