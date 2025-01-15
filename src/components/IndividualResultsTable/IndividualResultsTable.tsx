import { Race } from "../../types";
import IndividualResult from "../IndividualResult";
import Table from "../Table";
import TableData from "../TableData";
import TableHeaderCell from "../TableHeaderCell";
import TableRow from "../TableRow";

interface IndividualResultsTableProps {
  allRaces: Race[];
}

function IndividualResultsTable({ allRaces }: IndividualResultsTableProps) {
  const maxRows = allRaces.reduce((acc, curr) => {
    return Math.max(acc, curr?.Results?.length ?? curr?.SprintResults?.length);
  }, allRaces[0].Results.length);
  return (
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
        {Array.from({ length: maxRows }).map((_, position) => (
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
  );
}

export default IndividualResultsTable;
