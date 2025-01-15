import { Race } from "../../types";
import { getAllTeamResults } from "../../utils/getAllTeamResults";
import { arrayColumn } from "../../utils/helperFunctions";
import Table from "../Table";
import TableData from "../TableData";
import TableHeaderCell from "../TableHeaderCell";
import TableRow from "../TableRow";
import TeamResult from "../TeamResult";

interface TeamResultsTableProps {
  races: Race[];
}

function TeamResultsTable({ races }: TeamResultsTableProps) {
  const allResults = getAllTeamResults(races);

  const maxRows = allResults.reduce((acc, curr) => {
    return Math.max(acc, curr.length);
  }, allResults[0].length);

  return (
    <Table>
      <colgroup>
        <col width="80" />
        {races.map((race) => (
          <col key={race.raceName} width="120" />
        ))}
      </colgroup>
      <thead>
        <TableRow>
          <TableHeaderCell>Team Position</TableHeaderCell>
          {races.map((race) => (
            <TableHeaderCell key={race.raceName}>
              {race.raceName}
            </TableHeaderCell>
          ))}
        </TableRow>
      </thead>
      <tbody>
        {Array.from({ length: maxRows }).map((_, index) => (
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
                    teamResult.race + teamResult.constructor + teamResult.points
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
  );
}

export default TeamResultsTable;
