import { Constructor, Race } from "../../types";
import { getTeamColor } from "../../utils/helperFunctions";
import Chart from "../Chart";

interface ChartTeamData {
  teamMetadata: Constructor;
  results: number[];
}

function getTeamDataSet(races: Race[]) {
  const data: ChartTeamData[] = [];
  races.forEach((race, raceIndex) => {
    const results = race.Results ?? race.SprintResults;
    results.forEach((result) => {
      const teamObject = data.find(
        (team) =>
          team.teamMetadata.constructorId === result.Constructor.constructorId
      );
      if (teamObject) {
        const lastResult = teamObject.results[teamObject.results.length - 1];
        if (teamObject.results[raceIndex] === undefined) {
          teamObject.results[raceIndex] = lastResult;
        }
        teamObject.results[raceIndex] += Number(result.points);
      } else {
        const newTeamObject: ChartTeamData = {
          teamMetadata: result.Constructor,
          results: [Number(result.points)],
        };
        data.push(newTeamObject);
      }
    });
  });
  return data;
}

function TeamChart({ races }: { races: Race[] }) {
  const teamData = getTeamDataSet(races);
  const labels = races.map((race) => race.raceName);
  const data = {
    labels,
    datasets: teamData.map((team) => ({
      label: team.teamMetadata.name,
      data: team.results,
      borderColor: getTeamColor(team.teamMetadata.constructorId),
    })),
  };

  return <Chart data={data} title="Constructors' Championship Results" />;
}

export default TeamChart;
