import { useParams } from "react-router";

import {
  useFetchRaceResultsQuery,
  useFetchSprintResultsQuery,
} from "../../slices/api";
import { mergeRacesAndSprints } from "../../utils/mergeRacesAndSprints";
import HorizontalScroll from "../HorizontalScroll";
import IndividualChart from "../IndividualChart";
import IndividualResultsTable from "../IndividualResultsTable";
import Loader from "../Loader";
import ErrorScreen from "../ErrorScreen/ErrorScreen";
import Title from "../Title";

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
    return <ErrorScreen error="Something went wrong :(" />;
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
        </>
      );
    }
  }

  return <ErrorScreen error="There is no data for this season" />;
}

export default DriversChampionshipScreen;
