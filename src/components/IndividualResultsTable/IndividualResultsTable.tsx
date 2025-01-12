import { useParams } from "react-router-dom";

import {
  useFetchRaceResultsQuery,
  useFetchSprintResultsQuery,
} from "../../slices/api";
import { mergeRacesAndSprints } from "../../utils/mergeRacesAndSprints";
import Footer from "../Footer";
import HorizontalScroll from "../HorizontalScroll";
import IndividualChart from "../IndividualChart";
import IndividualResult from "../IndividualResult";
import NoResults from "../NoResults";
import Spinner from "../Spinner";
import Table from "../Table";
import TableData from "../TableData";
import TableHeaderCell from "../TableHeaderCell";
import TableRow from "../TableRow";
import Title from "../Title";
import "./styles.scss";

function IndividualResultsTable() {
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

    const maxDrivers = races.reduce((acc, curr) => {
      return Math.max(acc, curr.Results.length);
    }, races[0].Results.length);

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
              <tr>
                <TableHeaderCell>Position</TableHeaderCell>
                {allRaces.map((race) => (
                  <TableHeaderCell key={race.raceName}>
                    {race.raceName}
                  </TableHeaderCell>
                ))}
              </tr>
            </thead>
            <tbody className="IndividualResultsTable__row">
              {Array.from({ length: maxDrivers }).map((_, position) => (
                <TableRow key={position}>
                  <TableData>{position + 1}</TableData>
                  {allRaces.map((race) => (
                    <TableData key={String(race.raceName)}>
                      <IndividualResult position={position} race={race} />
                    </TableData>
                  ))}
                </TableRow>
              ))}
            </tbody>
          </Table>
        </HorizontalScroll>
        <IndividualChart races={allRaces} />
        <Footer />
      </>
    );
  }

  return <NoResults />;
}

export default IndividualResultsTable;
