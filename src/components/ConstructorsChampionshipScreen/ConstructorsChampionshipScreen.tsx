import { useParams } from "react-router";
import {
  useFetchRaceResultsQuery,
  useFetchSprintResultsQuery,
} from "../../slices/api";
import { mergeRacesAndSprints } from "../../utils/mergeRacesAndSprints";
import HorizontalScroll from "../HorizontalScroll";
import Loader from "../Loader";
import ErrorScreen from "../ErrorScreen";
import TeamChart from "../TeamChart";
import TeamResultsTable from "../TeamResultsTable";
import Title from "../Title";

function ConstructorsChampionshipScreen() {
  const params = useParams();
  const year = Number(params.year ?? new Date().getFullYear());

  const {
    data: races,
    error: raceError,
    isLoading: isRaceQueryLoading,
    isSuccess: isRaceQuerySuccess,
    isFetching: isRaceQueryFetching,
  } = useFetchRaceResultsQuery({ year });

  const {
    data: sprints,
    error: sprintError,
    isLoading: isSprintQueryLoading,
    isSuccess: isSprintQuerySuccess,
    isFetching: isSprintQueryFetching,
  } = useFetchSprintResultsQuery({ year });

  if (year < 2010) {
    return <ErrorScreen error="We don't currently support years before 2010" />;
  }

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
            <TeamResultsTable races={allRaces} />
          </HorizontalScroll>
          <TeamChart races={allRaces} />
        </>
      );
    }
  }

  return <ErrorScreen error="There is no data for this season" />;
}

export default ConstructorsChampionshipScreen;
