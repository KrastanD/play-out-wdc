import { useParams } from "react-router-dom";

import {
  useFetchRaceResultsQuery,
  useFetchSprintResultsQuery,
} from "../../slices/api";
import { mergeRacesAndSprints } from "../../utils/mergeRacesAndSprints";
import Footer from "../Footer";
import HorizontalScroll from "../HorizontalScroll";
import IndividualChart from "../IndividualChart";
import IndividualResultsTable from "../IndividualResultsTable";
import NoResults from "../NoResults";
import Title from "../Title";
import Loader from "../Loader";

function DriversChampionshipScreen() {
  const params = useParams();
  const year = Number(params.year ?? new Date().getFullYear());

  const {
    data: races,
    error: raceError,
    isLoading: isRaceQueryLoading,
    isFetching: isRaceQueryFetching,
    isSuccess: isRaceQuerySuccess,
  } = useFetchRaceResultsQuery({ year });

  const {
    data: sprints,
    error: sprintError,
    isLoading: isSprintQueryLoading,
    isFetching: isSprintQueryFetching,
    isSuccess: isSprintQuerySuccess,
  } = useFetchSprintResultsQuery({ year });

  if (raceError || sprintError) {
    return (
      <div>
        <p>Something went wrong :(</p>
      </div>
    );
  }

  if (
    isRaceQueryLoading ||
    isSprintQueryLoading ||
    isRaceQueryFetching ||
    isSprintQueryFetching
  ) {
    return <Loader />;
  }

  if (isRaceQuerySuccess && isSprintQuerySuccess) {
    const allRaces = mergeRacesAndSprints(races, sprints);

    if (allRaces.length !== 0) {
      return (
        <>
          <Title />
          <HorizontalScroll>
            <IndividualResultsTable allRaces={allRaces} />
          </HorizontalScroll>
          <IndividualChart races={allRaces} />
          <Footer />
        </>
      );
    }
  }

  return <NoResults />;
}

export default DriversChampionshipScreen;
