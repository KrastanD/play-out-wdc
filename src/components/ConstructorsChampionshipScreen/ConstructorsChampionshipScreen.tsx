import { useParams } from "react-router-dom";
import {
  useFetchRaceResultsQuery,
  useFetchSprintResultsQuery,
} from "../../slices/api";
import { mergeRacesAndSprints } from "../../utils/mergeRacesAndSprints";
import Footer from "../Footer";
import HorizontalScroll from "../HorizontalScroll";
import Loader from "../Loader";
import NoResults from "../NoResults";
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
            <TeamResultsTable races={allRaces} />
          </HorizontalScroll>
          <TeamChart races={allRaces} />
          <Footer />
        </>
      );
    }
  }

  return <NoResults />;
}

export default ConstructorsChampionshipScreen;
