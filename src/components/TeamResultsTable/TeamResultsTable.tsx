import { useParams } from "react-router-dom";
import {
  useFetchRaceResultsQuery,
  useFetchSprintResultsQuery,
} from "../../slices/api";
import { getAllTeamResults } from "../../utils/getAllTeamResults";
import { arrayColumn } from "../../utils/helperFunctions";
import { mergeRacesAndSprints } from "../../utils/mergeRacesAndSprints";
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
  const params = useParams();
  const year = Number(params.year ?? new Date().getFullYear());

  const {
    data: races,
    error: raceError,
    isLoading: isRaceQueryLoading,
    isSuccess: isRaceQuerySuccess,
  } = useFetchRaceResultsQuery({ year });

  const {
    data: sprints,
    error: sprintError,
    isLoading: isSprintQueryLoading,
    isSuccess: isSprintQuerySuccess,
  } = useFetchSprintResultsQuery({ year });

  if (raceError || sprintError) {
    return (
      <div>
        <p>Something went wrong :(</p>
      </div>
    );
  }

  if (isRaceQueryLoading || isSprintQueryLoading) {
    return (
      <div className="IndividualResultsTable__loader">
        <Spinner />
      </div>
    );
  }

  if (isRaceQuerySuccess && isSprintQuerySuccess) {
    const allRaces = mergeRacesAndSprints(races, sprints);

    if (allRaces.length === 0) {
      return <NoResults />;
    }

    const allResults = getAllTeamResults(allRaces);

    const maxTeams = allResults.reduce((acc, curr) => {
      return Math.max(acc, curr.length);
    }, allResults[0].length);

    return (
      <>
        <Title />
        <HorizontalScroll>
          <Table>
            <colgroup>
              <col width="80" />
              {allRaces.map((race) => (
                <col key={race.raceName} width="120" />
              ))}
            </colgroup>
            <thead>
              <TableRow>
                <TableHeaderCell>Team Position</TableHeaderCell>
                {allRaces.map((race) => (
                  <TableHeaderCell key={race.raceName}>
                    {race.raceName}
                  </TableHeaderCell>
                ))}
              </TableRow>
            </thead>
            <tbody>
              {Array.from({ length: maxTeams }).map((_, index) => (
                <TableRow key={index}>
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
        <TeamChart races={allRaces} />
        <Footer />
      </>
    );
  }

  return <NoResults />;
}

export default PastTeamResultsTable;
