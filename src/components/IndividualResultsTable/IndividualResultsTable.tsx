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

  if (resultsSuccess) {
    if (pastRaces.length === 0) {
      return <NoResults />;
    }

    const maxDrivers = pastRaces.reduce((acc, curr) => {
      if (curr.Results?.length > acc) {
        return curr.Results.length;
      }
      return acc;
    }, pastRaces[0].Results.length);

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
              <tr>
                <TableHeaderCell>Position</TableHeaderCell>
                {pastRaces.map((race) => (
                  <TableHeaderCell key={race.raceName}>
                    {race.raceName}
                  </TableHeaderCell>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from(Array(maxDrivers).keys()).map(
                (positionValue, position) => (
                  <TableRow key={positionValue}>
                    <TableData>{positionValue + 1}</TableData>
                    {pastRaces.map((race) => (
                      <TableData key={String(race.raceName)}>
                        <IndividualResult position={position} race={race} />
                      </TableData>
                    ))}
                  </TableRow>
                )
              )}
            </tbody>
          </Table>
        </HorizontalScroll>
        <IndividualChart races={pastRaces} />
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

export default IndividualResultsTable;
